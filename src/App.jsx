import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Topics from './pages/Topics'
import TopicDetail from './pages/TopicDetail'
import Flashcards from './pages/Flashcards'
import Quiz from './pages/Quiz'
import Listening from './pages/Listening'
import Shadowing from './pages/Shadowing'
import Reading from './pages/Reading'
import Saved from './pages/Saved'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:id" element={<TopicDetail />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/shadowing" element={<Shadowing />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/saved" element={<Saved />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
