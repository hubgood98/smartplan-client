import { useState } from 'react'
import './SignUpForm.css'

export default function SignUpForm({ onSignUp, onCancel }) {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const checkUsername = async () => {
    if (!username) return
    try {
      const res = await fetch('/api/users/check-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })
      const data = await res.json()
      alert(data.available ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.')
    } catch (err) {
      alert('아이디 확인 중 오류')
    }
  }

  const checkEmail = async () => {
    if (!email) return
    try {
      const res = await fetch('/api/users/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      alert(data.available ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.')
    } catch (err) {
      alert('이메일 확인 중 오류')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      alert('비밀번호가 일치하지 않습니다')
      return
    }
    onSignUp({ username, name, email, password })
  }

  return (
    <div className="sign-wrapper">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="sign-form">
        <div className="check-row">
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="button" onClick={checkUsername} style={{ width: 'auto' }}>
            중복확인
          </button>
        </div>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="check-row">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="button" onClick={checkEmail} style={{ width: 'auto' }}>
            중복확인
          </button>
        </div>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button type="submit">가입하기</button>
        <button type="button" onClick={onCancel}>취소</button>
      </form>
    </div>
  )
}
