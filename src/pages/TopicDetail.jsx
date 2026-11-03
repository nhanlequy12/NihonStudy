import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { topicById } from '../data/vocab'
import WordCard from '../components/WordCard'
import { useStore, updateSettings } from '../lib/storage'
import { speakLines, stopSpeaking } from '../lib/tts'

export default function TopicDetail() {
  const { id } = useParams()
  const t = topicById[id]
  const s = useStore()
  const nav = useNavigate()
  const [filter, setFilter] = useState('')
  const [playing, setPlaying] = useState(false)

  if (!t) return <div className="empty">Không tìm thấy chủ đề. <Link to="/topics">Quay lại</Link></div>

  const words = t.words.filter((w) => !filter || w.word.includes(filter) || w.reading.includes(filter) || w.meaning.toLowerCase().includes(filter.toLowerCase()))

  const playAll = async () => {
    if (playing) { stopSpeaking(); setPlaying(false); return }
    setPlaying(true)
    const lines = t.words.flatMap((w) => [{ text: w.word }, { text: w.examples[0].jp }])
    const token = { cancelled: false }
    playAllToken = token
    await speakLines(lines, { rate: s.settings.rate, token })
    setPlaying(false)
  }

  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="page-header">
        <div>
          <Link to="/topics" className="small muted">← Tất cả chủ đề</Link>
          <h1 className="page-title">{t.icon} {t.title} <span className="jp muted" style={{ fontSize: 16, fontWeight: 400 }}>{t.jp}</span></h1>
          <p className="page-sub">{t.words.length} từ · Nhấn 🔊 để nghe, 🔖 để lưu từ chưa biết.</p>
        </div>
        <div className="row">
          <button className="btn" onClick={playAll}>{playing ? '⏹ Dừng' : '▶ Nghe cả chủ đề'}</button>
          <button className="btn btn-primary" onClick={() => nav(`/flashcards?topic=${t.id}`)}>🃏 Flashcard</button>
          <button className="btn btn-primary" onClick={() => nav(`/quiz?topic=${t.id}`)}>✍️ Làm bài</button>
        </div>
      </div>

      <div className="row spread">
        <input className="input" style={{ maxWidth: 320 }} placeholder="Tìm từ, cách đọc, nghĩa..." value={filter} onChange={(e) => setFilter(e.target.value)} />
        <div className="row small muted">
          <label className="row" style={{ gap: 6 }}>
            <input type="checkbox" checked={s.settings.showReading} onChange={(e) => updateSettings({ showReading: e.target.checked })} /> Hiện cách đọc
          </label>
          <label className="row" style={{ gap: 6 }}>
            Tốc độ đọc
            <select className="select" value={s.settings.rate} onChange={(e) => updateSettings({ rate: Number(e.target.value) })}>
              <option value={0.7}>0.7x</option><option value={0.85}>0.85x</option><option value={1}>1x</option><option value={1.2}>1.2x</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-2">
        {words.map((w) => <WordCard key={w.id} w={w} />)}
      </div>
      {words.length === 0 && <div className="empty">Không có từ nào khớp.</div>}
    </div>
  )
}

let playAllToken = null
window.addEventListener('hashchange', () => { if (playAllToken) { playAllToken.cancelled = true; stopSpeaking() } })
