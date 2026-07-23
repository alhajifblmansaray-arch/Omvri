import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import AddedToBagBar from './components/AddedToBagBar'
import { CartProvider } from './context/CartContext'
import { MeasurementsProvider } from './context/MeasurementsContext'
import Home from './pages/Home'
import Collections from './pages/Collections'
import ProductDetail from './pages/ProductDetail'
import Configurator from './pages/Configurator'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import MeasurementGuide from './pages/MeasurementGuide'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <CartProvider>
      <MeasurementsProvider>
        <ScrollToTop />
        <div className="grain-overlay" />
        <Header onBook={() => setBookingOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Home onBook={() => setBookingOpen(true)} />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/suits/:slug" element={<ProductDetail />} />
            <Route path="/configure" element={<Configurator />} />
            <Route path="/configure/:slug" element={<Configurator />} />
            <Route path="/measurement-guide" element={<MeasurementGuide />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<OrderConfirmation />} />
          </Routes>
        </main>
        <Footer />
        <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
        <AddedToBagBar />
      </MeasurementsProvider>
    </CartProvider>
  )
}

export default App
