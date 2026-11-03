import { Link } from 'react-router-dom'
import { useStore } from '../lib/storage'
import { dueCount, masteryLevel } from '../lib/srs'
import { allWords, topics } from '../data/vocab'
import { readings } from '../data/reading'
import { listenings } from '../data/listening'

const quick = [
  { to: '/flashcards', ico: '🃏', title: 'Ôn flashcard', sub: 'Lặp lại ngắt quãng (SRS)' },
  { to: '/quiz', ico: '✍️', title: 'Bài tập Việt → Nhật', sub: 'Nhìn nghĩa, viết tiếng Nhật' },
  { to: '/listening', ico: '🎧', title: 'Luyện nghe', sub: 'Hội thoại kiểu đề thi N2' },
  { to: '/shadowing', ico: '🗣️', title: 'Shadowing', sub: 'Nghe và nói theo câu ví dụ' },
  { to: '/reading', ico: '📖', title: 'Đọc hiểu', sub: 'Bài đọc ngắn + câu hỏi' },
  { to: '/saved', ico: '🔖', title: 'Từ chưa biết', sub: 'Danh sách từ bạn đã lưu' },
]

export default function Home() {
  const s = useStore()
  const learnedIds = allWords.filter((w) => s.srs[w.id]).map((w) => w.id)
  const due = dueCount(learnedIds)
  const mastered = allWords.filter((w) => masteryLevel(w.id) >= 2).length
  const readingDone = Object.keys(s.readingDone).length
  const listeningDone = Object.keys(s.listeningDone).length
  const lastQuiz = s.quizHistory.slice(-5).reverse()
  const pct = Math.round((learnedIds.length / allWords.length) * 100)

  return (
    <div className="stack" style={{ gap: 22 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">こんにちは 👋</h1>
          <p className="page-sub">Mục tiêu: JLPT N2. Mỗi ngày học một chút, chuỗi hiện tại <b>{s.streak.count}</b> ngày.</p>
        </div>
        <Link to="/flashcards" className="btn btn-primary btn-lg">
          {due ? `Ôn ${due} thẻ đến hạn` : 'Học thẻ mới'} →
        </Link>
      </div>

      <div className="grid grid-4">
        <div className="card stat"><span className="stat-value">{learnedIds.length}<span className="muted small">/{allWords.length}</span></span><span className="stat-label">Từ đã học</span></div>
        <div className="card stat"><span className="stat-value">{mastered}</span><span className="stat-label">Từ đã nhớ chắc</span></div>
        <div className="card stat"><span className="stat-value">{s.saved.length}</span><span className="stat-label">Từ đã lưu để ôn</span></div>
        <div className="card stat"><span className="stat-value">{readingDone + listeningDone}<span className="muted small">/{readings.length + listenings.length}</span></span><span className="stat-label">Bài nghe / đọc đã làm</span></div>
      </div>

      <div className="card">
        <div className="row spread mb"><b>Tiến độ từ vựng N2</b><span className="muted small">{pct}%</span></div>
        <div className="progress"><div style={{ width: pct + '%' }} /></div>
        <div className="grid grid-3 mt">
          {topics.map((t) => {
            const n = t.words.filter((w) => s.srs[w.id]).length
            return (
              <Link key={t.id} to={`/topics/${t.id}`} className="row" style={{ gap: 10 }}>
                <span style={{ fontSize: 20 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div className="small bold">{t.title}</div>
                  <div className="progress" style={{ height: 5, marginTop: 4 }}><div style={{ width: (n / t.words.length) * 100 + '%', background: t.color }} /></div>
                </div>
                <span className="tiny muted">{n}/{t.words.length}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: 18, margin: '0 0 12px' }}>Luyện tập</h2>
        <div className="grid grid-3">
          {quick.map((q) => (
            <Link key={q.to} to={q.to} className="card topic-card" style={{ minHeight: 120 }}>
              <div style={{ fontSize: 26 }}>{q.ico}</div>
              <div className="topic-title">{q.title}</div>
              <div className="small muted">{q.sub}</div>
            </Link>
          ))}
        </div>
      </div>

      {lastQuiz.length > 0 && (
        <div className="card">
          <b>Kết quả gần đây</b>
          <table className="table mt">
            <thead><tr><th>Ngày</th><th>Dạng bài</th><th>Kết quả</th></tr></thead>
            <tbody>
              {lastQuiz.map((q, i) => (
                <tr key={i}>
                  <td>{new Date(q.date).toLocaleString('vi-VN')}</td>
                  <td>{q.mode}</td>
                  <td><span className={`chip ${q.correct / q.total >= 0.7 ? 'chip-success' : 'chip-warn'}`}>{q.correct}/{q.total}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
