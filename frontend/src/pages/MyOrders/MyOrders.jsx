import React from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {
    const [data, setData] = React.useState([]);

    const {url, token} = React.useContext(StoreContext);

    const fetchOrders = async () => {
        const response = await axios.post()(`${url}/api/order/myorders`, {}, {
            headers: {
                token
            }
        });
        setData(response.data.data);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);


  return (
    <div className='myorders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order, index)=>{
                return (
                    <div className="my-orders-order" key={index}>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index) =>{
                            if (index===order.items.length-1){
                                return item.name + " x " + item.quantity;
                            }
                            else {
                                return item.name + " x " + item.quantity + ", ";
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25f;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>

                    </div>
                )
            })}
        </div>

    </div>
  )
}

export { MyOrders }