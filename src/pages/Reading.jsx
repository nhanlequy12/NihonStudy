import { useState, useEffect, useRef } from 'react'
import { readings } from '../data/reading'
import { topicById } from '../data/vocab'
import { useStore, setReadingDone, updateSettings } from '../lib/storage'
import { speakLines, stopSpeaking, speak } from '../lib/tts'

function Passage({ r, onClose }) {
  const s = useStore()
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [showVocab, setShowVocab] = useState(true)
  const token = useRef(null)
  const paragraphs = r.text.split('\n\n')

  useEffect(() => () => { if (token.current) token.current.cancelled = true; stopSpeaking() }, [])

  const play = async () => {
    if (playing) { token.current.cancelled = true; stopSpeaking(); setPlaying(false); return }
    token.current = { cancelled: false }
    setPlaying(true)
    const lines = r.text.split(/(?<=。)/).map((t) => t.trim()).filter(Boolean).map((text) => ({ text, speaker: 'N' }))
    await speakLines(lines, { rate: s.settings.rate, token: token.current })
    setPlaying(false)
  }

  const score = r.questions.filter((q, k) => answers[k] === q.answer).length
  const submit = () => { setSubmitted(true); setReadingDone(r.id, score) }

  return (
    <div className="stack fade-in" style={{ gap: 16 }}>
      <div className="row spread">
        <button className="btn btn-sm btn-ghost" onClick={onClose}>← Danh sách bài đọc</button>
        <div className="row">
          <button className={'btn btn-sm ' + (playing ? 'btn-danger' : '')} onClick={play}>{playing ? '⏹ Dừng' : '🔊 Nghe bài đọc'}</button>
          <select className="select" value={s.settings.rate} onChange={(e) => updateSettings({ rate: Number(e.target.value) })}>
            <option value={0.7}>0.7x</option><option value={0.85}>0.85x</option><option value={1}>1x</option><option value={1.2}>1.2x</option>
          </select>
          <button className="btn btn-sm" onClick={() => setShowVocab((v) => !v)}>{showVocab ? 'Ẩn từ vựng' : 'Hiện từ vựng'}</button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: showVocab ? 'minmax(0, 2fr) minmax(220px, 1fr)' : '1fr' }}>
        <div className="card">
          <div className="row spread mb">
            <h2 className="jp" style={{ margin: 0, fontSize: 22 }}>{r.title}</h2>
            <span className="chip">{r.level}</span>
          </div>
          <div className="reading-text">
            {paragraphs.map((p, k) => <p key={k}>{p}</p>)}
          </div>
        </div>
        {showVocab && (
          <div className="card stack" style={{ gap: 8, alignSelf: 'start' }}>
            <b className="small">Từ vựng khó</b>
            {r.vocab.map((v, k) => (
              <div key={k} className="row spread" style={{ gap: 6 }}>
                <div>
                  <span className="jp bold">{v.word}</span> <span className="word-reading tiny">{v.reading}</span>
                  <div className="tiny muted">{v.vi}</div>
                </div>
                <button className="btn btn-sm btn-ghost" onClick={() => speak(v.word, { rate: s.settings.rate })}>🔊</button>
              </div>
            ))}
            {topicById[r.topicId] && <div className="tiny muted mt">Liên quan chủ đề: {topicById[r.topicId].icon} {topicById[r.topicId].title}</div>}
          </div>
        )}
      </div>

      <div className="card stack" style={{ gap: 18 }}>
        <b>Câu hỏi</b>
        {r.questions.map((q, k) => (
          <div key={k} className="stack" style={{ gap: 8 }}>
            <div className="jp bold">問{k + 1}. {q.q}</div>
            <div className="options">
              {q.options.map((o, j) => {
                let cls = 'option jp'
                if (submitted) { if (j === q.answer) cls += ' correct'; else if (answers[k] === j) cls += ' wrong' }
                else if (answers[k] === j) cls += ' correct'
                return <button key={j} className={cls} disabled={submitted} onClick={() => setAnswers((a) => ({ ...a, [k]: j }))}>{j + 1}. {o}</button>
              })}
            </div>
            {submitted && <div className={'feedback ' + (answers[k] === q.answer ? 'ok' : 'bad')}><span className="jp">{q.explain}</span></div>}
          </div>
        ))}
        {!submitted ? (
          <button className="btn btn-primary btn-lg" disabled={Object.keys(answers).length < r.questions.length} onClick={submit}>Nộp bài</button>
        ) : (
          <div className="feedback ok center" style={{ fontSize: 18 }}>Kết quả: {score}/{r.questions.length} {score === r.questions.length ? '🏆' : ''}</div>
        )}
      </div>
    </div>
  )
}

export default function Reading() {
  const s = useStore()
  const [open, setOpen] = useState(null)
  if (open) return <Passage r={open} onClose={() => setOpen(null)} />
  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Đọc hiểu</h1>
          <p className="page-sub">Bài đọc ngắn trình độ N2 kèm từ vựng khó và câu hỏi dạng đề thi. Có thể nghe bài đọc hoặc luyện shadowing từng câu.</p>
        </div>
      </div>
      <div className="grid grid-2">
        {readings.map((r) => {
          const done = s.readingDone[r.id]
          const t = topicById[r.topicId]
          return (
            <button key={r.id} className="card topic-card" style={{ textAlign: 'left', minHeight: 120 }} onClick={() => setOpen(r)}>
              <div className="row spread">
                <span className="chip">{t?.icon} {t?.title}</span>
                {done !== undefined && <span className={'chip ' + (done === r.questions.length ? 'chip-success' : 'chip-warn')}>{done}/{r.questions.length}</span>}
              </div>
              <div className="topic-title jp">{r.title}</div>
              <div className="small muted jp" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.text}</div>
              <div className="tiny muted">{r.text.length} chữ · {r.questions.length} câu hỏi</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
