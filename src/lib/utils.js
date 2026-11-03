export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function sample(arr, n) {
  return shuffle(arr).slice(0, n)
}

/** Chuẩn hóa chuỗi tiếng Nhật để so sánh: bỏ khoảng trắng, dấu câu, katakana→hiragana. */
export function normalizeJa(s) {
  return (s || '')
    .replace(/[\s　、。．，！？!?「」『』・]/g, '')
    .replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
    .toLowerCase()
}

/** Độ giống nhau 0..1 (Levenshtein) */
export function similarity(a, b) {
  a = normalizeJa(a); b = normalizeJa(b)
  if (!a.length && !b.length) return 1
  const m = a.length, n = b.length
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 1; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    }
  }
  return 1 - dp[m][n] / Math.max(m, n)
}

/** Tạo câu có chỗ trống thay cho từ (kanji hoặc kana). */
export function blankOut(sentence, word) {
  if (sentence.includes(word)) return sentence.replace(word, '＿＿＿')
  // thử bỏ okurigana cuối (vd: 引き受ける -> 引き受け)
  for (let k = word.length - 1; k >= 2; k--) {
    const stem = word.slice(0, k)
    if (sentence.includes(stem)) return sentence.replace(stem, '＿＿＿')
  }
  return sentence
}

export function fmtDate(ts) {
  return new Date(ts).toLocaleDateString('vi-VN')
}
