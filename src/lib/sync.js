// Đồng bộ tiến độ học với Firestore theo từng user.
// - Mỗi máy tự có tài khoản ẩn danh riêng (dữ liệu tách biệt giữa các máy).
// - Đăng nhập Google để dùng chung một tài khoản trên nhiều máy.
import { useSyncExternalStore } from 'react'
import { cloudEnabled, watchAuth, loadUserData, saveUserData, signInGoogle, signOut as fbSignOut } from './firebase'
import { getState, replaceState, onLocalChange, pickSyncable, resetAll } from './storage'

let status = { enabled: cloudEnabled, user: null, state: cloudEnabled ? 'connecting' : 'off', error: null, lastSaved: null }
const listeners = new Set()
function set(patch) { status = { ...status, ...patch }; listeners.forEach((l) => l()) }
export function useSync() { return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l) }, () => status, () => status) }

let saveTimer = null
let pending = false
let currentUid = null

async function flush() {
  if (!currentUid || !pending) return
  pending = false
  try {
    set({ state: 'saving' })
    await saveUserData(currentUid, pickSyncable(getState()))
    set({ state: 'synced', lastSaved: Date.now(), error: null })
  } catch (e) {
    console.warn('save failed', e)
    pending = true
    set({ state: 'error', error: friendly(e) })
  }
}

function scheduleSave() {
  if (!currentUid) return
  pending = true
  clearTimeout(saveTimer)
  saveTimer = setTimeout(flush, 1200)
}

async function onUser(user) {
  if (!user) { currentUid = null; set({ user: null, state: 'error', error: 'Không kết nối được Firebase' }); return }
  currentUid = user.uid
  set({ user: { uid: user.uid, isAnonymous: user.isAnonymous, name: user.displayName, email: user.email, photo: user.photoURL }, state: 'connecting' })
  try {
    const remote = await loadUserData(user.uid)
    if (remote) {
      replaceState(remote) // tài khoản đã có dữ liệu trên cloud → dùng cloud
      set({ state: 'synced', lastSaved: remote.savedAtMs || Date.now(), error: null })
    } else {
      // tài khoản mới (máy mới) → đẩy dữ liệu đang có trong máy lên
      await saveUserData(user.uid, pickSyncable(getState()))
      set({ state: 'synced', lastSaved: Date.now(), error: null })
    }
  } catch (e) {
    console.warn('load failed', e)
    set({ state: 'error', error: friendly(e) })
  }
}

function friendly(e) {
  if (e?.code === 'permission-denied') return 'Firestore từ chối truy cập: hãy publish nội dung firestore.rules trong Firebase Console → Firestore → Rules.'
  if (e?.code === 'unavailable') return 'Không kết nối được Firestore (mạng?).'
  return e?.message || String(e)
}

let started = false
export function startSync() {
  if (started || !cloudEnabled) return
  started = true
  onLocalChange(scheduleSave)
  watchAuth(onUser)
  window.addEventListener('beforeunload', () => { if (pending) flush() })
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && pending) flush() })
}

export async function loginGoogle() {
  try {
    set({ error: null })
    await flush()
    const r = await signInGoogle()
    // linkWithPopup giữ nguyên uid nên onAuthStateChanged có thể không bắn lại → cập nhật thủ công
    if (r.linked) {
      const { auth } = await import('./firebase')
      const u = auth.currentUser
      set({ user: { uid: u.uid, isAnonymous: false, name: u.displayName, email: u.email, photo: u.photoURL } })
      scheduleSave()
    }
  } catch (e) {
    if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') set({ error: e.message })
  }
}

export async function logout() {
  await flush()
  currentUid = null
  resetAll() // xóa dữ liệu cục bộ để máy quay về tài khoản ẩn danh mới, trống
  await fbSignOut()
}
