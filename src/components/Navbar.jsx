import React from 'react';
import { ShoppingBag, Search, Sparkles, DollarSign } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, cartCount, onOpenCart, onOpenSearch, currency, setCurrency }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#18181b] bg-[#09090b]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-8">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#27272a] group-hover:border-[#ef233c]/60 flex items-center justify-center font-bold text-white text-base transition-colors shadow-sm">
              <span className="text-[#ef233c] font-black group-hover:scale-110 transition-transform">A</span>
            </div>
            <span className="font-extrabold tracking-wider text-white text-lg">ATLAS</span>
          </button>

          {/* Nav links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'products'
                  ? 'text-[#ef233c]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'support'
                  ? 'text-[#ef233c]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              Support
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'about'
                  ? 'text-[#ef233c]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              About
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Mobile nav triggers */}
          <div className="flex md:hidden items-center space-x-1 text-xs">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-2 py-1 rounded ${activeTab === 'products' ? 'text-[#ef233c] font-semibold' : 'text-zinc-400'}`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-2 py-1 rounded ${activeTab === 'support' ? 'text-[#ef233c] font-semibold' : 'text-zinc-400'}`}
            >
              Support
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-2 py-1 rounded ${activeTab === 'about' ? 'text-[#ef233c] font-semibold' : 'text-zinc-400'}`}
            >
              About
            </button>
          </div>

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-zinc-400 hover:text-white hover:bg-[#18181b] rounded-lg border border-transparent hover:border-[#27272a] transition-colors"
            title="Search products"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Currency / Region pill */}
          <button
            onClick={() => setCurrency(currency === 'USD' ? 'EUR' : currency === 'EUR' ? 'ROBUX' : 'USD')}
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1 text-xs font-mono font-medium text-zinc-400 hover:text-zinc-200 bg-[#141416] hover:bg-[#1c1c1f] rounded-lg border border-[#27272a] transition-colors"
            title="Switch Currency / Value Display"
          >
            <span className="text-zinc-500 text-[10px]">CUR</span>
            <span className="text-zinc-300 font-bold">{currency}</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-zinc-300 hover:text-white bg-[#141416] hover:bg-[#1e1e24] rounded-lg border border-[#27272a] hover:border-[#3f3f46] transition-colors"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ef233c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
