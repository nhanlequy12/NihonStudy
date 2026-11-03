import { groups } from '../data/vocab'

/**
 * Ô chọn nguồn từ dùng chung. value: 'all' | 'saved' | groupId ('jt3') | topicId ('jt3-2', 'work').
 * extra: các option thêm vào đầu [{value,label}]
 */
export default function TopicSelect({ value, onChange, extra = [], savedCount, className = 'select' }) {
  return (
    <select className={className} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="all">Tất cả từ vựng</option>
      {savedCount !== undefined && <option value="saved">🔖 Từ đã lưu ({savedCount})</option>}
      {extra.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      {groups.map((g) => (
        <optgroup key={g.id} label={g.title}>
          <option value={g.id}>{g.icon || '📚'} Cả nhóm: {g.title}</option>
          {g.topics.map((t) => <option key={t.id} value={t.id}>　{t.icon} {t.title}</option>)}
        </optgroup>
      ))}
    </select>
  )
}
