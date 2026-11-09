import React, { useState } from 'react';

export default function Footer({ setActiveTab }) {
  const [modalContent, setModalContent] = useState(null);

  return (
    <>
      <footer className="border-t border-[#18181b] bg-[#09090b] text-zinc-400 py-16 px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-6 h-6 rounded bg-[#18181b] border border-[#27272a] flex items-center justify-center font-bold text-xs text-[#ef233c]">
                A
              </div>
              <span className="font-extrabold text-sm tracking-wider text-white">ATLAS</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Roblox games, systems and effects. Pay with PayPal or crypto and your file downloads straight away — no account needed.
            </p>
          </div>

          {/* Marketplace links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { setActiveTab('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('support'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setModalContent({ title: "Terms of Service", body: "All ATLAS digital assets are provided as uncopylocked, open-source Roblox Studio places (.rbxl) and model packages (.rbxm). You are granted a perpetual commercial license to use, modify, and publish games containing these assets on Roblox. You may not re-distribute raw project files as standalone marketplace assets." })}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalContent({ title: "Privacy Policy", body: "ATLAS does not require account registration or store sensitive passwords. Email addresses provided during checkout or support tickets are solely used for delivery verification, transaction receipts, and ticket notifications. Tickets and access tokens are client-side verifiable." })}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#18181b]/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© 2026 ATLAS. Roblox is a trademark of Roblox Corporation.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All systems operational</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Modal for terms/privacy */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#121215] border border-[#27272a] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">{modalContent.title}</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">{modalContent.body}</p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white text-sm font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
