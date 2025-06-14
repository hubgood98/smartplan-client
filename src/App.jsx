import { useState } from 'react'
import LoginForm from './components/LoginForm'
import SchedulePage from './components/SchedulePage'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = async (username, password) => {
    // 실제로는 백엔드에 요청해야 함
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) throw new Error('로그인 실패')
      const data = await res.json()
      setUser({ name: data.name, token: data.token })
    } catch (err) {
      alert(err.message)
    }
  }

  const handleLogout = () => {
    setUser(null)
  }

  return user ? (
    <SchedulePage user={user} onLogout={handleLogout} />
  ) : (
    <LoginForm onLogin={handleLogin} />
  )
}

export default App
