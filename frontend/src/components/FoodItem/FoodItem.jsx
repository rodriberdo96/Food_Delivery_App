import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

export const FoodItem = ({ id, name, price, description, image, index = 0 }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)
  const count = cartItems?.[id] || 0

  return (
    <article
      className="food-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="food-card__image-wrapper">
        <img
          src={`${url}/images/${image}`}
          alt={name}
          className="food-card__image"
          loading="lazy"
        />
        <div className="food-card__image-overlay"></div>

        {count === 0 ? (
          <button
            className="food-card__add-btn"
            onClick={() => addToCart(id)}
            aria-label={`Add ${name} to cart`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        ) : (
          <div className="food-card__counter">
            <button onClick={() => removeFromCart(id)} aria-label="Remove one">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <span>{count}</span>
            <button onClick={() => addToCart(id)} aria-label="Add one more">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="food-card__body">
        <div className="food-card__header">
          <h3 className="food-card__name">{name}</h3>
          <div className="food-card__rating">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#F7931E" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>4.5</span>
          </div>
        </div>
        <p className="food-card__description">{description}</p>
        <div className="food-card__footer">
          <span className="food-card__price">${price}</span>
        </div>
      </div>
    </article>
  )
}
