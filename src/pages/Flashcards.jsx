import { useMemo, useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { topics, allWords, topicById } from '../data/vocab'
import { useStore } from '../lib/storage'
import { review, isDue, getCard } from '../lib/srs'
import { speak } from '../lib/tts'
import { shuffle } from '../lib/utils'
import { SaveButton } from '../components/WordCard'

const MODES = [
  { id: 'due', label: 'Đến hạn ôn' },
  { id: 'new', label: 'Từ mới' },
  { id: 'saved', label: 'Từ đã lưu' },
  { id: 'all', label: 'Tất cả' },
]

export default function Flashcards() {
  const s = useStore()
  const [params, setParams] = useSearchParams()
  const topicId = params.get('topic') || 'all'
  const mode = params.get('mode') || 'due'
  const front = params.get('front') || 'jp' // jp | vi
  const [queue, setQueue] = useState([])
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(0)
  const [started, setStarted] = useState(false)

  const pool = useMemo(() => {
    const base = topicId === 'all' ? allWords : topicById[topicId]?.words || []
    if (mode === 'saved') return base.filter((w) => s.saved.includes(w.id))
    if (mode === 'new') return base.filter((w) => !s.srs[w.id])
    if (mode === 'due') return base.filter((w) => s.srs[w.id] && isDue(w.id))
    return base
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, mode, s.saved.length, started])

  const set = (k, v) => { const p = new URLSearchParams(params); p.set(k, v); setParams(p); setStarted(false) }

  const start = (limit = 20) => {
    setQueue(shuffle(pool).slice(0, limit))
    setI(0); setFlipped(false); setDone(0); setStarted(true)
  }

  const current = queue[i]
  useEffect(() => { if (current && front === 'jp') speak(current.word, { rate: s.settings.rate }) }, [current, front]) // eslint-disable-line

  const grade = (g) => {
    review(current.id, g)
    setDone((d) => d + 1)
    if (g === 0) setQueue((q) => [...q, current]) // quên → đưa về cuối hàng đợi
    setFlipped(false)
    setI((x) => x + 1)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (!current) return
      if (e.code === 'Space') { e.preventDefault(); setFlipped((f) => !f) }
      if (flipped && ['1', '2', '3', '4'].includes(e.key)) grade(Number(e.key) - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const dueAll = allWords.filter((w) => s.srs[w.id] && isDue(w.id)).length

  if (!started || !current) {
    return (
      <div className="stack" style={{ gap: 18 }}>
        <div className="page-header">
          <div>
            <h1 className="page-title">Flashcard</h1>
            <p className="page-sub">Lặp lại ngắt quãng: thẻ bạn nhớ tốt sẽ xuất hiện thưa dần, thẻ hay quên sẽ quay lại sớm. Hiện có <b>{dueAll}</b> thẻ đến hạn.</p>
          </div>
        </div>
        {started && queue.length > 0 && (
          <div className="card center fade-in">
            <div style={{ fontSize: 40 }}>🎉</div>
            <h3 style={{ margin: '6px 0' }}>Xong phiên ôn!</h3>
            <p className="muted">Bạn đã ôn {done} lượt thẻ. Hãy quay lại ngày mai để ôn tiếp.</p>
          </div>
        )}
        <div className="card stack">
          <div className="row" style={{ gap: 16 }}>
            <label className="stack" style={{ gap: 4 }}><span className="tiny muted">Chủ đề</span>
              <select className="select" value={topicId} onChange={(e) => set('topic', e.target.value)}>
                <option value="all">Tất cả chủ đề</option>
                {topics.map((t) => <option key={t.id} value={t.id}>{t.icon} {t.title}</option>)}
              </select>
            </label>
            <label className="stack" style={{ gap: 4 }}><span className="tiny muted">Chọn thẻ</span>
              <select className="select" value={mode} onChange={(e) => set('mode', e.target.value)}>
                {MODES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
            </label>
            <label className="stack" style={{ gap: 4 }}><span className="tiny muted">Mặt trước</span>
              <select className="select" value={front} onChange={(e) => set('front', e.target.value)}>
                <option value="jp">Tiếng Nhật → nghĩa</option>
                <option value="vi">Nghĩa tiếng Việt → tiếng Nhật</option>
              </select>
            </label>
          </div>
          <div className="row spread">
            <span className="muted small">{pool.length} thẻ phù hợp</span>
            <div className="row">
              <button className="btn" disabled={!pool.length} onClick={() => start(10)}>Học 10 thẻ</button>
              <button className="btn btn-primary" disabled={!pool.length} onClick={() => start(20)}>Học 20 thẻ</button>
              <button className="btn" disabled={!pool.length} onClick={() => start(999)}>Tất cả</button>
            </div>
          </div>
          {pool.length === 0 && mode === 'due' && <div className="muted small">Không có thẻ đến hạn. Chọn "Từ mới" để học thêm, hoặc vào <Link to="/topics" style={{ color: 'var(--primary)' }}>Chủ đề</Link>.</div>}
        </div>
        <div className="muted tiny">Phím tắt: <kbd>Space</kbd> lật thẻ · <kbd>1</kbd> Quên · <kbd>2</kbd> Khó · <kbd>3</kbd> Tốt · <kbd>4</kbd> Dễ</div>
      </div>
    )
  }

  const w = current
  const card = getCard(w.id)
  const t = topicById[w.topicId]
  const frontJp = front === 'jp'

  return (
    <div className="stack fade-in" style={{ gap: 14 }}>
      <div className="row spread">
        <button className="btn btn-sm btn-ghost" onClick={() => setStarted(false)}>← Thoát</button>
        <span className="chip">{t.icon} {t.title}</span>
        <span className="small muted">{Math.min(i + 1, queue.length)} / {queue.length}</span>
      </div>
      <div className="progress"><div style={{ width: (i / queue.length) * 100 + '%' }} /></div>

      <div className="flashcard-wrap">
        <div className={'flashcard' + (flipped ? ' flipped' : '')} onClick={() => setFlipped((f) => !f)}>
          <div className="flashcard-face">
            {frontJp ? (
              <>
                <div className="flashcard-word">{w.word}</div>
                <div className="flashcard-hint">{w.pos} · nhấn để xem nghĩa</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 24, fontWeight: 600 }}>{w.meaning}</div>
                <div className="flashcard-hint">{w.pos} · nghĩ từ tiếng Nhật rồi nhấn để kiểm tra</div>
              </>
            )}
          </div>
          <div className="flashcard-face flashcard-back">
            <div className="flashcard-word" style={{ fontSize: 34 }}>{w.word}</div>
            <div className="word-reading" style={{ fontSize: 18 }}>{w.reading}</div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{w.meaning}</div>
            <div className="example" style={{ width: '100%', textAlign: 'left' }}>
              <span className="example-jp">{w.examples[0].jp}</span>
              <span className="example-vi">{w.examples[0].vi}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ justifyContent: 'center' }}>
        <button className="btn btn-sm" onClick={() => speak(w.word, { rate: s.settings.rate })}>🔊 Từ</button>
        <button className="btn btn-sm" onClick={() => speak(w.examples[0].jp, { rate: s.settings.rate })}>🔊 Ví dụ</button>
        <SaveButton id={w.id} />
        <span className="tiny muted">lần ôn: {card.reps} · khoảng cách: {card.interval}d</span>
      </div>

      {flipped ? (
        <div className="grade-row">
          <button className="btn btn-danger" onClick={() => grade(0)}>Quên<small>&lt; 10 phút</small></button>
          <button className="btn btn-warn" onClick={() => grade(1)}>Khó<small>{card.reps === 0 ? '12 giờ' : '2 ngày'}</small></button>
          <button className="btn btn-success" onClick={() => grade(2)}>Tốt<small>{card.reps === 0 ? '1 ngày' : card.reps === 1 ? '4 ngày' : Math.round(card.interval * card.ease) + ' ngày'}</small></button>
          <button className="btn btn-primary" onClick={() => grade(3)}>Dễ<small>{card.reps === 0 ? '3 ngày' : card.reps === 1 ? '7 ngày' : Math.round(card.interval * card.ease * 1.4) + ' ngày'}</small></button>
        </div>
      ) : (
        <div className="center"><button className="btn btn-lg btn-primary" onClick={() => setFlipped(true)}>Lật thẻ (Space)</button></div>
      )}
    </div>
  )
}
