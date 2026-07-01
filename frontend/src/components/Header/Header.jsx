import React from 'react'
import './Header.css'

export const Header = () => {
  return (
    <div className="header">
      <div className="header__overlay"></div>
      <div className="header__content">
        <h1 className="header__title">
          Order your <span className="gradient-text">favourite food</span> here
        </h1>
        <p className="header__subtitle">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest 
          ingredients and culinary expertise. Elevate your dining experience, one delicious meal at a time.
        </p>
        <a href="#explore-menu" className="btn-primary header__cta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Explore Menu
        </a>
      </div>
      <div className="header__badge">
        <span className="header__badge-icon">🔥</span>
        <span>30 min delivery</span>
      </div>
    </div>
  )
}
