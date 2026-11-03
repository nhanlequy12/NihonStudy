import { useState, useMemo, useRef, useEffect } from 'react'
import { listenings } from '../data/listening'
import { allWords, topics, topicById } from '../data/vocab'
import { useStore, setListeningDone, addQuizResult, updateSettings, toggleSaved } from '../lib/storage'
import { speak, speakLines, stopSpeaking, ttsSupported } from '../lib/tts'
import { shuffle, sample, normalizeJa } from '../lib/utils'
import { SaveButton } from '../components/WordCard'

function RateControl() {
  const s = useStore()
  return (
    <label className="row small muted" style={{ gap: 6 }}>
      Tốc độ
      <select className="select" value={s.settings.rate} onChange={(e) => updateSettings({ rate: Number(e.target.value) })}>
        <option value={0.7}>0.7x</option><option value={0.85}>0.85x</option><option value={1}>1x</option><option value={1.2}>1.2x</option>
      </select>
    </label>
  )
}

// ---------- Phần 1: Nghe câu ngắn ----------
function SentenceDrill() {
  const s = useStore()
  const [topicId, setTopicId] = useState('all')
  const [kind, setKind] = useState('meaning') // meaning | dictation
  const [qs, setQs] = useState([])
  const [i, setI] = useState(0)
  const [result, setResult] = useState(null)
  const [input, setInput] = useState('')
  const [score, setScore] = useState(0)
  const [plays, setPlays] = useState(0)
  const inputRef = useRef()

  const pool = useMemo(() => (topicId === 'all' ? allWords : topicById[topicId].words), [topicId])

  const start = () => {
    const words = sample(pool, 8)
    setQs(words.map((w) => {
      const ex = w.examples[Math.floor(Math.random() * w.examples.length)]
      const others = sample(allWords.filter((x) => x.id !== w.id), 3).map((x) => x.examples[0])
      return { w, ex, options: shuffle([ex, ...others]) }
    }))
    setI(0); setResult(null); setScore(0); setInput(''); setPlays(0)
  }
  const q = qs[i]
  useEffect(() => { if (q) { setPlays(1); speak(q.ex.jp, { rate: s.settings.rate }); inputRef.current?.focus() } }, [q]) // eslint-disable-line

  const play = () => { setPlays((p) => p + 1); speak(q.ex.jp, { rate: s.settings.rate }) }

  const answer = (ok, extra = {}) => {
    setResult({ ok, ...extra })
    if (ok) setScore((x) => x + 1)
    else if (!s.saved.includes(q.w.id)) toggleSaved(q.w.id)
  }
  const checkDictation = () => {
    const a = normalizeJa(input), b = normalizeJa(q.ex.jp)
    answer(a === b || (a.length && b.includes(a) && a.length >= b.length * 0.8), {})
  }
  const next = () => {
    if (i + 1 >= qs.length) { addQuizResult(kind === 'meaning' ? 'Nghe câu → chọn nghĩa' : 'Nghe chép chính tả', score, qs.length); setQs([]) }
    else { setI((x) => x + 1); setResult(null); setInput('') }
  }

  if (!q) {
    return (
      <div className="card stack">
        <div className="row spread">
          <div>
            <b>Nghe câu ngắn</b>
            <div className="small muted">Nghe một câu ví dụ, chọn nghĩa đúng hoặc chép lại câu. Từ nghe sai sẽ tự lưu.</div>
          </div>
          <RateControl />
        </div>
        <div className="row">
          <select className="select" value={topicId} onChange={(e) => setTopicId(e.target.value)}>
            <option value="all">Tất cả chủ đề</option>
            {topics.map((t) => <option key={t.id} value={t.id}>{t.icon} {t.title}</option>)}
          </select>
          <select className="select" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option value="meaning">Nghe → chọn nghĩa tiếng Việt</option>
            <option value="dictation">Nghe → chép lại (chính tả)</option>
          </select>
          <button className="btn btn-primary" onClick={start}>Bắt đầu 8 câu →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="card stack fade-in">
      <div className="row spread">
        <button className="btn btn-sm btn-ghost" onClick={() => setQs([])}>← Thoát</button>
        <span className="small muted">Câu {i + 1}/{qs.length} · Đúng {score}</span>
      </div>
      <div className="center stack" style={{ alignItems: 'center' }}>
        <button className="btn btn-icon btn-primary" style={{ width: 72, height: 72, fontSize: 28 }} onClick={play}>🔊</button>
        <span className="tiny muted">Đã nghe {plays} lần · <RateControl /></span>
      </div>

      {kind === 'meaning' ? (
        <div className="options">
          {q.options.map((o, k) => {
            let cls = 'option'
            if (result) { if (o === q.ex) cls += ' correct'; else if (o === result.picked) cls += ' wrong' }
            return <button key={k} className={cls} disabled={!!result} onClick={() => answer(o === q.ex, { picked: o })}>{o.vi}</button>
          })}
        </div>
      ) : (
        <form className="stack" onSubmit={(e) => { e.preventDefault(); if (!result) checkDictation() }}>
          <input ref={inputRef} className="input input-jp" value={input} disabled={!!result} onChange={(e) => setInput(e.target.value)} placeholder="聞いた文を書いてください" autoComplete="off" />
          {!result && <div className="row" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-sm" onClick={() => answer(false, { skipped: true })}>Không nghe được</button>
            <button className="btn btn-primary" type="submit">Kiểm tra</button>
          </div>}
        </form>
      )}

      {result && (
        <div className="stack fade-in">
          <div className={'feedback ' + (result.ok ? 'ok' : 'bad')}>
            {result.ok ? '✅ Chính xác!' : '❌ Chưa đúng.'}
            <div className="jp" style={{ fontSize: 20, marginTop: 4 }}>{q.ex.jp}</div>
            <div className="small">{q.ex.vi}</div>
          </div>
          <div className="row spread">
            <div className="row">
              <span className="chip chip-primary jp">{q.w.word}【{q.w.reading}】 {q.w.meaning}</span>
              <SaveButton id={q.w.id} />
            </div>
            <button className="btn btn-primary" onClick={next}>{i + 1 >= qs.length ? 'Kết thúc' : 'Câu tiếp →'}</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------- Phần 2: Hội thoại kiểu đề thi ----------
function Conversation({ item, onClose }) {
  const s = useStore()
  const [lineIdx, setLineIdx] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [picked, setPicked] = useState(null)
  const [showScript, setShowScript] = useState(false)
  const token = useRef(null)

  const play = async () => {
    if (playing) { token.current.cancelled = true; stopSpeaking(); setPlaying(false); setLineIdx(-1); return }
    token.current = { cancelled: false }
    setPlaying(true)
    await speakLines(item.lines, { rate: s.settings.rate, token: token.current, onLine: setLineIdx })
    setPlaying(false)
  }
  useEffect(() => () => { if (token.current) token.current.cancelled = true; stopSpeaking() }, [])

  const choose = (k) => {
    if (picked !== null) return
    setPicked(k)
    setListeningDone(item.id, k === item.answer)
    setShowScript(true)
  }

  return (
    <div className="card stack fade-in">
      <div className="row spread">
        <button className="btn btn-sm btn-ghost" onClick={onClose}>← Danh sách</button>
        <span className="chip">{item.kind}</span>
      </div>
      <h3 style={{ margin: 0 }} className="jp">{item.title}</h3>
      <div className="row">
        <button className={'btn ' + (playing ? 'btn-danger' : 'btn-primary')} onClick={play}>{playing ? '⏹ Dừng' : '▶ Phát hội thoại'}</button>
        <RateControl />
        <button className="btn btn-sm" onClick={() => setShowScript((v) => !v)}>{showScript ? 'Ẩn script' : 'Xem script'}</button>
      </div>

      {showScript && (
        <div className="stack" style={{ gap: 4 }}>
          {item.lines.map((l, k) => (
            <div key={k} className={'script-line' + (lineIdx === k ? ' active' : '')}>
              <span className={'speaker ' + l.speaker}>{l.speaker === 'N' ? 'N' : l.speaker === 'M' ? '男' : '女'}</span>
              <span className="jp" style={{ flex: 1 }}>{l.text}</span>
              <button className="btn btn-sm btn-ghost" onClick={() => speak(l.text, { rate: s.settings.rate, gender: l.speaker })}>🔊</button>
            </div>
          ))}
          <div className="example mt"><span className="example-vi">📝 Tóm tắt: {item.vi}</span></div>
        </div>
      )}
      {!showScript && lineIdx >= 0 && <div className="muted small center">Đang phát dòng {lineIdx + 1}/{item.lines.length}…</div>}

      <div className="jp bold" style={{ fontSize: 17 }}>{item.question}</div>
      <div className="options">
        {item.options.map((o, k) => {
          let cls = 'option jp'
          if (picked !== null) { if (k === item.answer) cls += ' correct'; else if (k === picked) cls += ' wrong' }
          return <button key={k} className={cls} disabled={picked !== null} onClick={() => choose(k)}>{k + 1}. {o}</button>
        })}
      </div>
      {picked !== null && (
        <div className={'feedback fade-in ' + (picked === item.answer ? 'ok' : 'bad')}>
          {picked === item.answer ? '✅ Chính xác!' : '❌ Chưa đúng.'} <span className="jp">{item.explain}</span>
        </div>
      )}
    </div>
  )
}

export default function Listening() {
  const s = useStore()
  const [open, setOpen] = useState(null)
  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Luyện nghe</h1>
          <p className="page-sub">Âm thanh tạo bằng giọng đọc của trình duyệt (Web Speech). Dùng Chrome/Edge để có giọng tiếng Nhật tốt nhất.</p>
        </div>
      </div>
      {!ttsSupported() && <div className="feedback bad">Trình duyệt này không hỗ trợ đọc văn bản. Hãy dùng Chrome hoặc Edge.</div>}

      {open ? <Conversation item={open} onClose={() => setOpen(null)} /> : (
        <>
          <SentenceDrill />
          <div>
            <h2 style={{ fontSize: 18, margin: '8px 0 12px' }}>Hội thoại kiểu đề thi 聴解</h2>
            <div className="grid grid-2">
              {listenings.map((l) => {
                const done = s.listeningDone[l.id]
                return (
                  <button key={l.id} className="card topic-card" style={{ minHeight: 110, textAlign: 'left' }} onClick={() => setOpen(l)}>
                    <div className="row spread">
                      <span className="chip">{l.kind}</span>
                      {done !== undefined && <span className={'chip ' + (done ? 'chip-success' : 'chip-danger')}>{done ? '✓ Đúng' : '✗ Sai'}</span>}
                    </div>
                    <div className="topic-title jp">{l.title}</div>
                    <div className="small muted">{l.lines.length} câu thoại · 1 câu hỏi</div>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
