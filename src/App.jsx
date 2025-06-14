import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import SchedulePage from './components/SchedulePage'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [showSign, setShowSign] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('auth')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

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
      const userInfo = { name: data.name, token: data.token }
      setUser(userInfo)
      localStorage.setItem('auth', JSON.stringify(userInfo))
    } catch (err) {
      alert(err.message)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('auth')
  }

  const handleSignUp = async (info) => {
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info),
      })
      if (!res.ok) throw new Error('회원가입 실패')
      alert('가입이 완료되었습니다. 로그인 해주세요.')
      setShowSign(false)
    } catch (err) {
      alert(err.message)
    }
  }

  if (user) {
    return <SchedulePage user={user} onLogout={handleLogout} />
  }

  return showSign ? (
    <SignUpForm onSignUp={handleSignUp} onCancel={() => setShowSign(false)} />
  ) : (
    <LoginForm onLogin={handleLogin} onShowSignUp={() => setShowSign(true)} />
  )
}

export default App
