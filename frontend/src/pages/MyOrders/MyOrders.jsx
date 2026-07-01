import React, { useEffect, useContext, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

export const MyOrders = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { url, token } = useContext(StoreContext)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${url}/api/order/userorders`, {}, {
        headers: { token },
      })
      if (response.data.success) {
        setData(response.data.data)
      }
    } catch (err) {
      console.error('Fetch orders error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  const getStatusClass = (status) => {
    switch (status) {
      case 'Food Processing':
        return 'my-orders__status--processing'
      case 'Out For Delivery':
        return 'my-orders__status--delivery'
      case 'Delivered':
        return 'my-orders__status--delivered'
      default:
        return ''
    }
  }

  return (
    <div className="my-orders">
      <div className="my-orders__header">
        <h1 className="my-orders__title">Track Your Orders</h1>
        <p className="my-orders__subtitle">Real-time status updates on all your delicious meals</p>
      </div>

      {loading ? (
        <div className="my-orders__loading">
          <span className="my-orders__spinner"></span>
          <p>Retrieving your orders...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="my-orders__empty glass-card">
          <span className="my-orders__empty-icon">📦</span>
          <h2>No orders placed yet</h2>
          <p>Hungry? Place your first order to track it here!</p>
        </div>
      ) : (
        <div className="my-orders__list">
          {data.map((order, index) => (
            <div className="my-orders__card glass-card" key={order._id || index}>
              <div className="my-orders__icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>

              <div className="my-orders__info">
                <p className="my-orders__items">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} <span className="my-orders__item-qty">×{item.quantity}</span>
                      {i < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <div className="my-orders__meta">
                  <span className="my-orders__date">
                    {new Date(order.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="my-orders__count">{order.items.length} items</span>
                </div>
              </div>

              <div className="my-orders__price">${order.amount}.00</div>

              <div className="my-orders__status-col">
                <span className={`my-orders__status ${getStatusClass(order.status)}`}>
                  <span className="my-orders__status-dot"></span>
                  {order.status}
                </span>
              </div>

              <div className="my-orders__actions">
                <button className="btn-primary my-orders__track-btn" onClick={fetchOrders}>
                  Refresh Status
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}