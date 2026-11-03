// Text-to-speech tiếng Nhật bằng Web Speech API.
let cachedVoices = []

function loadVoices() {
  if (!('speechSynthesis' in window)) return []
  cachedVoices = window.speechSynthesis.getVoices()
  return cachedVoices
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

export function getJapaneseVoices() {
  const voices = cachedVoices.length ? cachedVoices : loadVoices()
  return voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('ja'))
}

export function ttsSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/**
 * Đọc một câu tiếng Nhật. Trả về Promise resolve khi đọc xong.
 * @param {string} text
 * @param {{rate?: number, pitch?: number, gender?: 'M'|'F'|'N'}} opts
 */
export function speak(text, opts = {}) {
  return new Promise((resolve) => {
    if (!ttsSupported()) return resolve(false)
    const synth = window.speechSynthesis
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ja-JP'
    u.rate = opts.rate ?? 1
    u.pitch = opts.pitch ?? (opts.gender === 'M' ? 0.85 : opts.gender === 'F' ? 1.15 : 1)
    const voices = getJapaneseVoices()
    if (voices.length) {
      // Cố gắng dùng giọng khác nhau cho nam/nữ nếu có nhiều giọng
      let pick = voices[0]
      if (voices.length > 1) {
        const femaleHint = voices.find((v) => /female|nanami|haruka|ayumi|kyoko|o-ren/i.test(v.name))
        const maleHint = voices.find((v) => /male|ichiro|keita|otoya|daichi/i.test(v.name) && !/female/i.test(v.name))
        if (opts.gender === 'F' && femaleHint) pick = femaleHint
        else if (opts.gender === 'M' && maleHint) pick = maleHint
      }
      u.voice = pick
    }
    u.onend = () => resolve(true)
    u.onerror = () => resolve(false)
    synth.speak(u)
  })
}

export function stopSpeaking() {
  if (ttsSupported()) window.speechSynthesis.cancel()
}

/** Đọc lần lượt nhiều dòng; gọi onLine(index) trước mỗi dòng. Có thể hủy qua token. */
export async function speakLines(lines, { rate = 1, onLine, token } = {}) {
  for (let i = 0; i < lines.length; i++) {
    if (token?.cancelled) return
    onLine?.(i)
    await speak(lines[i].text, { rate, gender: lines[i].speaker })
    if (token?.cancelled) return
    await new Promise((r) => setTimeout(r, 450))
  }
  onLine?.(-1)
}

// ---- Speech recognition (shadowing) ----
export function recognitionSupported() {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
}

/** Nghe người dùng nói một lần, trả về transcript (string) hoặc '' nếu lỗi. */
export function listenOnce({ onStart } = {}) {
  return new Promise((resolve) => {
    if (!recognitionSupported()) return resolve('')
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SR()
    rec.lang = 'ja-JP'
    rec.interimResults = false
    rec.maxAlternatives = 1
    let done = false
    rec.onstart = () => onStart?.()
    rec.onresult = (e) => {
      done = true
      resolve(e.results[0][0].transcript || '')
    }
    rec.onerror = () => { if (!done) { done = true; resolve('') } }
    rec.onend = () => { if (!done) { done = true; resolve('') } }
    try { rec.start() } catch { resolve('') }
  })
}
