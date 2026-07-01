import React, { useContext, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const navigate = useNavigate()

  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((data) => ({
      ...data,
      [name]: value,
    }))
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    const orderItems = []
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] })
      }
    })
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      })
      if (response.data.success) {
        const { session_url } = response.data
        window.open(session_url, '_self')
      } else {
        alert(response.data.message + ' Please try again.')
      }
    } catch (err) {
      alert('Error placing order. Please try again.')
    }
  }

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token, getTotalCartAmount, navigate])

  return (
    <div className="place-order">
      <form onSubmit={placeOrder} className="place-order__form">
        <div className="place-order__left">
          <h1 className="place-order__title">Delivery Info</h1>
          
          <div className="place-order__fields">
            <div className="place-order__row">
              <div className="place-order__field">
                <label htmlFor="firstName">First Name</label>
                <input required name="firstName" id="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="John" />
              </div>
              <div className="place-order__field">
                <label htmlFor="lastName">Last Name</label>
                <input required name="lastName" id="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Doe" />
              </div>
            </div>

            <div className="place-order__field">
              <label htmlFor="email">Email Address</label>
              <input required name="email" id="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="john.doe@example.com" />
            </div>

            <div className="place-order__field">
              <label htmlFor="street">Street Address</label>
              <input required name="street" id="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="123 Main St" />
            </div>

            <div className="place-order__row">
              <div className="place-order__field">
                <label htmlFor="city">City</label>
                <input required name="city" id="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="New York" />
              </div>
              <div className="place-order__field">
                <label htmlFor="state">State</label>
                <input required name="state" id="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="NY" />
              </div>
            </div>

            <div className="place-order__row">
              <div className="place-order__field">
                <label htmlFor="zipCode">Zip Code</label>
                <input required name="zipCode" id="zipCode" onChange={onChangeHandler} value={data.zipCode} type="text" placeholder="10001" />
              </div>
              <div className="place-order__field">
                <label htmlFor="country">Country</label>
                <input required name="country" id="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="United States" />
              </div>
            </div>

            <div className="place-order__field">
              <label htmlFor="phone">Phone Number</label>
              <input required name="phone" id="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
        </div>

        <div className="place-order__right">
          <div className="cart-total glass-card">
            <h2>Order Totals</h2>
            <div className="cart-total-details">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>${getTotalCartAmount()}</span>
              </div>
              <hr className="cart__summary-divider" />
              <div className="cart-total-row">
                <span>Delivery Fee</span>
                <span>$2</span>
              </div>
              <hr className="cart__summary-divider" />
              <div className="cart-total-row cart-total-row--grand">
                <span>Total</span>
                <span>${getTotalCartAmount() + 2}</span>
              </div>
            </div>
            <button type="submit" className="btn-primary place-order__pay-btn">
              Proceed to Payment
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}