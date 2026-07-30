import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AddedToBagBar from './components/AddedToBagBar'
import NewsletterPopup from './components/NewsletterPopup'
import { CartProvider } from './context/CartContext'
import { MeasurementsProvider } from './context/MeasurementsContext'
import { WishlistProvider } from './context/WishlistContext'
import Home from './pages/Home'
import Collections from './pages/Collections'
import ProductDetail from './pages/ProductDetail'
import Configurator from './pages/Configurator'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import MeasurementGuide from './pages/MeasurementGuide'
import House from './pages/House'
import Lookbook from './pages/Lookbook'
import Accessories from './pages/Accessories'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import ShippingReturns from './pages/ShippingReturns'
import Legal from './pages/Legal'
import Account from './pages/Account'
import TrackOrder from './pages/TrackOrder'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <CartProvider>
      <MeasurementsProvider>
        <WishlistProvider>
          <ScrollToTop />
          <div className="grain-overlay" />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/suits/:slug" element={<ProductDetail />} />
              <Route path="/configure" element={<Configurator />} />
              <Route path="/configure/:slug" element={<Configurator />} />
              <Route path="/measurement-guide" element={<MeasurementGuide />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/:id" element={<OrderConfirmation />} />
              <Route path="/house" element={<House />} />
              <Route path="/lookbook" element={<Lookbook />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shipping-returns" element={<ShippingReturns />} />
              <Route path="/terms" element={<Legal kind="terms" />} />
              <Route path="/privacy" element={<Legal kind="privacy" />} />
              <Route path="/account" element={<Account />} />
              <Route path="/track" element={<TrackOrder />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <AddedToBagBar />
          <NewsletterPopup />
        </WishlistProvider>
      </MeasurementsProvider>
    </CartProvider>
  )
}

export default App
