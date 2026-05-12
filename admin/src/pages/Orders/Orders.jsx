import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../../assets/admin_assets/assets'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`)
    if (response.data.success) {
      setOrders(response.data.data)
    } else {
      toast.error('Could not fetch orders')
    }
  }

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value
    const response = await axios.post(`${url}/api/order/status`, { orderId, status: newStatus })
    if (response.data.success) {
      await fetchAllOrders()
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message || 'Could not update order status')
    }
  }

  useEffect(() => {
    fetchAllOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="order add">
      <h3>Orders</h3>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-item" key={order._id}>
            <img src={assets.parcel_icon} alt="Parcel" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  `${item.name} x ${item.quantity}${index === order.items.length - 1 ? '' : ', '}`
                ))}
              </p>
              <p className="order-item-name">
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ', '}</p>
                <p>
                  {order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + (order.address.zipCode || order.address.zipcode)}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>Total: ${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
