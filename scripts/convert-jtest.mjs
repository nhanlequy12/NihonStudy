// Chuyển out-1-12.json -> src/data/jtest-n2.json (gọn)
import fs from 'node:fs'
const src = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const dest = process.argv[3]

const chapters = {}
function cleanWord(w) {
  let note = ''
  let s = w.trim()
  const m = s.match(/[（(]する[）)]$/)
  if (m) { note = 'する'; s = s.replace(/[（(]する[）)]$/, '') }
  const m2 = s.match(/[\[［]([^\]］]+)[\]］]$/)
  if (m2) { note = m2[1]; s = s.replace(/[\[［][^\]］]+[\]］]$/, '') }
  return { s: s.trim(), note }
}
let dup = 0
for (const sec of src) {
  const ch = chapters[sec.ch] ||= { ch: sec.ch, sections: [] }
  const seen = new Set()
  const words = []
  for (const w of sec.words) {
    const { s: word, note } = cleanWord(w.word)
    const reading = w.reading ? cleanWord(w.reading).s : null
    const key = word + '|' + (reading || '')
    if (seen.has(key)) { dup++; continue }
    seen.add(key)
    const audio = w.audio ? w.audio.match(/(\d+)\.mp3$/)?.[1] : null
    const examples = w.examples.filter((e) => e.jp && e.vi).map((e) => ({ jp: e.jp, kana: e.kana !== e.jp ? e.kana : undefined, vi: e.vi }))
    const related = w.related.map((r) => ({ k: r.kind === 'Đồng nghĩa' ? 'syn' : r.kind === 'Trái nghĩa' ? 'ant' : 'rel', jp: r.jp, vi: r.vi }))
    words.push({ word, reading: reading && reading !== word ? reading : undefined, meaning: w.meaning, note: note || undefined, audio: audio || undefined, examples, related: related.length ? related : undefined })
  }
  ch.sections.push({ sec: sec.sec, title: sec.title, words })
}
const out = Object.values(chapters).sort((a, b) => a.ch - b.ch)
fs.writeFileSync(dest, JSON.stringify(out))
const total = out.reduce((a, c) => a + c.sections.reduce((b, s) => b + s.words.length, 0), 0)
console.log('chapters', out.length, 'sections', out.reduce((a, c) => a + c.sections.length, 0), 'words', total, 'dups removed', dup, 'bytes', fs.statSync(dest).size)
