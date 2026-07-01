import React from 'react'
import './LoginPopup.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

export const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = React.useContext(StoreContext)
  const [currState, setCurrState] = React.useState('Login')
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState({
    name: '',
    email: '',
    password: '',
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    let newUrl = url
    if (currState === 'Login') {
      newUrl += '/api/user/login'
    } else {
      newUrl += '/api/user/register'
    }
    try {
      const response = await axios.post(newUrl, data)
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        setShowLogin(false)
      } else {
        alert('Error: ' + response.data.message)
      }
    } catch (err) {
      alert('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-popup" onClick={() => setShowLogin(false)}>
      <form
        onSubmit={onLogin}
        className="login-popup__form"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="login-popup__header">
          <h2>{currState === 'Login' ? 'Welcome back' : 'Create account'}</h2>
          <p className="login-popup__subtitle">
            {currState === 'Login'
              ? 'Sign in to your account to continue'
              : 'Join us and start ordering delicious food'}
          </p>
          <button
            type="button"
            className="login-popup__close"
            onClick={() => setShowLogin(false)}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="login-popup__fields">
          {currState !== 'Login' && (
            <div className="login-popup__field">
              <label htmlFor="login-name">Full Name</label>
              <input
                id="login-name"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div className="login-popup__field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="login-popup__field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button type="submit" className="login-popup__submit" disabled={loading}>
          {loading ? (
            <span className="login-popup__spinner"></span>
          ) : currState === 'Sign Up' ? (
            'Create Account'
          ) : (
            'Sign In'
          )}
        </button>

        <div className="login-popup__terms">
          <input type="checkbox" id="login-terms" required />
          <label htmlFor="login-terms">
            I agree to the <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a>
          </label>
        </div>

        <p className="login-popup__switch">
          {currState === 'Login' ? (
            <>
              Don't have an account?{' '}
              <button type="button" onClick={() => setCurrState('Sign Up')}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" onClick={() => setCurrState('Login')}>
                Sign In
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  )
}
