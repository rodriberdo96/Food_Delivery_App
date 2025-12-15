
import axios from 'axios';
import { createContext, useState } from 'react';
import { useEffect } from 'react';

const StoreContext = createContext(null);

    const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list,setFoodList] = useState([]);

    const addToCart = async (itemId) => {
    setCartItems(prev => {
        const updatedCart = {
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        };

        // Call the API with updated cart data (but only if token exists)
        if (token) {
            axios.post(`${url}/api/cart/add`, { itemId }, {
                headers: { token }
            }).catch(err => console.error("Add to cart error:", err));
        }

        return updatedCart;
    });
};


    const removeFromCart = async (itemId) => {
    setCartItems(prev => {
        const updatedCart = {
            ...prev,
            [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0
        };

        if (token) {
            axios.post(`${url}/api/cart/remove`, { itemId }, {
                headers: { token }
            }).catch(err => console.error("Remove from cart error:", err));
        }

        return updatedCart;
    });
};

    const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            const itemInfo = food_list.find(product => product._id === item);
            if (itemInfo) {
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
    }
    return totalAmount;
};


    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList (response.data.data);
    }

   const loadCartData = async (token) => {
    try {
        const response = await axios.post(`${url}/api/cart/get`, {}, {
            headers: { token }
        });

        // Defensive check
        const cartData = response.data.cartData || {};
        setCartItems(cartData);
    } catch (err) {
        console.error("Failed to load cart:", err);
    }
};



    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
                    if (localStorage.getItem("token")) {
            setToken (localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
        }
        loadData();
    }, []);
    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;

export { StoreContext };