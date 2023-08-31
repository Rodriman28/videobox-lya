/* eslint-disable prettier/prettier */
// src/App.js
import { Route, Routes, HashRouter } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import CountdownPage from './components/CountdownPage'
import RecordingPage from './components/RecordingPage'
import ThankYouPage from './components/ThankYouPage'
import Tutorial from './components/Tutorial'

const App = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-900 via-blue-700 to-sky-500 h-screen">
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Tutorial />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route path="/recording" element={<RecordingPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
