import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useStore, updateSettings } from '../lib/storage'
import { dueCount } from '../lib/srs'
import { allWords } from '../data/vocab'

const nav = [
  { to: '/', label: 'Tổng quan', ico: '🏠', end: true },
  { to: '/topics', label: 'Chủ đề', ico: '📚' },
  { to: '/flashcards', label: 'Flashcard', ico: '🃏' },
  { to: '/quiz', label: 'Bài tập', ico: '✍️' },
  { to: '/listening', label: 'Luyện nghe', ico: '🎧' },
  { to: '/shadowing', label: 'Shadowing', ico: '🗣️' },
  { to: '/reading', label: 'Đọc hiểu', ico: '📖' },
  { to: '/saved', label: 'Từ đã lưu', ico: '🔖' },
]

function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'auto') {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.setAttribute('data-theme', dark ? 'dark' : 'light')
  } else root.setAttribute('data-theme', theme)
}

export default function Layout() {
  const s = useStore()
  const saved = s.saved.length
  const due = dueCount(allWords.filter((w) => s.srs[w.id]).map((w) => w.id))
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  useEffect(() => {
    applyTheme(s.settings.theme)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme(s.settings.theme)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [s.settings.theme])

  const cycleTheme = () => {
    const order = ['auto', 'light', 'dark']
    updateSettings({ theme: order[(order.indexOf(s.settings.theme) + 1) % order.length] })
  }

  const badge = (item) => {
    if (item.to === '/saved' && saved) return saved
    if (item.to === '/flashcards' && due) return due
    return null
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">日</div>
          <div>
            <div className="brand-name">NihonStudy</div>
            <div className="brand-sub">Luyện JLPT N2</div>
          </div>
        </div>
        {nav.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            <span className="ico">{n.ico}</span>
            {n.label}
            {badge(n) ? <span className="nav-badge">{badge(n)}</span> : null}
          </NavLink>
        ))}
        <div className="sidebar-footer">
          <div>🔥 Chuỗi ngày học: <b>{s.streak.count}</b></div>
          <button className="btn btn-sm" onClick={cycleTheme}>
            Giao diện: {s.settings.theme === 'auto' ? 'Tự động' : s.settings.theme === 'dark' ? 'Tối' : 'Sáng'}
          </button>
        </div>
      </aside>

      <header className="topbar">
        <div className="brand">
          <div className="brand-logo">日</div>
          <div className="brand-name">NihonStudy</div>
        </div>
        <span className="chip" style={{ marginLeft: 'auto' }}>🔥 {s.streak.count}</span>
        <button className="btn btn-sm btn-ghost" onClick={cycleTheme}>{s.settings.theme === 'dark' ? '🌙' : s.settings.theme === 'light' ? '☀️' : '🌓'}</button>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <nav className="bottom-nav">
        {nav.slice(0, 6).map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="ico">{n.ico}</span>{n.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
