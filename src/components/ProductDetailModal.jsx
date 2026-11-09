import React, { useState } from 'react';
import { X, Star, Download, ShoppingBag, Zap, ShieldCheck, Code2, CheckCircle2, Copy, Check } from 'lucide-react';
import { sounds } from '../utils/sound';

export default function ProductDetailModal({ product, onClose, onAddToCart, onInstantBuy }) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!product) return null;

  const handleCopyCode = () => {
    if (product.codeSnippet) {
      navigator.clipboard.writeText(product.codeSnippet);
      setCopiedSnippet(true);
      sounds.playPop();
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0e0e12] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-zinc-400 hover:text-white border border-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Media Hero */}
        <div className="relative h-60 sm:h-72 w-full bg-zinc-950 overflow-hidden">
          <img
            src={product.previewImage}
            alt={product.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/40 to-transparent"></div>

          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#ef233c] text-white">
                  {product.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-black/80 text-xs font-mono text-zinc-300 border border-white/10">
                  {product.fileType}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-black/80 text-xs font-mono text-emerald-400 border border-white/10 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Clean</span>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{product.title}</h2>
            </div>

            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-right">
              <div className="text-2xl font-black text-white">${product.price.toFixed(2)}</div>
              <div className="text-[10px] text-zinc-400">One-time payment</div>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center space-x-4 px-6 border-b border-[#1f1f24] text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-[#ef233c] text-white font-bold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Overview & Features
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'code'
                ? 'border-[#ef233c] text-white font-bold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Luau Code Preview
          </button>
          <button
            onClick={() => setActiveTab('installation')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'installation'
                ? 'border-[#ef233c] text-white font-bold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Studio Setup Guide
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[380px] overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <p className="text-sm text-zinc-300 leading-relaxed">
                {product.tagline} Engineered strictly with Roblox's modern Luau syntax and zero external framework bloat.
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Key Deliverables Included
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#131317] border border-[#222228] rounded-lg text-xs text-zinc-300 flex items-start space-x-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#ef233c] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center space-x-3">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>
                    <strong className="text-white">{product.rating}</strong> out of 5 ({product.reviewsCount} verified developer reviews)
                  </span>
                </div>
                <span className="font-mono">{product.downloadsCount} downloads</span>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">ModuleScript API Sample</span>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-[#18181b] border border-[#27272a] transition-colors"
                >
                  {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSnippet ? "Copied" : "Copy code"}</span>
                </button>
              </div>
              <pre className="p-4 bg-[#08080a] border border-[#222228] rounded-xl text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{product.codeSnippet}</code>
              </pre>
            </div>
          )}

          {activeTab === 'installation' && (
            <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
              <div className="p-3 bg-[#141418] border border-[#27272a] rounded-lg space-y-1">
                <div className="font-bold text-white">Step 1: Open in Studio</div>
                <div>Launch Roblox Studio and select "File &gt; Open from Disk...", choosing the downloaded <span className="font-mono text-[#ef233c]">{product.id}.rbxl</span>.</div>
              </div>
              <div className="p-3 bg-[#141418] border border-[#27272a] rounded-lg space-y-1">
                <div className="font-bold text-white">Step 2: Check Explorer Organization</div>
                <div>All components are automatically segregated into <span className="font-mono text-zinc-200">ReplicatedStorage</span>, <span className="font-mono text-zinc-200">ServerScriptService</span>, and <span className="font-mono text-zinc-200">StarterPlayerScripts</span>.</div>
              </div>
              <div className="p-3 bg-[#141418] border border-[#27272a] rounded-lg space-y-1">
                <div className="font-bold text-white">Step 3: Press F5 to Playtest</div>
                <div>Press F5 or click Play to verify the systems running. Everything is self-initializing.</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#1f1f24] bg-[#0c0c0f] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-400">
            Immediate automatic download after checkout. No registration needed.
          </div>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                onAddToCart(product);
                sounds.playPop();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[#18181c] hover:bg-[#25252c] text-white text-xs font-semibold rounded-lg border border-[#2e2e38] transition-colors flex items-center justify-center space-x-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => {
                onInstantBuy(product);
                onClose();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(239,35,60,0.3)] flex items-center justify-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy Now (${product.price.toFixed(2)})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
