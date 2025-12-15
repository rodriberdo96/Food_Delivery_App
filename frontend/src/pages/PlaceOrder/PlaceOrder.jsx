import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const PlaceOrder = () => {

  const {getTotalCartAmount, token , food_list, cartItems, url} = useContext(StoreContext)

  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data)=>{
      return {
        ...data,
        [name]: value
      }
    });
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let ordrerItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        ordrerItems.push(itemInfo);
      }
    });
    const orderData = {
      address: data,
      items: ordrerItems,
      amount: getTotalCartAmount()+2
    }
    let response = await axios.post(`${url}/api/order/place`, orderData, {
      headers: {
        token
      }
    });
    if (response.data.success){
      const { session_url } = response.data;
      window.open(session_url, '_blank');

    }
    else {
      alert(response.data.message + " Please try again.");
    }
  }

    const navigate = useNavigate();

useEffect(() => {
    if (!token) {
      navigate('/cart');
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token , getTotalCartAmount, navigate]);




  return (
    <form onSubmit={placeOrder} action="">
      <div className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
            <input  required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
          </div>
          <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Adress'/>
          <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
                    <div className="multi-fields">
            <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
            <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
          </div>
                    <div className="multi-fields">
            <input required name="zipCode" onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip Code' />
            <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
          </div>
          <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
        </div>
        <div className="place-order-right">
                  <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>            
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder