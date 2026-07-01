import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

export const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, getCartItemCount, token, setToken } = React.useContext(StoreContext)
  const navigate = useNavigate()
  const [menu, setMenu] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/')
  }

  const handleNavClick = (menuItem) => {
    setMenu(menuItem)
    setMobileOpen(false)
  }

  const cartCount = getCartItemCount()

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__brand">
        <img src={assets.logo} alt="Tomato" className="navbar__logo" />
      </Link>

      <button
        className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navbar__menu ${mobileOpen ? 'navbar__menu--open' : ''}`}>
        <li>
          <Link
            to="/"
            onClick={() => handleNavClick('home')}
            className={`navbar__link ${menu === 'home' ? 'navbar__link--active' : ''}`}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => handleNavClick('menu')}
            className={`navbar__link ${menu === 'menu' ? 'navbar__link--active' : ''}`}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            onClick={() => handleNavClick('mobile-app')}
            className={`navbar__link ${menu === 'mobile-app' ? 'navbar__link--active' : ''}`}
          >
            App
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => handleNavClick('contact-us')}
            className={`navbar__link ${menu === 'contact-us' ? 'navbar__link--active' : ''}`}
          >
            Contact
          </a>
        </li>
      </ul>

      <div className="navbar__actions">
        <Link to="/cart" className="navbar__cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {cartCount > 0 && (
            <span className="navbar__cart-badge" key={cartCount}>
              {cartCount}
            </span>
          )}
        </Link>

        {!token ? (
          <button className="navbar__signin" onClick={() => setShowLogin(true)}>
            Sign in
          </button>
        ) : (
          <div className="navbar__profile">
            <div className="navbar__avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <ul className="navbar__dropdown">
              <li onClick={() => navigate('/myorders')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16v-2"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                <span>My Orders</span>
              </li>
              <li onClick={logout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
