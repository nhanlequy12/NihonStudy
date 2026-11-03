// Gộp tất cả nguồn từ vựng thành danh sách chủ đề (topics) và nhóm (groups).
// - basic.js: 12 chủ đề tự soạn (mỗi từ 2 ví dụ)
// - jtest-n2.json: bộ "2500 từ vựng N2" (12 chương × 5 bài) lấy từ jtest.net/tu-vung-n2
import { basicTopics } from './basic'
import jtest from './jtest-n2.json'
import { jtestChapters, jtestSectionJp } from './jtest-meta'

export const AUDIO_BASE = 'https://cloud.jtest.net/tango/sound/n2/word/'

function finalizeTopic(t) {
  return {
    ...t,
    words: t.words.map((w, i) => ({
      ...w,
      id: `${t.id}-${i}`,
      topicId: t.id,
      reading: w.reading || w.word,
      pos: w.pos || (w.note === 'する' ? 'danh từ・する' : ''),
      audio: w.audio ? AUDIO_BASE + w.audio + '.mp3' : undefined,
    })),
  }
}

const basicGroup = {
  id: 'basic',
  title: 'Chủ đề cơ bản',
  sub: 'Bộ khởi động: 12 chủ đề × 15 từ, mỗi từ 2 ví dụ',
  topics: basicTopics.map((t) => finalizeTopic({ ...t, group: 'basic' })),
}

const jtestGroups = jtest.map((c) => {
  const meta = jtestChapters[c.ch]
  return {
    id: `jt${c.ch}`,
    title: `Chương ${c.ch}: ${meta.title}`,
    jp: meta.jp,
    icon: meta.icon,
    color: meta.color,
    sub: `${c.sections.length} bài · ${c.sections.reduce((a, s) => a + s.words.length, 0)} từ`,
    topics: c.sections.map((s) =>
      finalizeTopic({
        id: `jt${c.ch}-${s.sec}`,
        group: `jt${c.ch}`,
        title: s.title,
        jp: jtestSectionJp[`${c.ch}-${s.sec}`] || '',
        icon: meta.icon,
        color: meta.color,
        words: s.words,
      }),
    ),
  }
})

export const groups = [basicGroup, ...jtestGroups]
export const topics = groups.flatMap((g) => g.topics)
export const allWords = topics.flatMap((t) => t.words)
export const wordById = Object.fromEntries(allWords.map((w) => [w.id, w]))
export const topicById = Object.fromEntries(topics.map((t) => [t.id, t]))
export const groupById = Object.fromEntries(groups.map((g) => [g.id, g]))

/** Lấy danh sách từ theo giá trị chọn: 'all' | groupId | topicId. 'saved' do nơi gọi xử lý. */
export function wordsFor(sel) {
  if (!sel || sel === 'all') return allWords
  if (groupById[sel]) return groupById[sel].topics.flatMap((t) => t.words)
  if (topicById[sel]) return topicById[sel].words
  return allWords
}
