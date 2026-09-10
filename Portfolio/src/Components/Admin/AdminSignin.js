import React, { useState, useEffect } from 'react'
import styles from './AdminSignin.module.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../providers/Utils/AuthContext'

const AdminSignin = (props) => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')

  const loginState = props.log && props.log.log

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    props.login(userData)
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  useEffect(() => {
    if (!loginState) return

    const entries = loginState.log
    const latest = entries && entries.length > 0 && entries[entries.length - 1]

    if (latest && latest.token) {
      login(latest.token)
      navigate('/pmp')
    } else if (loginState.logError) {
      setError('Invalid username or password')
    }
  }, [loginState, login, navigate])

  return (
    <div className={styles.mainSignonContainer}>
      <div className={styles.loginComponentForm}>
        <form onSubmit={onSubmit}>
          <div className={styles.loginForm}>
            <h1 className={styles.LoginTitle}>Login</h1>
            <input
              onChange={onChange}
              value={userData.username}
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              onChange={onChange}
              value={userData.password}
              type="password"
              name="password"
              placeholder="Password"
            />
            {error && <p className={styles.loginError}>{error}</p>}
            <button type="submit">Submit</button>
            <button type="button" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminSignin
