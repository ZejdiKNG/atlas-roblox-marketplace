import React, { useState } from 'react';
import { ShieldCheck, Zap, Code2, Cpu, ChevronDown, ChevronUp, LifeBuoy, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutSection({ onOpenSupport }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How do I open the files in Roblox Studio?",
      a: "Once downloaded, you receive a genuine `.rbxl` (Roblox Place) or `.rbxm` (Roblox Model) file. Double click the file or open Roblox Studio, click 'File > Open from Disk...', and select the file. Everything is organized inside Workspace, ReplicatedStorage, and ServerScriptService."
    },
    {
      q: "Can I use these builds in commercial games with monetization?",
      a: "Yes! All ATLAS assets include a royalty-free perpetual commercial license. You can modify, re-skin, and monetize them inside your Roblox experiences without paying any royalties or asking for permission."
    },
    {
      q: "Are the scripts obfuscated or locked behind external servers?",
      a: "Never. Every line of code is 100% open-source Luau with clean indentation, strict type annotations, and descriptive comments. There are zero backdoors, obfuscated bytecodes, or external web dependencies."
    },
    {
      q: "What if a Roblox Studio update breaks a build?",
      a: "Every product comes with lifetime version support. If a Roblox engine patch deprecates an API, our engineering team immediately releases an updated file, and you can re-download it or open a support ticket for immediate assistance."
    }
  ];

  return (
    <div className="py-8 space-y-12 max-w-4xl mx-auto">
      {/* Header matching screenshot 4 */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About <span className="text-[#ef233c]">ATLAS</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          A marketplace for Roblox developers who want working, documented builds.
        </p>
      </div>

      {/* The 3 Core Mission Cards from screenshot 4 */}
      <div className="space-y-4">
        {/* Card 1 */}
        <div className="bg-[#0e0e11] border border-[#1f1f24] rounded-xl p-6 sm:p-7 space-y-2.5 hover:border-zinc-700 transition-colors">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>Our Mission</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            ATLAS exists to elevate the quality of Roblox game development. We sell games, templates, systems, VFX packs and UI kits for Roblox.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0e0e11] border border-[#1f1f24] rounded-xl p-6 sm:p-7 space-y-2.5 hover:border-zinc-700 transition-colors">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>What We Offer</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Each product is a Roblox file you open in Studio. Descriptions list what is included, and you can contact support if something doesn't work as described.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0e0e11] border border-[#1f1f24] rounded-xl p-6 sm:p-7 space-y-2.5 hover:border-zinc-700 transition-colors">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>Instant delivery, no account</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            You don't need to register. Pay with PayPal and, once our server has confirmed the payment with PayPal, your file downloads automatically. Your order page stays available so you can download again.
          </p>
        </div>
      </div>

      {/* Additional "Way More Better" Architectural Pillars */}
      <div className="pt-6 space-y-6">
        <h3 className="text-xl font-bold text-white">Engineered for Studio 2026 Standards</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0e0e11] border border-[#1f1f24] p-5 rounded-xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#ef233c] flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Strict Luau Typed</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Fully typed ModuleScripts with autocomplete, strict linter checks, and modular separation of concerns.
            </p>
          </div>

          <div className="bg-[#0e0e11] border border-[#1f1f24] p-5 rounded-xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#ef233c] flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Rojo & Git Ready</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Exportable file trees ready for modern Rojo workflows, VS Code syncing, and version control.
            </p>
          </div>

          <div className="bg-[#0e0e11] border border-[#1f1f24] p-5 rounded-xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#ef233c] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Exploit Fortified</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All combat, inventory, and currency actions are verified on the server side with zero trusting the client.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="pt-6 space-y-4">
        <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#0e0e11] border border-[#1f1f24] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#141418] transition-colors"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-[#18181b] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct Contact Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-[#121217] to-[#0e0e11] border border-[#ef233c]/30 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-white">Need a custom system or commission?</h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
            Our team of verified Roblox game architects can build custom systems tailored to your game concept.
          </p>
        </div>
        <button
          onClick={onOpenSupport}
          className="px-5 py-2.5 bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(239,35,60,0.3)] shrink-0"
        >
          Open custom request
        </button>
      </div>
    </div>
  );
}
