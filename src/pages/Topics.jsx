import { Link } from 'react-router-dom'
import { topics } from '../data/vocab'
import { useStore } from '../lib/storage'

export default function Topics() {
  const s = useStore()
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Học theo chủ đề</h1>
          <p className="page-sub">{topics.length} chủ đề · {topics.reduce((a, t) => a + t.words.length, 0)} từ vựng N2, mỗi từ kèm 2 câu ví dụ.</p>
        </div>
      </div>
      <div className="grid grid-2">
        {topics.map((t) => {
          const n = t.words.filter((w) => s.srs[w.id]).length
          const saved = t.words.filter((w) => s.saved.includes(w.id)).length
          return (
            <Link key={t.id} to={`/topics/${t.id}`} className="card topic-card">
              <div className="row spread">
                <div className="topic-icon" style={{ background: t.color + '22' }}>{t.icon}</div>
                {saved > 0 && <span className="chip chip-warn">🔖 {saved}</span>}
              </div>
              <div>
                <div className="topic-title">{t.title}</div>
                <div className="topic-jp">{t.jp}</div>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <div className="row spread tiny muted"><span>{t.words.length} từ</span><span>{n} đã học</span></div>
                <div className="progress" style={{ marginTop: 6 }}><div style={{ width: (n / t.words.length) * 100 + '%', background: t.color }} /></div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
