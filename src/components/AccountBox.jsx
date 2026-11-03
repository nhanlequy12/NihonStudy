import { useSync, loginGoogle, logout } from '../lib/sync'

const stateLabel = { connecting: 'Đang kết nối…', synced: 'Đã đồng bộ', saving: 'Đang lưu…', error: 'Lỗi đồng bộ', off: 'Chỉ lưu trên máy' }
const stateDot = { connecting: 'var(--warn)', synced: 'var(--success)', saving: 'var(--warn)', error: 'var(--danger)', off: 'var(--text-muted)' }

export default function AccountBox({ compact = false }) {
  const s = useSync()
  if (!s.enabled) {
    return compact ? null : <div className="tiny muted">💾 Dữ liệu lưu trên máy này (chưa bật Firebase)</div>
  }
  const u = s.user
  const dot = <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: stateDot[s.state] }} />

  if (compact) {
    return u && !u.isAnonymous && u.photo
      ? <img src={u.photo} alt="" referrerPolicy="no-referrer" style={{ width: 28, height: 28, borderRadius: 14 }} title={u.name} />
      : <button className="btn btn-sm" onClick={loginGoogle} title="Đăng nhập Google để đồng bộ">{dot} Đăng nhập</button>
  }

  return (
    <div className="card stack" style={{ padding: 12, gap: 8 }}>
      {u && !u.isAnonymous ? (
        <div className="row" style={{ gap: 8 }}>
          {u.photo && <img src={u.photo} alt="" referrerPolicy="no-referrer" style={{ width: 32, height: 32, borderRadius: 16 }} />}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="small bold" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name || u.email}</div>
            <div className="tiny muted">{dot} {stateLabel[s.state]}</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="small bold">👤 Tài khoản máy này</div>
          <div className="tiny muted">{dot} {stateLabel[s.state]} · dữ liệu riêng cho máy này</div>
        </div>
      )}
      {s.error && <div className="tiny" style={{ color: 'var(--danger)' }}>{s.error}</div>}
      {u && !u.isAnonymous
        ? <button className="btn btn-sm" onClick={logout}>Đăng xuất</button>
        : <button className="btn btn-sm btn-primary" onClick={loginGoogle} disabled={!u}>Đăng nhập Google để đồng bộ</button>}
    </div>
  )
}
