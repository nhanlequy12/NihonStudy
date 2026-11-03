import { useState } from 'react'
import { useStore, toggleSaved } from '../lib/storage'
import { masteryLevel } from '../lib/srs'
import { speak, playAudio } from '../lib/tts'

/** Phát âm thanh của từ: ưu tiên file mp3 (nếu có), không thì dùng TTS. */
export function sayWord(w, rate) {
  if (w.audio) return playAudio(w.audio).catch(() => speak(w.word, { rate }))
  return speak(w.word, { rate })
}

export function SpeakButton({ text, word, rate, size = 'btn-sm', label = '🔊' }) {
  return (
    <button className={`btn ${size}`} title="Nghe" onClick={(e) => { e.stopPropagation(); word ? sayWord(word, rate) : speak(text, { rate }) }}>
      {label}
    </button>
  )
}

export function SaveButton({ id, size = 'btn-sm' }) {
  const s = useStore()
  const on = s.saved.includes(id)
  return (
    <button
      className={`btn ${size} ${on ? 'btn-warn' : ''}`}
      title={on ? 'Bỏ lưu' : 'Lưu từ chưa biết'}
      onClick={(e) => { e.stopPropagation(); toggleSaved(id) }}
    >
      {on ? '🔖 Đã lưu' : '🔖 Lưu'}
    </button>
  )
}

export function Mastery({ id }) {
  useStore()
  const lv = masteryLevel(id)
  return (
    <span className="mastery" title={['Chưa học', 'Mới học', 'Đang nhớ', 'Thuộc'][lv]}>
      {[1, 2, 3].map((i) => <i key={i} className={i <= lv ? 'on' : ''} />)}
    </span>
  )
}

export function highlight(sentence, word) {
  let idx = sentence.indexOf(word)
  let len = word.length
  if (idx < 0) {
    for (let k = word.length - 1; k >= 2 && idx < 0; k--) {
      idx = sentence.indexOf(word.slice(0, k)); len = k
    }
  }
  if (idx < 0) return sentence
  return (
    <>
      {sentence.slice(0, idx)}<mark>{sentence.slice(idx, idx + len)}</mark>{sentence.slice(idx + len)}
    </>
  )
}

const relLabel = { syn: 'Đồng nghĩa', ant: 'Trái nghĩa', rel: 'Liên quan' }
const relClass = { syn: 'chip-success', ant: 'chip-danger', rel: 'chip-primary' }

export function RelatedWords({ related, rate }) {
  if (!related?.length) return null
  return (
    <div className="row" style={{ gap: 6 }}>
      {related.map((r, i) => (
        <button key={i} className={'chip ' + relClass[r.k]} style={{ border: 0, cursor: 'pointer' }} title={`${relLabel[r.k]} · nhấn để nghe`} onClick={(e) => { e.stopPropagation(); speak(r.jp, { rate }) }}>
          <span className="tiny" style={{ opacity: .7 }}>{r.k === 'syn' ? '≈' : r.k === 'ant' ? '≠' : '→'}</span>
          <span className="jp">{r.jp}</span>
          <span style={{ opacity: .8 }}>{r.vi}</span>
        </button>
      ))}
    </div>
  )
}

export default function WordCard({ w, showExamples = true, compact = false }) {
  const s = useStore()
  const [more, setMore] = useState(false)
  const [kana, setKana] = useState(false)
  const rate = s.settings.rate
  const limit = compact ? 1 : 2
  const shown = more ? w.examples : w.examples.slice(0, limit)
  const extra = w.examples.length - limit

  return (
    <div className="card word-card fade-in">
      <div className="word-head">
        <div>
          <div className="word-main">{w.word}{w.note && <span className="muted" style={{ fontSize: 15, fontWeight: 400 }}>（{w.note}）</span>}</div>
          {s.settings.showReading && w.reading !== w.word && <div className="word-reading">{w.reading}</div>}
        </div>
        <div className="row" style={{ gap: 6 }}>
          <Mastery id={w.id} />
          <SpeakButton word={w} rate={rate} />
          <SaveButton id={w.id} />
        </div>
      </div>
      <div className="row" style={{ gap: 8 }}>
        <span className="word-meaning">{w.meaning}</span>
        {w.pos && <span className="chip word-pos">{w.pos}</span>}
      </div>
      {!compact && <RelatedWords related={w.related} rate={rate} />}
      {showExamples && (
        <div className="stack" style={{ gap: 8 }}>
          {shown.map((ex, i) => (
            <div key={i} className="example">
              <div className="row spread" style={{ gap: 6 }}>
                <span className="example-jp">{highlight(ex.jp, w.word)}</span>
                <SpeakButton text={ex.jp} rate={rate} size="btn-sm btn-ghost" />
              </div>
              {kana && ex.kana && <span className="example-kana">{ex.kana}</span>}
              <span className="example-vi">{ex.vi}</span>
            </div>
          ))}
          <div className="row" style={{ gap: 6 }}>
            {extra > 0 && <button className="btn btn-sm btn-ghost" onClick={() => setMore((m) => !m)}>{more ? 'Thu gọn' : `+ ${extra} ví dụ nữa`}</button>}
            {w.examples.some((e) => e.kana) && <button className="btn btn-sm btn-ghost" onClick={() => setKana((k) => !k)}>{kana ? 'Ẩn kana' : 'あ Kana'}</button>}
          </div>
        </div>
      )}
    </div>
  )
}
