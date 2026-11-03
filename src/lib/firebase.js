// Kết nối Firebase (Auth + Firestore). Nếu chưa cấu hình env VITE_FIREBASE_*, app chạy hoàn toàn offline (localStorage).
import { initializeApp } from 'firebase/app'
import {
  getAuth, onAuthStateChanged, signInAnonymously, signInWithPopup, GoogleAuthProvider,
  linkWithPopup, signOut as fbSignOut, signInWithCredential,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const cloudEnabled = Boolean(cfg.apiKey && cfg.projectId && cfg.appId)

let app, auth, db
if (cloudEnabled) {
  app = initializeApp(cfg)
  auth = getAuth(app)
  db = getFirestore(app)
}

export { auth, db }

/** Theo dõi trạng thái đăng nhập; tự đăng nhập ẩn danh nếu chưa có user (mỗi máy một tài khoản riêng). */
export function watchAuth(cb) {
  if (!cloudEnabled) { cb(null); return () => {} }
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      try { await signInAnonymously(auth) } catch (e) { console.warn('Anonymous sign-in failed', e); cb(null) }
      return // onAuthStateChanged sẽ gọi lại với user ẩn danh
    }
    cb(user)
  })
}

/** Đăng nhập Google. Nếu đang là ẩn danh thì liên kết để giữ nguyên dữ liệu; nếu Google đã có tài khoản thì chuyển sang tài khoản đó. */
export async function signInGoogle() {
  const provider = new GoogleAuthProvider()
  const u = auth.currentUser
  if (u && u.isAnonymous) {
    try {
      await linkWithPopup(u, provider)
      return { linked: true }
    } catch (e) {
      if (e.code === 'auth/credential-already-in-use') {
        const cred = GoogleAuthProvider.credentialFromError(e)
        await signInWithCredential(auth, cred)
        return { linked: false }
      }
      throw e
    }
  }
  await signInWithPopup(auth, provider)
  return { linked: false }
}

export async function signOut() {
  await fbSignOut(auth) // watchAuth sẽ tự tạo tài khoản ẩn danh mới
}

// ---- Dữ liệu học của từng user: users/{uid} ----
export async function loadUserData(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

export async function saveUserData(uid, data) {
  await setDoc(doc(db, 'users', uid), { ...data, updatedAt: serverTimestamp(), savedAtMs: Date.now() }, { merge: false })
}

if (import.meta.env.DEV && cloudEnabled) window.__fb = { auth, db }
