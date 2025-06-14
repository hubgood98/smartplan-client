import { useState } from 'react'
import './SchedulePage.css'

export default function SchedulePage({ user, onLogout }) {
  const [scheduleTitle, setScheduleTitle] = useState('')
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleDesc, setScheduleDesc] = useState('')
  const [schedules, setSchedules] = useState([])

  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [posts, setPosts] = useState([])

  const addSchedule = (e) => {
    e.preventDefault()
    if (!scheduleTitle || !scheduleDate) return
    setSchedules([
      ...schedules,
      { title: scheduleTitle, date: scheduleDate, desc: scheduleDesc },
    ])
    setScheduleTitle('')
    setScheduleDate('')
    setScheduleDesc('')
  }

  const addPost = (e) => {
    e.preventDefault()
    if (!postTitle) return
    setPosts([...posts, { title: postTitle, content: postContent }])
    setPostTitle('')
    setPostContent('')
  }

  return (
    <div className="page-wrapper">
      <header className="top-bar">
        <h1>SmartPlanAI</h1>
        <div className="user-info">
          <span>{user.name} 님</span>
          <button onClick={onLogout}>로그아웃</button>
        </div>
      </header>

      <section className="form-section">
        <h2>일정 등록</h2>
        <form onSubmit={addSchedule} className="schedule-form">
          <input
            type="text"
            placeholder="제목"
            value={scheduleTitle}
            onChange={(e) => setScheduleTitle(e.target.value)}
            required
          />
          <input
            type="date"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            required
          />
          <textarea
            placeholder="설명"
            value={scheduleDesc}
            onChange={(e) => setScheduleDesc(e.target.value)}
          />
          <button type="submit">추가</button>
        </form>
        <ul className="schedule-list">
          {schedules.map((s, idx) => (
            <li key={idx}>
              <strong>{s.date}</strong> - {s.title}
            </li>
          ))}
        </ul>
      </section>

      <section className="form-section">
        <h2>게시글 작성</h2>
        <form onSubmit={addPost} className="post-form">
          <input
            type="text"
            placeholder="제목"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="내용"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <button type="submit">작성</button>
        </form>
        <div className="post-list">
          {posts.map((p, idx) => (
            <article key={idx} className="post-item">
              <h3>{p.title}</h3>
              <p>{p.content}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
