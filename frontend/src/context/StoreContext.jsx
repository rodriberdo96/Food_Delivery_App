import axios from 'axios'
import { createContext, useEffect, useState, useCallback } from 'react'

const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({})
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000'
  const [token, setToken] = useState('')
  const [food_list, setFoodList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = {
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }

      if (token) {
        axios.post(`${url}/api/cart/add`, { itemId }, {
          headers: { token },
        }).catch((err) => console.error('Add to cart error:', err))
      }

      return updatedCart
    })
  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = {
        ...prev,
        [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
      }

      if (token) {
        axios.post(`${url}/api/cart/remove`, { itemId }, {
          headers: { token },
        }).catch((err) => console.error('Remove from cart error:', err))
      }

      return updatedCart
    })
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item)
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price
        }
      }
    }
    return totalAmount
  }

  const getCartItemCount = () => {
    let count = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        count += cartItems[item]
      }
    }
    return count
  }

  const fetchFoodList = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setFoodList(response.data.data)
      } else {
        setError('Failed to load menu items')
      }
    } catch (err) {
      console.error('Failed to fetch food list:', err)
      setError('Could not connect to server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [url])

  const loadCartData = async (authToken) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, {
        headers: { token: authToken },
      })

      const cartData = response.data.data || []
      const normalizedCart = Array.isArray(cartData)
        ? cartData.reduce((acc, item) => {
          acc[item.itemId] = item.quantity
          return acc
        }, {})
        : cartData
      setCartItems(normalizedCart)
    } catch (err) {
      console.error('Failed to load cart:', err)
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList()
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        setToken(savedToken)
        await loadCartData(savedToken)
      }
    }
    loadData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getCartItemCount,
    url,
    token,
    setToken,
    loading,
    error,
    fetchFoodList,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider

export { StoreContext }
