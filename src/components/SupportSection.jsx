import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  ChevronRight, 
  ArrowLeft, 
  Send, 
  Paperclip, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Copy, 
  Check, 
  ShieldCheck, 
  Download, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  RefreshCw,
  X
} from 'lucide-react';
import { 
  getSavedTickets, 
  createNewTicket, 
  addMessageToTicket, 
  updateTicketStatus, 
  TICKET_TOPICS 
} from '../data/tickets';
import { downloadRobloxPlaceFile } from '../utils/robloxDownload';
import { sounds } from '../utils/sound';

export default function SupportSection({ activeTicketId, setActiveTicketId, initialOrderRef }) {
  const [tickets, setTickets] = useState(getSavedTickets());
  const [currentTicket, setCurrentTicket] = useState(null);

  // Form states
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState(initialOrderRef ? `Inquiry regarding order ${initialOrderRef}` : '');
  const [message, setMessage] = useState('');
  const [orderNumber, setOrderNumber] = useState(initialOrderRef || '');
  const [priority, setPriority] = useState('Normal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Lookup form states
  const [lookupTicketId, setLookupTicketId] = useState('');
  const [lookupAccessCode, setLookupAccessCode] = useState('');
  const [lookupError, setLookupError] = useState('');

  // Ticket chat states
  const [replyText, setReplyText] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isTypingStaff, setIsTypingStaff] = useState(false);
  const chatBottomRef = useRef(null);

  // Synchronize tickets list
  const refreshTickets = () => {
    const list = getSavedTickets();
    setTickets(list);
    return list;
  };

  useEffect(() => {
    const list = refreshTickets();
    if (activeTicketId) {
      const match = list.find(t => t.id.toLowerCase() === activeTicketId.toLowerCase());
      if (match) setCurrentTicket(match);
    }
  }, [activeTicketId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (currentTicket) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentTicket?.messages, isTypingStaff]);

  // Handle open ticket creation
  const handleOpenTicketSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!topic || topic === 'Choose one') {
      setFormError('Please select a topic for your request.');
      return;
    }
    if (!subject.trim()) {
      setFormError('Please enter a short summary subject.');
      return;
    }
    if (!message.trim()) {
      setFormError('Please describe your issue in the message box.');
      return;
    }

    setIsSubmitting(true);
    sounds.playPop();

    setTimeout(() => {
      const newTicket = createNewTicket({
        email: email.trim(),
        topic,
        subject: subject.trim(),
        message: message.trim(),
        orderNumber: orderNumber.trim() || undefined,
        priority
      });

      refreshTickets();
      setCurrentTicket(newTicket);
      setActiveTicketId(newTicket.id);
      setIsSubmitting(false);
      sounds.playSuccess();

      // Reset form fields
      setMessage('');
      setSubject('');
      setTopic('');

      // Trigger automatic realistic ATLAS Staff response after 2.2 seconds!
      simulateStaffResponse(newTicket.id, topic, subject.trim());
    }, 600);
  };

  // Realistic staff response simulator tailored to the topic
  const simulateStaffResponse = (tId, ticketTopic, ticketSubject) => {
    setIsTypingStaff(true);
    setTimeout(() => {
      setIsTypingStaff(false);

      let staffReply = "";
      if (ticketTopic === "Download issue") {
        staffReply = `Hello! I've refreshed the high-speed download authorization for your order. You can trigger an instant direct download using the button below or re-open Studio. If you receive an error opening the .rbxl file, ensure your Roblox Studio is updated to the latest 2026 build.`;
      } else if (ticketTopic === "Payment verification") {
        staffReply = `Thanks for submitting your payment confirmation. Our automated billing ledger has matched your transaction hash with our gateway. Your license token has been validated and all digital assets are unlocked. Let us know if you need an invoice PDF!`;
      } else if (ticketTopic === "Studio compatibility / bug") {
        staffReply = `Hey! Thanks for reporting this. I've examined the module hierarchy for this asset. If you are experiencing replication delays or nil humanoid errors, please ensure you have 'StreamingEnabled' configured with 'TargetRadius = 64' in Workspace properties, and require the Core Module inside a ServerScript rather than a LocalScript.`;
      } else {
        staffReply = `Hi there! Thanks for opening this ticket. I'm Alex from the ATLAS Engineering team. I've reviewed your request: "${ticketSubject}". We are actively looking into this and will provide a full resolution right here. Feel free to reply with any screenshots or place files!`;
      }

      addMessageToTicket(tId, {
        sender: "staff",
        senderName: "Alex M. (ATLAS Technical Support)",
        content: staffReply
      });

      const updatedList = refreshTickets();
      const updatedCurrent = updatedList.find(t => t.id === tId);
      if (updatedCurrent) setCurrentTicket({ ...updatedCurrent });
      sounds.playSuccess();
    }, 2800);
  };

  // Handle user sending a new message in an existing ticket
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !currentTicket) return;

    sounds.playPop();
    const userMsg = replyText.trim();
    setReplyText('');

    const updated = addMessageToTicket(currentTicket.id, {
      sender: "user",
      senderName: `You (${currentTicket.email})`,
      content: userMsg
    });

    setCurrentTicket({ ...updated });
    refreshTickets();

    // Trigger follow-up staff reply
    setIsTypingStaff(true);
    setTimeout(() => {
      setIsTypingStaff(false);
      const staffReply = `Received your update! Our team has updated your ticket logs. We've verified this on our Studio test branch and confirmed the behavior. Everything is synced. Is there anything else we can assist you with on this build?`;
      
      const res = addMessageToTicket(currentTicket.id, {
        sender: "staff",
        senderName: "Alex M. (ATLAS Technical Support)",
        content: staffReply
      });
      setCurrentTicket({ ...res });
      refreshTickets();
      sounds.playSuccess();
    }, 2200);
  };

  // Handle Lookup existing ticket
  const handleLookupSubmit = (e) => {
    e.preventDefault();
    setLookupError('');

    if (!lookupTicketId.trim()) {
      setLookupError('Please enter a ticket number (e.g. TCK-91351).');
      return;
    }

    const list = refreshTickets();
    const cleanId = lookupTicketId.trim().toUpperCase();
    const match = list.find(t => t.id.toUpperCase() === cleanId);

    if (!match) {
      setLookupError(`Ticket "${cleanId}" could not be found. Check your ticket number or access code.`);
      return;
    }

    sounds.playSuccess();
    setCurrentTicket(match);
    setActiveTicketId(match.id);
  };

  // Status toggle
  const handleToggleStatus = (newStatus) => {
    if (!currentTicket) return;
    const updated = updateTicketStatus(currentTicket.id, newStatus);
    setCurrentTicket({ ...updated });
    refreshTickets();
    sounds.playPop();
  };

  // Copy access code
  const handleCopyCode = () => {
    if (!currentTicket) return;
    navigator.clipboard.writeText(currentTicket.accessCode);
    setCopiedCode(true);
    sounds.playPop();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="py-8 space-y-8 max-w-4xl mx-auto">
      {/* If viewing a specific ticket conversation */}
      {currentTicket ? (
        <div className="space-y-6">
          {/* Top navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1f1f24]">
            <button
              onClick={() => {
                setCurrentTicket(null);
                setActiveTicketId(null);
              }}
              className="inline-flex items-center space-x-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all tickets</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-zinc-400 font-mono">Status:</span>
              <select
                value={currentTicket.status}
                onChange={(e) => handleToggleStatus(e.target.value)}
                className="bg-[#141417] border border-[#27272a] text-xs font-semibold rounded-lg px-2.5 py-1 text-zinc-200 focus:outline-none focus:border-[#ef233c] cursor-pointer"
              >
                <option value="In progress">In progress</option>
                <option value="Staff replied">Staff replied</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Ticket Header Card */}
          <div className="bg-[#0e0e11] border border-[#1f1f24] rounded-xl p-5 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono font-bold text-white text-base">
                    {currentTicket.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                    currentTicket.status === 'Resolved'
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
                      : currentTicket.status === 'Staff replied'
                      ? 'bg-blue-950/80 text-blue-400 border border-blue-800/40'
                      : 'bg-[#ef233c]/15 text-[#ef233c] border border-[#ef233c]/30'
                  }`}>
                    {currentTicket.status}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-[11px] font-mono">
                    {currentTicket.topic}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1.5">{currentTicket.subject}</h2>
              </div>

              {/* Secret Access Code Pill */}
              <div className="bg-[#141418] border border-[#27272a] rounded-lg px-3 py-1.5 flex items-center space-x-2 text-xs font-mono">
                <span className="text-zinc-400">Access Code:</span>
                <span className="text-amber-400 font-semibold">{currentTicket.accessCode}</span>
                <button
                  onClick={handleCopyCode}
                  className="p-1 hover:text-white text-zinc-400 transition-colors"
                  title="Copy secret access code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="pt-2 text-xs text-zinc-400 flex flex-wrap gap-x-6 gap-y-1">
              <div>Email: <span className="text-zinc-300">{currentTicket.email}</span></div>
              {currentTicket.orderNumber && (
                <div>Order Ref: <span className="text-zinc-300 font-mono">{currentTicket.orderNumber}</span></div>
              )}
              <div>Created: <span className="text-zinc-300">{new Date(currentTicket.createdAt).toLocaleDateString()}</span></div>
            </div>
          </div>

          {/* Conversation Chat Thread */}
          <div className="bg-[#0b0b0e] border border-[#1f1f24] rounded-xl p-4 sm:p-6 space-y-5 min-h-[380px]">
            {currentTicket.messages.map((msg) => {
              const isStaff = msg.sender === 'staff';
              const isSystem = msg.sender === 'system';
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  {/* Sender meta */}
                  <div className="flex items-center space-x-2 text-xs text-zinc-400 px-1">
                    <span>{msg.avatar}</span>
                    <span className={`font-semibold ${isStaff ? 'text-[#ef233c]' : isSystem ? 'text-amber-400' : 'text-zinc-300'}`}>
                      {msg.senderName}
                    </span>
                    {msg.badge && (
                      <span className="px-1.5 py-0.2 bg-[#ef233c]/20 text-[#ef233c] text-[10px] rounded font-mono">
                        {msg.badge}
                      </span>
                    )}
                    <span className="text-zinc-400 text-[10px]">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#ef233c] text-white rounded-tr-none shadow-[0_2px_15px_rgba(239,35,60,0.25)]'
                        : isStaff
                        ? 'bg-[#15151a] text-zinc-200 border border-[#27272a] rounded-tl-none'
                        : 'bg-zinc-900/70 text-zinc-300 border border-zinc-800/80 rounded-tl-none font-mono text-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* Quick action inside staff message if related to download */}
                    {isStaff && msg.content.includes('.rbxl') && (
                      <div className="mt-3 pt-3 border-t border-zinc-800/60">
                        <button
                          onClick={() => downloadRobloxPlaceFile({ title: currentTicket.subject, id: currentTicket.id })}
                          className="inline-flex items-center space-x-2 px-3 py-1.5 bg-[#ef233c] hover:bg-[#d90429] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Verified .RBXL Place File</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Live Typing Indicator */}
            {isTypingStaff && (
              <div className="flex items-center space-x-2 text-xs text-zinc-400 italic py-1 animate-pulse">
                <span>🛡️</span>
                <span>Alex M. (ATLAS Support) is typing a response...</span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendMessage} className="bg-[#0e0e11] border border-[#1f1f24] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-medium text-zinc-300">Reply to this ticket</span>
              <span>Encrypted & saved in this browser</span>
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply, error message, or follow-up question here..."
              rows={3}
              className="w-full bg-[#121216] border border-[#27272a] focus:border-[#ef233c] text-white text-sm rounded-lg p-3 placeholder-zinc-500 focus:outline-none resize-none transition-colors"
            />

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  setReplyText((prev) => prev + "\n[Attached screenshot: studio_output_error.png]");
                  sounds.playPop();
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#18181b] hover:bg-[#222227] text-xs text-zinc-400 hover:text-zinc-200 border border-[#27272a] transition-colors"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>Attach screenshot/log</span>
              </button>

              <button
                type="submit"
                disabled={!replyText.trim() || isTypingStaff}
                className="inline-flex items-center space-x-2 px-5 py-2 bg-[#ef233c] hover:bg-[#d90429] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                <span>Send message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Support Overview & Forms (Matches screenshot 3) */
        <div className="space-y-10">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Support</h1>
            <p className="text-sm sm:text-base text-zinc-400">
              Tell us what's wrong and we'll reply right here on the site. You don't need an account.
            </p>

            {/* Green Lock Notice Box from screenshot 3 */}
            <div className="inline-flex items-center space-x-2 text-xs sm:text-sm text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 rounded-lg px-3.5 py-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Your ticket stays open and saved until our team closes it. Nobody else can read it.</span>
            </div>
          </div>

          {/* Section 1: YOUR TICKETS (SAVED IN THIS BROWSER) - from screenshot 3 */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Your tickets (saved in this browser)
            </h3>

            {tickets.length === 0 ? (
              <div className="bg-[#0e0e11] border border-[#1f1f24] rounded-xl p-6 text-center text-xs text-zinc-400">
                No tickets currently saved in this browser. Open a new ticket below to get assistance.
              </div>
            ) : (
              <div className="space-y-2">
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      sounds.playPop();
                      setCurrentTicket(t);
                      setActiveTicketId(t.id);
                    }}
                    className="group cursor-pointer bg-[#0e0e11] hover:bg-[#131317] border border-[#1f1f24] hover:border-[#ef233c]/50 rounded-xl p-4 flex items-center justify-between transition-all"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-zinc-400">{t.id}</div>
                      <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {t.subject}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${
                        t.status === 'Resolved'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                          : t.status === 'Staff replied'
                          ? 'bg-blue-950 text-blue-400 border border-blue-800/40'
                          : 'bg-amber-950/80 text-amber-400 border border-amber-800/40'
                      }`}>
                        {t.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Open a new ticket form - from screenshot 3 */}
          <div className="bg-[#0e0e11] border border-[#1f1f24] rounded-xl p-6 space-y-6">
            <h3 className="text-base font-bold text-white">Open a new ticket</h3>

            {formError && (
              <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-xs text-red-400 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleOpenTicketSubmit} className="space-y-4">
              {/* Row 1: Email and Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#121216] border border-[#27272a] focus:border-[#ef233c] text-white text-sm rounded-lg placeholder-zinc-600 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#121216] border border-[#27272a] focus:border-[#ef233c] text-zinc-300 text-sm rounded-lg focus:outline-none cursor-pointer transition-colors"
                  >
                    <option value="">Choose one</option>
                    {TICKET_TOPICS.map((top) => (
                      <option key={top} value={top}>{top}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Subject */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Short summary"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#121216] border border-[#27272a] focus:border-[#ef233c] text-white text-sm rounded-lg placeholder-zinc-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Row 3: Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What happened? Include your order number if you have one."
                  rows={4}
                  required
                  className="w-full px-3.5 py-2.5 bg-[#121216] border border-[#27272a] focus:border-[#ef233c] text-white text-sm rounded-lg placeholder-zinc-600 focus:outline-none resize-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#ef233c] hover:bg-[#d90429] active:scale-[0.98] text-white font-semibold text-sm rounded-lg transition-all shadow-[0_0_20px_rgba(239,35,60,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Creating secure ticket...</span>
                    </>
                  ) : (
                    <span>Open ticket</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Section 3: Find an existing ticket - from screenshot 3 */}
          <div className="bg-[#0e0e11] border border-[#1f1f24] rounded-xl p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-base text-[#ef233c]">🔑</span>
              <div>
                <h3 className="text-base font-bold text-white">Find an existing ticket</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  On a new device or cleared your browser? Enter the ticket number and access code you were given when you opened it.
                </p>
              </div>
            </div>

            {lookupError && (
              <div className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-xs text-red-400 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{lookupError}</span>
              </div>
            )}

            <form onSubmit={handleLookupSubmit} className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Ticket Number
                  </label>
                  <input
                    type="text"
                    value={lookupTicketId}
                    onChange={(e) => setLookupTicketId(e.target.value)}
                    placeholder="TCK-12345"
                    className="w-full px-3.5 py-2.5 bg-[#121216] border border-[#27272a] focus:border-[#ef233c] text-white text-sm rounded-lg placeholder-zinc-600 focus:outline-none font-mono transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Access Code
                  </label>
                  <input
                    type="text"
                    value={lookupAccessCode}
                    onChange={(e) => setLookupAccessCode(e.target.value)}
                    placeholder="Paste your access code"
                    className="w-full px-3.5 py-2.5 bg-[#121216] border border-[#27272a] focus:border-[#ef233c] text-white text-sm rounded-lg placeholder-zinc-600 focus:outline-none font-mono transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1c1c22] hover:bg-[#272730] text-zinc-200 hover:text-white border border-[#2e2e38] font-medium text-sm rounded-lg transition-colors"
                >
                  Open my ticket
                </button>

                {/* Convenient demo fill */}
                <button
                  type="button"
                  onClick={() => {
                    setLookupTicketId('TCK-91351');
                    setLookupAccessCode('999999999');
                    sounds.playPop();
                  }}
                  className="text-xs text-zinc-500 hover:text-[#ef233c] underline transition-colors"
                >
                  Fill demo ticket (TCK-91351)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
