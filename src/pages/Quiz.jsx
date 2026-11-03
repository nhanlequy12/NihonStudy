import { useMemo, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { topics, allWords, topicById } from '../data/vocab'
import { useStore, addQuizResult, toggleSaved } from '../lib/storage'
import { review } from '../lib/srs'
import { speak } from '../lib/tts'
import { shuffle, sample, normalizeJa, blankOut } from '../lib/utils'
import { SaveButton } from '../components/WordCard'

const MODES = [
  { id: 'vi2jp', label: 'Việt → Nhật (viết)', desc: 'Nhìn nghĩa tiếng Việt, gõ từ tiếng Nhật (kanji hoặc hiragana).' },
  { id: 'fill', label: 'Điền từ vào câu', desc: 'Đọc câu tiếng Việt và câu Nhật có chỗ trống, gõ từ còn thiếu.' },
  { id: 'sentence', label: 'Dịch cả câu Việt → Nhật', desc: 'Viết câu tiếng Nhật từ câu tiếng Việt. Chấm theo độ giống với đáp án.' },
  { id: 'mc-vi2jp', label: 'Trắc nghiệm Việt → Nhật', desc: 'Chọn từ tiếng Nhật đúng với nghĩa.' },
  { id: 'mc-jp2vi', label: 'Trắc nghiệm Nhật → Việt', desc: 'Chọn nghĩa đúng của từ.' },
  { id: 'reading', label: 'Cách đọc (漢字 → かな)', desc: 'Chọn cách đọc đúng của từ kanji.' },
]

function buildQuestion(w, mode, pool) {
  const others = sample(pool.filter((x) => x.id !== w.id), 3)
  const ex = w.examples[Math.floor(Math.random() * w.examples.length)]
  switch (mode) {
    case 'vi2jp': return { w, mode, prompt: w.meaning, hint: w.pos, answers: [w.word, w.reading], ex }
    case 'fill': return { w, mode, prompt: blankOut(ex.jp, w.word), sub: ex.vi, hint: w.meaning, answers: [w.word, w.reading], ex }
    case 'sentence': return { w, mode, prompt: ex.vi, hint: `Dùng từ: ${w.word}`, target: ex.jp, ex }
    case 'mc-vi2jp': return { w, mode, prompt: w.meaning, options: shuffle([w, ...others]).map((x) => ({ id: x.id, label: x.word, sub: x.reading })), correct: w.id, ex }
    case 'mc-jp2vi': return { w, mode, prompt: w.word, sub: w.reading, options: shuffle([w, ...others]).map((x) => ({ id: x.id, label: x.meaning })), correct: w.id, ex }
    case 'reading': return { w, mode, prompt: w.word, options: shuffle([w, ...others]).map((x) => ({ id: x.id, label: x.reading })), correct: w.id, ex }
    default: return null
  }
}

/** So sánh câu dịch với đáp án: % ký tự chung (đơn giản, bỏ dấu câu). */
function sentenceScore(user, target) {
  const a = normalizeJa(user), b = normalizeJa(target)
  if (!a) return 0
  const setB = new Map()
  for (const ch of b) setB.set(ch, (setB.get(ch) || 0) + 1)
  let hit = 0
  for (const ch of a) if (setB.get(ch) > 0) { hit++; setB.set(ch, setB.get(ch) - 1) }
  return Math.round((hit / Math.max(a.length, b.length)) * 100)
}

export default function Quiz() {
  const s = useStore()
  const [params, setParams] = useSearchParams()
  const topicId = params.get('topic') || 'all'
  const [mode, setMode] = useState('vi2jp')
  const [count, setCount] = useState(10)
  const [autoSave, setAutoSave] = useState(true)
  const [qs, setQs] = useState([])
  const [i, setI] = useState(0)
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null) // {ok, picked?}
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState([])
  const inputRef = useRef(null)

  const pool = useMemo(() => {
    if (topicId === 'saved') return allWords.filter((w) => s.saved.includes(w.id))
    return topicId === 'all' ? allWords : topicById[topicId]?.words || []
  }, [topicId, s.saved])

  const start = () => {
    const words = shuffle(pool).slice(0, count)
    const distractorPool = pool.length >= 4 ? pool : allWords
    setQs(words.map((w) => buildQuestion(w, mode, distractorPool)))
    setI(0); setScore(0); setWrong([]); setResult(null); setInput('')
  }

  const q = qs[i]
  useEffect(() => { if (q && !result) inputRef.current?.focus() }, [i, q, result])
  useEffect(() => { if (q && q.mode === 'mc-jp2vi') speak(q.w.word, { rate: s.settings.rate }) }, [q]) // eslint-disable-line

  const finish = (ok) => {
    setResult(ok)
    review(q.w.id, ok.ok ? 2 : 0)
    if (ok.ok) setScore((x) => x + 1)
    else {
      setWrong((ws) => [...ws, q.w])
      if (autoSave && !s.saved.includes(q.w.id)) toggleSaved(q.w.id)
    }
    speak(q.ex.jp, { rate: s.settings.rate })
  }

  const submitText = () => {
    if (!input.trim()) return
    if (q.mode === 'sentence') {
      const pct = sentenceScore(input, q.target)
      finish({ ok: pct >= 70, pct })
    } else {
      const ok = q.answers.some((a) => normalizeJa(a) === normalizeJa(input))
      finish({ ok })
    }
  }

  const pick = (id) => finish({ ok: id === q.correct, picked: id })

  const next = () => {
    if (i + 1 >= qs.length) {
      addQuizResult(MODES.find((m) => m.id === mode).label, score, qs.length)
      setI(qs.length)
    } else { setI((x) => x + 1); setResult(null); setInput('') }
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Enter' && result) { e.preventDefault(); next() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // ---- Màn hình chọn ----
  if (!qs.length || i >= qs.length) {
    return (
      <div className="stack" style={{ gap: 18 }}>
        <div className="page-header">
          <div>
            <h1 className="page-title">Bài tập</h1>
            <p className="page-sub">Luyện viết tiếng Nhật từ tiếng Việt, điền từ vào câu, trắc nghiệm và cách đọc.</p>
          </div>
        </div>

        {qs.length > 0 && i >= qs.length && (
          <div className="card center fade-in">
            <div style={{ fontSize: 40 }}>{score / qs.length >= 0.8 ? '🏆' : score / qs.length >= 0.5 ? '👍' : '💪'}</div>
            <h3 style={{ margin: '6px 0' }}>Kết quả: {score}/{qs.length}</h3>
            {wrong.length > 0 && (
              <div className="mt" style={{ textAlign: 'left' }}>
                <div className="small muted mb">Từ cần ôn lại{autoSave ? ' (đã tự động lưu vào Từ chưa biết)' : ''}:</div>
                <div className="grid grid-3">
                  {wrong.map((w) => (
                    <div key={w.id} className="example">
                      <span className="example-jp bold">{w.word} <span className="word-reading">{w.reading}</span></span>
                      <span className="example-vi">{w.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button className="btn btn-primary mt" onClick={start}>Làm lại</button>
          </div>
        )}

        <div className="card stack">
          <div className="row" style={{ gap: 16 }}>
            <label className="stack" style={{ gap: 4 }}><span className="tiny muted">Nguồn từ</span>
              <select className="select" value={topicId} onChange={(e) => { const p = new URLSearchParams(params); p.set('topic', e.target.value); setParams(p) }}>
                <option value="all">Tất cả chủ đề</option>
                <option value="saved">🔖 Từ đã lưu ({s.saved.length})</option>
                {topics.map((t) => <option key={t.id} value={t.id}>{t.icon} {t.title}</option>)}
              </select>
            </label>
            <label className="stack" style={{ gap: 4 }}><span className="tiny muted">Số câu</span>
              <select className="select" value={count} onChange={(e) => setCount(Number(e.target.value))}>
                {[5, 10, 15, 20, 30].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <label className="row small" style={{ gap: 6, alignSelf: 'flex-end' }}>
              <input type="checkbox" checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} /> Tự lưu từ làm sai
            </label>
          </div>
          <div className="grid grid-2">
            {MODES.map((m) => (
              <button key={m.id} className={'option' + (mode === m.id ? ' correct' : '')} onClick={() => setMode(m.id)}>
                <div className="bold">{m.label}</div>
                <div className="small muted">{m.desc}</div>
              </button>
            ))}
          </div>
          <div className="row spread">
            <span className="muted small">{pool.length} từ trong nguồn</span>
            <button className="btn btn-primary btn-lg" disabled={pool.length < 1} onClick={start}>Bắt đầu →</button>
          </div>
        </div>
      </div>
    )
  }

  // ---- Màn hình câu hỏi ----
  const isText = ['vi2jp', 'fill', 'sentence'].includes(q.mode)
  return (
    <div className="stack fade-in" style={{ gap: 14 }}>
      <div className="row spread">
        <button className="btn btn-sm btn-ghost" onClick={() => setQs([])}>← Thoát</button>
        <span className="chip chip-primary">{MODES.find((m) => m.id === q.mode).label}</span>
        <span className="small muted">Câu {i + 1}/{qs.length} · Đúng {score}</span>
      </div>
      <div className="progress"><div style={{ width: (i / qs.length) * 100 + '%' }} /></div>

      <div className="card stack" style={{ gap: 16 }}>
        <div>
          <div className="tiny muted" style={{ marginBottom: 6 }}>
            {q.mode === 'vi2jp' && 'Viết từ tiếng Nhật có nghĩa là:'}
            {q.mode === 'fill' && 'Điền từ còn thiếu vào chỗ trống:'}
            {q.mode === 'sentence' && 'Dịch câu sau sang tiếng Nhật:'}
            {q.mode === 'mc-vi2jp' && 'Chọn từ tiếng Nhật đúng:'}
            {q.mode === 'mc-jp2vi' && 'Chọn nghĩa đúng:'}
            {q.mode === 'reading' && 'Chọn cách đọc đúng:'}
          </div>
          <div className={'quiz-prompt' + (['fill', 'mc-jp2vi', 'reading'].includes(q.mode) ? ' jp' : '')}>{q.prompt}</div>
          {q.sub && <div className="muted" style={{ marginTop: 4 }}>{q.mode === 'mc-jp2vi' && !s.settings.showReading ? null : q.sub}</div>}
          {q.hint && <div className="mt"><span className="chip">💡 {q.hint}</span></div>}
        </div>

        {isText ? (
          <form onSubmit={(e) => { e.preventDefault(); if (!result) submitText() }} className="stack">
            {q.mode === 'sentence' ? (
              <textarea ref={inputRef} className="input input-jp" rows={2} disabled={!!result} value={input} onChange={(e) => setInput(e.target.value)} placeholder="日本語で書いてください" />
            ) : (
              <input ref={inputRef} className="input input-jp" disabled={!!result} value={input} onChange={(e) => setInput(e.target.value)} placeholder="日本語で入力（漢字・ひらがな）" autoComplete="off" />
            )}
            {!result && <div className="row spread">
              <span className="tiny muted">Chấp nhận cả kanji và hiragana. Enter để nộp.</span>
              <div className="row">
                <button type="button" className="btn btn-sm" onClick={() => finish({ ok: false, skipped: true })}>Không biết</button>
                <button type="submit" className="btn btn-primary">Kiểm tra</button>
              </div>
            </div>}
          </form>
        ) : (
          <div className="options">
            {q.options.map((o) => {
              let cls = 'option'
              if (result) {
                if (o.id === q.correct) cls += ' correct'
                else if (o.id === result.picked) cls += ' wrong'
              }
              return (
                <button key={o.id} className={cls + (q.mode !== 'mc-jp2vi' ? ' jp' : '')} disabled={!!result} onClick={() => pick(o.id)}>
                  <div style={{ fontSize: q.mode === 'mc-jp2vi' ? 15 : 20 }}>{o.label}</div>
                  {o.sub && result && <div className="tiny muted">{o.sub}</div>}
                </button>
              )
            })}
          </div>
        )}

        {result && (
          <div className="stack fade-in">
            <div className={'feedback ' + (result.ok ? 'ok' : 'bad')}>
              {result.ok ? '✅ Chính xác!' : result.skipped ? '📝 Đáp án:' : '❌ Chưa đúng.'}
              {typeof result.pct === 'number' && <span> Độ giống: {result.pct}%</span>}
              {q.mode === 'sentence' ? (
                <div className="jp" style={{ fontSize: 18, marginTop: 4 }}>{q.target}</div>
              ) : (
                <div className="jp" style={{ fontSize: 20, marginTop: 4 }}>{q.w.word} <span className="small">【{q.w.reading}】</span> — <span style={{ fontSize: 15 }}>{q.w.meaning}</span></div>
              )}
            </div>
            <div className="example">
              <div className="row spread">
                <span className="example-jp">{q.ex.jp}</span>
                <button className="btn btn-sm btn-ghost" onClick={() => speak(q.ex.jp, { rate: s.settings.rate })}>🔊</button>
              </div>
              <span className="example-vi">{q.ex.vi}</span>
            </div>
            <div className="row spread">
              <SaveButton id={q.w.id} />
              <button className="btn btn-primary" onClick={next}>{i + 1 >= qs.length ? 'Xem kết quả' : 'Câu tiếp (Enter) →'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
