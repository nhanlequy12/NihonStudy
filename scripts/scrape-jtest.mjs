import * as cheerio from 'cheerio'
import fs from 'node:fs'

const BASE = 'https://jtest.net/tu-vung-n2'
const [,, from = '1', to = '12'] = process.argv

function rubyToPlain($, el) {
  const c = $(el).clone()
  c.find('rt, rp').remove()
  return c.text().replace(/\s+/g, '').trim()
}
function rubyToKana($, el) {
  const c = $(el).clone()
  c.find('ruby').each((_, r) => { const rt = $(r).find('rt').text(); $(r).replaceWith(rt) })
  c.find('rp').remove()
  return c.text().replace(/\s+/g, '').trim()
}

async function fetchPage(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (personal study project)' } })
      if (r.ok) return await r.text()
    } catch {}
    await new Promise((s) => setTimeout(s, 1500))
  }
  throw new Error('fail ' + url)
}

async function parseSection(ch, sec) {
  const html = await fetchPage(`${BASE}/chapter-${ch}/section-${sec}`)
  const $ = cheerio.load(html)
  const title = $('h1 small').text().replace('Từ vựng N2 - Chủ đề', '').trim()
  const words = []
  $('main table tbody tr').each((_, tr) => {
    const td = $(tr).find('td')
    if (td.length < 2) return
    const word = $(td[0]).find('h5 small').first().text().trim()
    if (!word) return
    const reading = $(td[0]).find('small[id^=furigana]').first().text().trim() || null
    const meaning = $(td[0]).find('span[id^=meaning]').first().text().trim()
    const audio = $(tr).find('button.playWordSound').attr('value') || null
    const related = []
    $(td[0]).find('details .mb-1').each((_, d) => {
      const kind = $(d).find('.badge').text().trim()
      $(d).find('span.d-inline-block').each((_, s) => {
        const jp = rubyToPlain($, $(s).clone().children('.text-muted').remove().end())
        const vi = $(s).find('.text-muted').text().replace(/[()]/g, '').trim()
        if (jp) related.push({ kind, jp, vi })
      })
    })
    const examples = []
    $(td[1]).find('p').each((_, p) => {
      const jp = rubyToPlain($, p)
      if (!jp) return
      const vi = $(p).next('span').text().trim() || $(p).nextAll('span').first().text().trim()
      examples.push({ jp, kana: rubyToKana($, p), vi })
    })
    words.push({ word, reading, meaning, audio, related, examples })
  })
  return { ch, sec, title, words }
}

const out = []
for (let ch = +from; ch <= +to; ch++) {
  for (let sec = 1; sec <= 5; sec++) {
    const s = await parseSection(ch, sec)
    console.log(`ch${ch} sec${sec} ${s.title}: ${s.words.length} words`)
    out.push(s)
    await new Promise((r) => setTimeout(r, 700))
  }
}
fs.writeFileSync(`out-${from}-${to}.json`, JSON.stringify(out, null, 1))
