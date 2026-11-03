import { useState, useMemo, useEffect, useRef } from 'react'
import { allWords, wordsFor } from '../data/vocab'
import { readings } from '../data/reading'
import { useStore, updateSettings, touchStreak } from '../lib/storage'
import { speak, stopSpeaking, listenOnce, recognitionSupported } from '../lib/tts'
import { similarity, normalizeJa, shuffle } from '../lib/utils'
import { SaveButton } from '../components/WordCard'
import TopicSelect from '../components/TopicSelect'

/** Tô màu từng ký tự: xanh nếu có trong câu nói của người dùng. */
function Diff({ target, spoken }) {
  const sp = normalizeJa(spoken)
  const counts = new Map()
  for (const ch of sp) counts.set(ch, (counts.get(ch) || 0) + 1)
  return (
    <span className="diff jp" style={{ fontSize: 20 }}>
      {[...target].map((ch, i) => {
        const n = normalizeJa(ch)
        if (!n) return <span key={i}>{ch}</span>
        const ok = counts.get(n) > 0
        if (ok) counts.set(n, counts.get(n) - 1)
        return <span key={i} className={ok ? 'ok' : 'miss'}>{ch}</span>
      })}
    </span>
  )
}

export default function Shadowing() {
  const s = useStore()
  const [source, setSource] = useState('all')
  const [items, setItems] = useState([])
  const [i, setI] = useState(0)
  const [showText, setShowText] = useState(true)
  const [showVi, setShowVi] = useState(true)
  const [recording, setRecording] = useState(false)
  const [spoken, setSpoken] = useState(null)
  const [scores, setScores] = useState([])
  const [loop, setLoop] = useState(false)
  const loopRef = useRef(false)

  const build = () => {
    let list = []
    if (source.startsWith('reading:')) {
      const r = readings.find((x) => x.id === source.slice(8))
      list = r.text.split(/(?<=。)/).map((t) => t.trim()).filter(Boolean).map((jp) => ({ jp, vi: '', w: null }))
    } else {
      const pool = source === 'saved' ? allWords.filter((w) => s.saved.includes(w.id)) : wordsFor(source)
      list = shuffle(pool).slice(0, 12).map((w) => ({ jp: w.examples[0].jp, vi: w.examples[0].vi, w }))
    }
    setItems(list); setI(0); setSpoken(null); setScores([])
  }

  const cur = items[i]
  useEffect(() => { if (cur) speak(cur.jp, { rate: s.settings.rate }) }, [cur]) // eslint-disable-line
  useEffect(() => () => { loopRef.current = false; stopSpeaking() }, [])

  const play = () => speak(cur.jp, { rate: s.settings.rate })
  const playSlow = () => speak(cur.jp, { rate: Math.max(0.5, s.settings.rate - 0.3) })

  const toggleLoop = async () => {
    if (loopRef.current) { loopRef.current = false; setLoop(false); stopSpeaking(); return }
    loopRef.current = true; setLoop(true)
    while (loopRef.current) {
      await speak(cur.jp, { rate: s.settings.rate })
      if (!loopRef.current) break
      // chừa khoảng trống để người học nói theo
      await new Promise((r) => setTimeout(r, Math.max(1500, cur.jp.length * 180)))
    }
  }

  const record = async () => {
    if (recording) return
    stopSpeaking(); loopRef.current = false; setLoop(false)
    setRecording(true); setSpoken(null)
    const text = await listenOnce()
    setRecording(false)
    setSpoken(text)
    if (text) {
      const sc = Math.round(similarity(text, cur.jp) * 100)
      setScores((arr) => { const a = [...arr]; a[i] = sc; return a })
      touchStreak()
    }
  }

  const go = (d) => { loopRef.current = false; setLoop(false); stopSpeaking(); setSpoken(null); setI((x) => Math.max(0, Math.min(items.length - 1, x + d))) }

  const avg = scores.filter((x) => x != null).length ? Math.round(scores.filter((x) => x != null).reduce((a, b) => a + b, 0) / scores.filter((x) => x != null).length) : null

  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Shadowing</h1>
          <p className="page-sub">Nghe câu mẫu rồi nói theo ngay lập tức, bắt chước ngữ điệu và tốc độ. Bật micro để máy chấm độ giống.</p>
        </div>
      </div>

      {!cur ? (
        <div className="card stack">
          <div className="row">
            <TopicSelect value={source} savedCount={s.saved.length} onChange={setSource}
              extra={readings.map((r) => ({ value: 'reading:' + r.id, label: '📖 Bài đọc: ' + r.title }))} />
            <button className="btn btn-primary" onClick={build}>Bắt đầu →</button>
          </div>
          <div className="small muted">
            Cách luyện: ① nghe 1 lần, ② bật "Lặp lại" và nói chồng lên âm thanh, ③ tắt phụ đề và thử lại, ④ bấm 🎤 để tự chấm.
            {!recognitionSupported() && <div className="chip chip-warn mt">Trình duyệt không hỗ trợ nhận dạng giọng nói (hãy dùng Chrome/Edge). Vẫn luyện được, chỉ không tự chấm.</div>}
          </div>
        </div>
      ) : (
        <div className="stack fade-in" style={{ gap: 14 }}>
          <div className="row spread">
            <button className="btn btn-sm btn-ghost" onClick={() => { loopRef.current = false; stopSpeaking(); setItems([]) }}>← Thoát</button>
            <div className="row">
              <label className="row tiny muted" style={{ gap: 4 }}><input type="checkbox" checked={showText} onChange={(e) => setShowText(e.target.checked)} /> Phụ đề Nhật</label>
              <label className="row tiny muted" style={{ gap: 4 }}><input type="checkbox" checked={showVi} onChange={(e) => setShowVi(e.target.checked)} /> Nghĩa Việt</label>
              <label className="row tiny muted" style={{ gap: 4 }}>Tốc độ
                <select className="select" value={s.settings.rate} onChange={(e) => updateSettings({ rate: Number(e.target.value) })}>
                  <option value={0.7}>0.7x</option><option value={0.85}>0.85x</option><option value={1}>1x</option><option value={1.2}>1.2x</option>
                </select>
              </label>
            </div>
            <span className="small muted">{i + 1}/{items.length}{avg != null && ` · TB ${avg}%`}</span>
          </div>
          <div className="progress"><div style={{ width: ((i + 1) / items.length) * 100 + '%' }} /></div>

          <div className="card stack" style={{ gap: 18, padding: 28 }}>
            <div className="shadow-sentence" style={{ minHeight: 60 }}>
              {showText ? cur.jp : <span className="muted" style={{ fontSize: 16, fontWeight: 400 }}>(phụ đề đang ẩn – hãy nghe và nói theo)</span>}
            </div>
            {showVi && cur.vi && <div className="center muted">{cur.vi}</div>}
            {cur.w && <div className="row" style={{ justifyContent: 'center' }}><span className="chip chip-primary jp">{cur.w.word}{cur.w.reading !== cur.w.word ? `【${cur.w.reading}】` : ''} {cur.w.meaning}</span><SaveButton id={cur.w.id} /></div>}

            <div className="row" style={{ justifyContent: 'center', gap: 12 }}>
              <button className="btn" onClick={playSlow}>🐢 Chậm</button>
              <button className="btn btn-primary btn-lg" onClick={play}>🔊 Nghe</button>
              <button className={'btn ' + (loop ? 'btn-danger' : '')} onClick={toggleLoop}>{loop ? '⏹ Dừng lặp' : '🔁 Lặp lại'}</button>
            </div>

            <div className="center stack" style={{ alignItems: 'center', gap: 8 }}>
              <button className={'btn btn-icon mic' + (recording ? ' rec' : '')} disabled={!recognitionSupported()} onClick={record} title="Nói theo để chấm điểm">🎤</button>
              <span className="tiny muted">{recording ? 'Đang nghe… hãy nói câu trên' : 'Bấm rồi nói theo câu mẫu'}</span>
            </div>

            {spoken !== null && (
              <div className={'feedback fade-in ' + ((scores[i] ?? 0) >= 75 ? 'ok' : 'bad')}>
                {spoken ? (
                  <>
                    <div className="row spread"><b>Độ giống: {scores[i]}%</b><span className="tiny">Màu đỏ = phần máy không nghe thấy</span></div>
                    <div className="mt"><Diff target={cur.jp} spoken={spoken} /></div>
                    <div className="small mt">Máy nghe được: <span className="jp">{spoken}</span></div>
                  </>
                ) : 'Không nhận được âm thanh. Kiểm tra micro và thử lại.'}
              </div>
            )}
          </div>

          <div className="row spread">
            <button className="btn" disabled={i === 0} onClick={() => go(-1)}>← Câu trước</button>
            <button className="btn btn-primary" disabled={i >= items.length - 1} onClick={() => go(1)}>Câu tiếp →</button>
          </div>
        </div>
      )}
    </div>
  )
}
