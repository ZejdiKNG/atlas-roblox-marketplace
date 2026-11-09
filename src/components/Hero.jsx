import React from 'react';
import { ArrowRight, Zap, ShieldCheck, LifeBuoy, Download, CheckCircle2, Star, Sparkles, Box } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function Hero({ onBrowseProducts, onOpenProduct, onSelectTicket, onOpenSupport }) {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="space-y-24 py-12">
      {/* Hero Headline Section */}
      <section className="text-left max-w-4xl pt-6 space-y-6">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
          Roblox builds you can{' '}
          <span className="text-[#ef233c] drop-shadow-[0_0_25px_rgba(239,35,60,0.35)]">
            buy and download
          </span>{' '}
          in a minute.
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl">
          Games, systems and effects ready to open in Studio. Pay with PayPal or crypto, no account required — the file downloads as soon as your payment is confirmed.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={onBrowseProducts}
            className="group inline-flex items-center space-x-2 px-6 py-3.5 bg-[#ef233c] hover:bg-[#d90429] active:scale-[0.98] text-white font-semibold text-sm rounded-lg transition-all shadow-[0_0_20px_rgba(239,35,60,0.3)] hover:shadow-[0_0_30px_rgba(239,35,60,0.5)]"
          >
            <span>Browse products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenSupport}
            className="inline-flex items-center space-x-2 px-5 py-3.5 bg-[#141416] hover:bg-[#1f1f24] text-zinc-300 hover:text-white font-medium text-sm rounded-lg border border-[#27272a] hover:border-[#3f3f46] transition-all"
          >
            <span>Have questions? Open a ticket</span>
          </button>
        </div>

        {/* Live Micro Stats */}
        <div className="pt-6 border-t border-[#18181b] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-zinc-400">
          <div>
            <div className="text-white font-bold text-base">14,200+</div>
            <div className="text-zinc-400">Studio Builds Delivered</div>
          </div>
          <div>
            <div className="text-white font-bold text-base">4.96 / 5.0</div>
            <div className="text-zinc-400">Average Dev Rating</div>
          </div>
          <div>
            <div className="text-white font-bold text-base">&lt; 45 Sec</div>
            <div className="text-zinc-400">Instant File Delivery</div>
          </div>
          <div>
            <div className="text-[#ef233c] font-bold text-base">Studio 2026</div>
            <div className="text-zinc-400">Luau Strict Certified</div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">Featured Builds</h2>
          <button
            onClick={onBrowseProducts}
            className="inline-flex items-center space-x-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              onClick={() => onOpenProduct(product)}
              className="group cursor-pointer bg-[#0e0e11] hover:bg-[#131317] border border-[#1f1f24] hover:border-[#ef233c]/50 rounded-xl p-5 transition-all duration-200 flex flex-col justify-between hover:shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="space-y-4">
                {/* Visual Header / Thumbnail */}
                <div className="relative h-44 rounded-lg overflow-hidden border border-[#27272a]/60 bg-zinc-950">
                  <img
                    src={product.previewImage}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-transparent to-transparent"></div>
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#ef233c]/90 text-white shadow-sm">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono text-zinc-300 border border-white/10">
                      {product.fileType}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <div className="text-xs font-mono text-[#ef233c] uppercase tracking-wider mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>
              </div>

              {/* Price & CTA Footer */}
              <div className="pt-5 mt-5 border-t border-[#1f1f24] flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold text-white">${product.price.toFixed(2)}</div>
                  <div className="text-[11px] text-zinc-400">One-time payment</div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProduct(product);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#18181b] hover:bg-[#ef233c] text-zinc-200 hover:text-white text-xs font-medium border border-[#27272a] hover:border-transparent transition-all flex items-center space-x-1.5"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Core Value Cards from Screenshot 1 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Card 1 */}
        <div className="bg-[#0e0e11] border border-[#1f1f24] rounded-xl p-6 space-y-3 hover:border-zinc-700 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-[#ef233c]/10 text-[#ef233c] flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Instant download</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The file starts downloading automatically as soon as your payment is confirmed.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0e0e11] border border-[#1f1f24] rounded-xl p-6 space-y-3 hover:border-zinc-700 transition-colors">
          <div className="w-9 h-9 rounded-lg bg-[#ef233c]/10 text-[#ef233c] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Every payment verified</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Our server confirms each PayPal or crypto payment before anything is released.
          </p>
        </div>

        {/* Card 3 */}
        <div 
          onClick={onOpenSupport}
          className="group cursor-pointer bg-[#0e0e11] hover:bg-[#141418] border border-[#1f1f24] hover:border-[#ef233c]/40 rounded-xl p-6 space-y-3 transition-all"
        >
          <div className="w-9 h-9 rounded-lg bg-[#ef233c]/10 text-[#ef233c] flex items-center justify-center group-hover:scale-110 transition-transform">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">Help if you need it</h3>
            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Something not working? Open a request and we'll reply — no account needed.
          </p>
        </div>
      </section>
    </div>
  );
}
