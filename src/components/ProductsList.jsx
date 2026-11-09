import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Box, Star, Download, ShoppingBag, Eye, Zap, Filter } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function ProductsList({ onOpenProduct, onAddToCart, onInstantBuy }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return b.downloadsCount - a.downloadsCount;
      return 0; // default newest
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Products</h1>
        <p className="text-sm sm:text-base text-zinc-400">
          Roblox games, templates, systems and effects
        </p>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input matching screenshot 2 */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products"
            className="w-full pl-10 pr-4 py-2.5 bg-[#0e0e11] hover:bg-[#121216] focus:bg-[#121216] border border-[#27272a] focus:border-[#ef233c] text-white text-sm rounded-lg placeholder-zinc-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-zinc-500 hover:text-zinc-300"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative min-w-[140px]">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-[#0e0e11] hover:bg-[#121216] border border-[#27272a] focus:border-[#ef233c] text-zinc-300 text-sm rounded-lg focus:outline-none cursor-pointer transition-colors"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-zinc-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#ef233c] text-white shadow-[0_0_15px_rgba(239,35,60,0.3)]'
                  : 'bg-[#121215] text-zinc-400 hover:text-white hover:bg-[#1a1a20] border border-[#222227]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Product Content or Empty State */}
      {filteredProducts.length === 0 ? (
        /* Empty State matching screenshot 2 */
        <div className="border border-dashed border-[#27272a] rounded-2xl py-24 px-6 flex flex-col items-center justify-center text-center space-y-3 bg-[#0a0a0d]/50">
          <div className="w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-500">
            <Box className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h3 className="text-base font-semibold text-white">No products found</h3>
          <p className="text-xs text-zinc-500 max-w-xs">
            No products available in this category or matching your search filter yet.
          </p>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 text-xs text-[#ef233c] hover:underline font-medium"
            >
              Reset all filters
            </button>
          )}
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#0e0e11] hover:bg-[#121216] border border-[#1f1f24] hover:border-[#ef233c]/50 rounded-xl overflow-hidden transition-all duration-200 flex flex-col justify-between hover:shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            >
              {/* Product Visual */}
              <div 
                onClick={() => onOpenProduct(product)}
                className="relative h-48 overflow-hidden cursor-pointer bg-zinc-950"
              >
                <img
                  src={product.previewImage}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-transparent to-transparent"></div>
                
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#ef233c] text-white">
                    {product.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10">
                    {product.fileType}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-3 flex items-center space-x-1 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-mono text-amber-400 border border-white/5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-[#ef233c] font-semibold uppercase tracking-wider">
                    {product.category}
                  </div>
                  <h3
                    onClick={() => onOpenProduct(product)}
                    className="text-base font-bold text-white hover:text-red-400 cursor-pointer transition-colors line-clamp-1"
                  >
                    {product.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                {/* Features highlight */}
                <div className="space-y-1 pt-1 text-[11px] text-zinc-400">
                  {product.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 line-clamp-1">
                      <span className="w-1 h-1 rounded-full bg-[#ef233c]"></span>
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Footer / Price & Actions */}
                <div className="pt-4 border-t border-[#1f1f24] flex items-center justify-between">
                  <div>
                    <div className="text-xl font-extrabold text-white">
                      ${product.price.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-zinc-400">Instant .RBXL delivery</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenProduct(product)}
                      className="p-2 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-zinc-300 hover:text-white border border-[#27272a] transition-colors"
                      title="Quick Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-zinc-300 hover:text-white border border-[#27272a] transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onInstantBuy(product)}
                      className="px-3.5 py-2 rounded-lg bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-semibold transition-all shadow-[0_0_15px_rgba(239,35,60,0.25)] flex items-center space-x-1"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
