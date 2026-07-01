import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

export const Cart = ({ setShowLogin }) => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext)
  const navigate = useNavigate()
  const subtotal = getTotalCartAmount()
  const hasItems = subtotal > 0

  const handleCheckout = () => {
    if (!token) {
      setShowLogin(true)
    } else {
      navigate('/order')
    }
  }

  return (
    <div className="cart">
      <div className="cart__container">
        <h1 className="cart__title">Your Shopping Bag</h1>
        
        {!hasItems ? (
          <div className="cart__empty">
            <span className="cart__empty-icon">🛍️</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button className="btn-primary" onClick={() => navigate('/')}>
              Go back to menu
            </button>
          </div>
        ) : (
          <div className="cart__content">
            <div className="cart__items-container">
              <div className="cart__headers">
                <span className="cart__header-col">Item</span>
                <span className="cart__header-col">Title</span>
                <span className="cart__header-col">Price</span>
                <span className="cart__header-col">Quantity</span>
                <span className="cart__header-col">Total</span>
                <span className="cart__header-col">Remove</span>
              </div>
              <div className="cart__items">
                {food_list.map((item) => {
                  const qty = cartItems?.[item._id] || 0
                  if (qty > 0) {
                    return (
                      <div key={item._id} className="cart__item">
                        <div className="cart__item-col cart__item-image-wrapper">
                          <img src={`${url}/images/${item.image}`} alt={item.name} />
                        </div>
                        <div className="cart__item-col cart__item-name">
                          <p>{item.name}</p>
                          <span className="cart__item-mobile-meta">${item.price} × {qty}</span>
                        </div>
                        <div className="cart__item-col cart__item-price">${item.price}</div>
                        <div className="cart__item-col cart__item-qty">{qty}</div>
                        <div className="cart__item-col cart__item-total">${item.price * qty}</div>
                        <div className="cart__item-col cart__item-remove">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"/>
                              <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>

            <div className="cart__summary-section">
              <div className="cart__total-card glass-card">
                <h2>Summary</h2>
                <div className="cart__total-details">
                  <div className="cart__total-row">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="cart__total-row">
                    <span>Delivery Fee</span>
                    <span>${2}</span>
                  </div>
                  <hr className="cart__summary-divider" />
                  <div className="cart__total-row cart__total-row--grand">
                    <span>Total</span>
                    <span>${subtotal + 2}</span>
                  </div>
                </div>
                <button
                  className="btn-primary cart__checkout-btn"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>

              <div className="cart__promocode glass-card">
                <p>Have a promo code? Enter it below.</p>
                <form className="cart__promo-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="PROMOCODE" aria-label="Promo Code" />
                  <button type="submit">Apply</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
