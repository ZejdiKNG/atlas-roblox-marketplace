import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Box, MessageSquare } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { getSavedTickets } from '../data/tickets';

export default function QuickSearchModal({ isOpen, onClose, onSelectProduct, onSelectTicket }) {
  const [query, setQuery] = useState('');
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setTickets(getSavedTickets());
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const matchedProducts = PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const matchedTickets = tickets.filter(t => 
    t.id.toLowerCase().includes(query.toLowerCase()) ||
    t.subject.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#0e0e12] border border-[#27272a] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-3.5 border-b border-[#1f1f24] flex items-center space-x-3">
          <Search className="w-4 h-4 text-zinc-500" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, orders, or support tickets..."
            className="flex-1 bg-transparent text-white text-sm placeholder-zinc-500 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[350px] overflow-y-auto p-2 space-y-4">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-xs text-zinc-500">
              Type to instantly search across all ATLAS systems, games, or your saved support tickets.
            </div>
          ) : (
            <>
              {matchedProducts.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                    Products ({matchedProducts.length})
                  </div>
                  <div className="space-y-1">
                    {matchedProducts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="px-3 py-2 rounded-lg hover:bg-[#18181e] cursor-pointer flex items-center justify-between group"
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-white group-hover:text-red-400">
                            {p.title}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono">
                            {p.category} • ${p.price.toFixed(2)}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedTickets.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                    Your Support Tickets ({matchedTickets.length})
                  </div>
                  <div className="space-y-1">
                    {matchedTickets.map(t => (
                      <div
                        key={t.id}
                        onClick={() => {
                          onSelectTicket(t.id);
                          onClose();
                        }}
                        className="px-3 py-2 rounded-lg hover:bg-[#18181e] cursor-pointer flex items-center justify-between group"
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-white group-hover:text-red-400">
                            {t.id} - {t.subject}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono">
                            Status: {t.status}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedProducts.length === 0 && matchedTickets.length === 0 && (
                <div className="p-6 text-center text-xs text-zinc-500">
                  No products or tickets matching "{query}".
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
