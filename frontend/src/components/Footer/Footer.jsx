import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

export const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <img src={assets.logo} alt="Tomato" className="footer__logo" />
            <p className="footer__desc">
              Delivering happiness to your doorstep. Fresh ingredients, expert chefs, and
              lightning-fast delivery — that's the Tomato promise.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <img src={assets.facebook_icon} alt="" />
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <img src={assets.twitter_icon} alt="" />
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <img src={assets.linkedin_icon} alt="" />
              </a>
            </div>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Company</h3>
            <ul className="footer__list">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__heading">Get in Touch</h3>
            <ul className="footer__list">
              <li>
                <a href="tel:+12124567890">+1-212-456-7890</a>
              </li>
              <li>
                <a href="mailto:contact@tomato.com">contact@tomato.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__divider"></div>
        <p className="footer__copyright">
          © {new Date().getFullYear()} Tomato. All rights reserved. Built with ❤️
        </p>
      </div>
    </footer>
  )
}
