// Lưu trữ tiến độ học trên localStorage, dùng qua hook useStore.
import { useSyncExternalStore } from 'react'

const KEY = 'nihonstudy:v1'

const defaultState = {
  saved: [],            // id các từ chưa biết / cần ôn
  srs: {},              // { [wordId]: { interval, ease, due, reps, lapses } }
  learnedTopics: {},    // { [topicId]: true } đã xem hết từ vựng
  quizHistory: [],      // { date, mode, correct, total }
  readingDone: {},      // { [readingId]: score }
  listeningDone: {},    // { [listeningId]: correct(bool) }
  streak: { last: null, count: 0 },
  settings: { rate: 1, showReading: true, theme: 'auto' },
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...defaultState }
    const parsed = JSON.parse(raw)
    return { ...defaultState, ...parsed, settings: { ...defaultState.settings, ...(parsed.settings || {}) } }
  } catch {
    return { ...defaultState }
  }
}

let state = load()
const listeners = new Set()

function emit() {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignore */ }
  listeners.forEach((l) => l())
}

export function getState() { return state }

export function setState(updater) {
  state = typeof updater === 'function' ? updater(state) : { ...state, ...updater }
  emit()
}

function subscribe(l) { listeners.add(l); return () => listeners.delete(l) }

export function useStore() {
  return useSyncExternalStore(subscribe, getState, getState)
}

// ---- helpers ----
export const todayKey = () => new Date().toISOString().slice(0, 10)

export function touchStreak() {
  const t = todayKey()
  setState((s) => {
    if (s.streak.last === t) return s
    const y = new Date(); y.setDate(y.getDate() - 1)
    const yk = y.toISOString().slice(0, 10)
    const count = s.streak.last === yk ? s.streak.count + 1 : 1
    return { ...s, streak: { last: t, count } }
  })
}

export function toggleSaved(id) {
  setState((s) => ({
    ...s,
    saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id],
  }))
}

export function isSaved(id) { return state.saved.includes(id) }

export function markTopicLearned(topicId) {
  setState((s) => ({ ...s, learnedTopics: { ...s.learnedTopics, [topicId]: true } }))
}

export function addQuizResult(mode, correct, total) {
  touchStreak()
  setState((s) => ({ ...s, quizHistory: [...s.quizHistory.slice(-99), { date: Date.now(), mode, correct, total }] }))
}

export function setReadingDone(id, score) {
  touchStreak()
  setState((s) => ({ ...s, readingDone: { ...s.readingDone, [id]: score } }))
}

export function setListeningDone(id, correct) {
  touchStreak()
  setState((s) => ({ ...s, listeningDone: { ...s.listeningDone, [id]: correct } }))
}

export function updateSettings(patch) {
  setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }))
}

export function resetAll() {
  state = { ...defaultState }
  emit()
}
