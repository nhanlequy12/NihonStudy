import { useStore, toggleSaved } from '../lib/storage'
import { masteryLevel } from '../lib/srs'
import { speak } from '../lib/tts'

export function SpeakButton({ text, rate, size = 'btn-sm', label = '🔊' }) {
  return (
    <button className={`btn ${size}`} title="Nghe" onClick={(e) => { e.stopPropagation(); speak(text, { rate }) }}>
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

function highlight(sentence, word) {
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

export default function WordCard({ w, showExamples = true, compact = false }) {
  const s = useStore()
  const rate = s.settings.rate
  return (
    <div className="card word-card fade-in">
      <div className="word-head">
        <div>
          <div className="word-main">{w.word}</div>
          {s.settings.showReading && w.reading !== w.word && <div className="word-reading">{w.reading}</div>}
        </div>
        <div className="row" style={{ gap: 6 }}>
          <Mastery id={w.id} />
          <SpeakButton text={w.word} rate={rate} />
          <SaveButton id={w.id} />
        </div>
      </div>
      <div className="row" style={{ gap: 8 }}>
        <span className="word-meaning">{w.meaning}</span>
        <span className="chip word-pos">{w.pos}</span>
      </div>
      {showExamples && (
        <div className="stack" style={{ gap: 8 }}>
          {(compact ? w.examples.slice(0, 1) : w.examples).map((ex, i) => (
            <div key={i} className="example">
              <div className="row spread" style={{ gap: 6 }}>
                <span className="example-jp">{highlight(ex.jp, w.word)}</span>
                <SpeakButton text={ex.jp} rate={rate} size="btn-sm btn-ghost" />
              </div>
              <span className="example-vi">{ex.vi}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
