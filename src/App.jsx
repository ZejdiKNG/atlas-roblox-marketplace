import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductsList from './components/ProductsList';
import SupportSection from './components/SupportSection';
import AboutSection from './components/AboutSection';
import ProductDetailModal from './components/ProductDetailModal';
import CartModal from './components/CartModal';
import QuickSearchModal from './components/QuickSearchModal';
import { sounds } from './utils/sound';
import { downloadRobloxPlaceFile } from './utils/robloxDownload';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [activeTicketId, setActiveTicketId] = useState(null);
  const [initialOrderRef, setInitialOrderRef] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Global hotkeys (Ctrl+K or Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    sounds.playPop();
    showToast(`Added "${product.title}" to your cart`);
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter(p => p.id !== productId));
    sounds.playPop();
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleInstantBuy = (product) => {
    sounds.playPop();
    // Add to cart and open cart modal directly
    setCart((prev) => {
      if (!prev.some(p => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
    setCartOpen(true);
  };

  const handleOpenSupportWithOrder = (orderNumber) => {
    setInitialOrderRef(orderNumber);
    setActiveTicketId(null);
    setActiveTab('support');
    showToast(`Support opened with Order #${orderNumber}`);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col justify-between selection:bg-[#ef233c] selection:text-white relative">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cart.length}
        onOpenCart={() => {
          setCartOpen(true);
          sounds.playPop();
        }}
        onOpenSearch={() => {
          setSearchOpen(true);
          sounds.playPop();
        }}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        {activeTab === 'home' && (
          <Hero
            onBrowseProducts={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenProduct={(prod) => {
              setSelectedProduct(prod);
              sounds.playPop();
            }}
            onOpenSupport={() => {
              setActiveTab('support');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectTicket={(tId) => {
              setActiveTicketId(tId);
              setActiveTab('support');
            }}
          />
        )}

        {activeTab === 'products' && (
          <ProductsList
            onOpenProduct={(prod) => {
              setSelectedProduct(prod);
              sounds.playPop();
            }}
            onAddToCart={handleAddToCart}
            onInstantBuy={handleInstantBuy}
          />
        )}

        {activeTab === 'support' && (
          <SupportSection
            activeTicketId={activeTicketId}
            setActiveTicketId={setActiveTicketId}
            initialOrderRef={initialOrderRef}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection
            onOpenSupport={() => {
              setActiveTab('support');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
      />

      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenSupportWithOrder={handleOpenSupportWithOrder}
      />

      <QuickSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          sounds.playPop();
        }}
        onSelectTicket={(tId) => {
          setActiveTicketId(tId);
          setActiveTab('support');
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16161c] text-white text-xs font-medium px-4 py-3 rounded-xl border border-[#2e2e38] shadow-2xl flex items-center space-x-2 animate-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
