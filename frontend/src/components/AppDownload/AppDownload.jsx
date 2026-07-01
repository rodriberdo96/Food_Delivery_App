import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'

export const AppDownload = () => {
  return (
    <section className="app-download" id="app-download">
      <div className="app-download__content">
        <h2 className="app-download__title">
          For a Better Experience, <br /> Download the <span className="gradient-text">Tomato App</span>
        </h2>
        <p className="app-download__text">
          Track orders in real-time, get exclusive mobile-only promotions, and checkout faster with saved preferences.
        </p>
        <div className="app-download__platforms">
          <a href="#" className="app-download__platform" aria-label="Download from Google Play Store">
            <img src={assets.play_store} alt="Google Play Store" />
          </a>
          <a href="#" className="app-download__platform" aria-label="Download from Apple App Store">
            <img src={assets.app_store} alt="Apple App Store" />
          </a>
        </div>
      </div>
    </section>
  )
}
