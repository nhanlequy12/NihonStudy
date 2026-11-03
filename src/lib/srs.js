// Spaced repetition đơn giản (dựa trên SM-2 rút gọn) cho flashcard.
import { getState, setState, touchStreak } from './storage'

const DAY = 24 * 60 * 60 * 1000

export function getCard(id) {
  return getState().srs[id] || { interval: 0, ease: 2.5, due: 0, reps: 0, lapses: 0 }
}

/** grade: 0 = quên, 1 = khó, 2 = tốt, 3 = dễ */
export function review(id, grade) {
  touchStreak()
  const c = getCard(id)
  let { interval, ease, reps, lapses } = c
  if (grade === 0) {
    reps = 0; lapses += 1; interval = 0
    ease = Math.max(1.3, ease - 0.2)
  } else {
    if (reps === 0) interval = grade === 1 ? 0.5 : grade === 2 ? 1 : 3
    else if (reps === 1) interval = grade === 1 ? 2 : grade === 2 ? 4 : 7
    else interval = Math.round(interval * (grade === 1 ? 1.2 : grade === 2 ? ease : ease * 1.4))
    reps += 1
    ease = Math.max(1.3, ease + (grade === 3 ? 0.1 : grade === 1 ? -0.15 : 0))
  }
  const due = Date.now() + interval * DAY
  setState((s) => ({ ...s, srs: { ...s.srs, [id]: { interval, ease, due, reps, lapses } } }))
}

export function isDue(id, now = Date.now()) {
  const c = getState().srs[id]
  return !c || c.due <= now
}

export function dueCount(ids) {
  const now = Date.now()
  return ids.filter((id) => isDue(id, now)).length
}

export function masteryLevel(id) {
  const c = getState().srs[id]
  if (!c || c.reps === 0) return 0
  if (c.interval >= 21) return 3
  if (c.interval >= 7) return 2
  return 1
}
