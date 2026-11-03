import { useState } from 'react'
import { Link } from 'react-router-dom'
import { groups, allWords } from '../data/vocab'
import { useStore } from '../lib/storage'

function TopicCard({ t, s }) {
  const n = t.words.filter((w) => s.srs[w.id]).length
  const saved = t.words.filter((w) => s.saved.includes(w.id)).length
  return (
    <Link to={`/topics/${t.id}`} className="card topic-card" style={{ minHeight: 120 }}>
      <div className="row spread">
        <div className="topic-icon" style={{ background: t.color + '22', width: 36, height: 36, fontSize: 18 }}>{t.icon}</div>
        {saved > 0 && <span className="chip chip-warn">🔖 {saved}</span>}
      </div>
      <div>
        <div className="topic-title" style={{ fontSize: 15 }}>{t.title}</div>
        <div className="topic-jp">{t.jp}</div>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <div className="row spread tiny muted"><span>{t.words.length} từ</span><span>{n} đã học</span></div>
        <div className="progress" style={{ marginTop: 6, height: 5 }}><div style={{ width: (n / t.words.length) * 100 + '%', background: t.color }} /></div>
      </div>
    </Link>
  )
}

export default function Topics() {
  const s = useStore()
  const [open, setOpen] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nihonstudy:openGroups')) || { basic: true } } catch { return { basic: true } }
  })
  const [q, setQ] = useState('')
  const toggle = (id) => setOpen((o) => { const n = { ...o, [id]: !o[id] }; try { localStorage.setItem('nihonstudy:openGroups', JSON.stringify(n)) } catch { /* ignore */ } return n })

  const query = q.trim().toLowerCase()
  const hits = query ? allWords.filter((w) => w.word.includes(query) || w.reading.includes(query) || w.meaning.toLowerCase().includes(query)).slice(0, 40) : []

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Học theo chủ đề</h1>
          <p className="page-sub">{groups.length} nhóm · {groups.reduce((a, g) => a + g.topics.length, 0)} bài · {allWords.length} từ vựng N2, mỗi từ kèm câu ví dụ.</p>
        </div>
        <input className="input" style={{ maxWidth: 300 }} placeholder="Tìm từ trong toàn bộ kho…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {query && (
        <div className="card stack" style={{ gap: 6 }}>
          <b className="small">Kết quả tìm kiếm ({hits.length}{hits.length === 40 ? '+' : ''})</b>
          {hits.length === 0 && <span className="muted small">Không tìm thấy.</span>}
          {hits.map((w) => (
            <Link key={w.id} to={`/topics/${w.topicId}?q=${encodeURIComponent(w.word)}`} className="row spread" style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span><span className="jp bold">{w.word}</span> <span className="word-reading tiny">{w.reading !== w.word ? w.reading : ''}</span> <span className="small">— {w.meaning}</span></span>
              <span className="tiny muted">{w.topicId}</span>
            </Link>
          ))}
        </div>
      )}

      {groups.map((g) => {
        const words = g.topics.flatMap((t) => t.words)
        const n = words.filter((w) => s.srs[w.id]).length
        const isOpen = !!open[g.id]
        return (
          <div key={g.id}>
            <button className={'group-head' + (isOpen ? ' open' : '')} onClick={() => toggle(g.id)}>
              <span style={{ fontSize: 22 }}>{g.icon || '📚'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="bold">{g.title} {g.jp && <span className="jp muted" style={{ fontWeight: 400, fontSize: 13 }}>{g.jp}</span>}</div>
                <div className="tiny muted">{g.sub} · {n}/{words.length} đã học</div>
                <div className="progress" style={{ height: 4, marginTop: 6, maxWidth: 360 }}><div style={{ width: (n / words.length) * 100 + '%', background: g.color || 'var(--primary)' }} /></div>
              </div>
              <span className="chev">▶</span>
            </button>
            {isOpen && (
              <div className="group-body grid grid-3">
                {g.topics.map((t) => <TopicCard key={t.id} t={t} s={s} />)}
              </div>
            )}
          </div>
        )
      })}
      <div className="tiny muted">Bộ "2500 từ vựng N2" lấy từ <a href="https://jtest.net/tu-vung-n2" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>jtest.net</a> (はじめての日本語能力試験 N2 単語 2500). Âm thanh từ vựng dùng file của jtest, câu ví dụ dùng giọng đọc trình duyệt.</div>
    </div>
  )
}
