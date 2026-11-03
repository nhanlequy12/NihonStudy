import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore, setState, resetAll } from '../lib/storage'
import { wordById, topicById } from '../data/vocab'
import WordCard from '../components/WordCard'

export default function Saved() {
  const s = useStore()
  const [confirmReset, setConfirmReset] = useState(false)
  const words = s.saved.map((id) => wordById[id]).filter(Boolean)
  const byTopic = words.reduce((acc, w) => { (acc[w.topicId] ||= []).push(w); return acc }, {})

  const exportCsv = () => {
    const rows = [['word', 'reading', 'meaning', 'example', 'example_vi'], ...words.map((w) => [w.word, w.reading, w.meaning, w.examples[0].jp, w.examples[0].vi])]
    const csv = '﻿' + rows.map((r) => r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    a.download = 'nihonstudy-saved.csv'
    a.click()
  }

  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Từ chưa biết</h1>
          <p className="page-sub">{words.length} từ bạn đã lưu. Từ làm sai trong bài tập và luyện nghe được tự động thêm vào đây.</p>
        </div>
        <div className="row">
          <Link to="/flashcards?mode=saved" className="btn btn-primary" aria-disabled={!words.length}>🃏 Flashcard từ đã lưu</Link>
          <Link to="/quiz?topic=saved" className="btn btn-primary">✍️ Làm bài với từ đã lưu</Link>
          <button className="btn" disabled={!words.length} onClick={exportCsv}>⬇ Xuất CSV (Anki)</button>
        </div>
      </div>

      {words.length === 0 ? (
        <div className="card empty">
          <div className="big">🔖</div>
          Chưa có từ nào. Vào <Link to="/topics" style={{ color: 'var(--primary)' }}>Chủ đề</Link> và nhấn "Lưu" ở những từ bạn chưa nhớ.
        </div>
      ) : (
        Object.entries(byTopic).map(([tid, ws]) => {
          const t = topicById[tid]
          return (
            <div key={tid} className="stack" style={{ gap: 10 }}>
              <div className="row spread">
                <h3 style={{ margin: 0, fontSize: 16 }}>{t.icon} {t.title} <span className="muted small">({ws.length})</span></h3>
                <button className="btn btn-sm btn-ghost" onClick={() => setState((st) => ({ ...st, saved: st.saved.filter((id) => !ws.some((w) => w.id === id)) }))}>Bỏ lưu cả nhóm</button>
              </div>
              <div className="grid grid-2">
                {ws.map((w) => <WordCard key={w.id} w={w} compact />)}
              </div>
            </div>
          )
        })
      )}

      <div className="card row spread mt">
        <div className="small muted">Dữ liệu học được lưu trên máy này và đồng bộ lên tài khoản (nếu đã bật Firebase).</div>
        {confirmReset ? (
          <div className="row">
            <span className="small">Xóa toàn bộ tiến độ?</span>
            <button className="btn btn-sm btn-danger" onClick={() => { resetAll(); setConfirmReset(false) }}>Xóa</button>
            <button className="btn btn-sm" onClick={() => setConfirmReset(false)}>Hủy</button>
          </div>
        ) : (
          <button className="btn btn-sm btn-ghost" onClick={() => setConfirmReset(true)}>Đặt lại tiến độ</button>
        )}
      </div>
    </div>
  )
}
