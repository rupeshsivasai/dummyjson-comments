import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const response = await fetch('https://dummyjson.com/comments')
      const data = await response.json()
      setComments(data.comments)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching comments:', error)
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="container">
      <h1>Comments Section</h1>
      <div className="comments-grid">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="user-info">
              <h3>{comment.user.fullName}</h3>
              <span className="username">@{comment.user.username}</span>
            </div>
            <p className="comment-body">{comment.body}</p>
            <div className="comment-footer">
              <span className="likes">❤️ {comment.likes}</span>
              <span className="post-id">Post #{comment.postId}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App