import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Cart } from './pages/Cart/Cart'
import { PlaceOrder } from './pages/PlaceOrder/PlaceOrder'
import { Footer } from './components/Footer/Footer'
import { LoginPopup } from './components/LoginPopup/LoginPopup'
import { Verify } from './pages/Verify/Verify'
import { MyOrders } from './pages/MyOrders/MyOrders'
import { useEffect } from 'react'

const App = () => {
  const [showLogin, setShowLogin] = React.useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app-wrapper">
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart setShowLogin={setShowLogin} />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default App