const STORAGE_KEY = "atlas_saved_tickets_v1";

export const INITIAL_TICKETS = [
  {
    id: "TCK-91351",
    accessCode: "999999999",
    email: "developer@roblox.io",
    topic: "Studio compatibility / bug",
    subject: "999999999 - Sovereign Combat engine replication lag on mobile devices",
    orderNumber: "ORD-91351-RBX",
    priority: "High",
    status: "In progress", // "In progress" matches screenshot 3!
    createdAt: "2026-11-09T14:22:00Z",
    updatedAt: "2026-11-09T15:45:00Z",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        senderName: "You (developer@roblox.io)",
        avatar: "👤",
        content: "Hi ATLAS team! I purchased the Sovereign Combat v3.4 system (Order ORD-91351-RBX). When testing in Studio on PC it runs at a solid 60 FPS, but when simulating a Mobile device with touch controls enabled, the raycast hitboxes seem to have a 120ms replication delay on humanoid ragdolls. Any config flag I should tweak?",
        timestamp: "2026-11-09T14:22:00Z"
      },
      {
        id: "msg-2",
        sender: "staff",
        senderName: "Alex M. (ATLAS Core Engineering)",
        badge: "Lead Engineer",
        avatar: "🛡️",
        content: "Hey there! Thanks for reaching out. We took a look at your build config. In `ReplicatedStorage.Packages.SovereignCombat.Config`, you'll find `RAYCAST_REPLICATION_MODE`. If it's set to 'StrictServer', mobile devices with high ping will experience visual desync before the server acknowledges the ragdoll.\n\nChange it to:\n```lua\nRAYCAST_REPLICATION_MODE = 'ClientPredicted'\nCLIENT_REWIND_WINDOW = 0.150 -- 150ms buffer\n```\nLet us know if this eliminates the delay!",
        timestamp: "2026-11-09T15:05:00Z"
      },
      {
        id: "msg-3",
        sender: "user",
        senderName: "You",
        avatar: "👤",
        content: "That completely fixed the issue! The client predictive rewind feels instantaneous now. Is there also a way to adjust parry window timing?",
        timestamp: "2026-11-09T15:40:00Z"
      },
      {
        id: "msg-4",
        sender: "staff",
        senderName: "Alex M. (ATLAS Core Engineering)",
        badge: "Lead Engineer",
        avatar: "🛡️",
        content: "Glad to hear that fixed it! Yes, check `ParryConfig.Duration` (default is `0.22` seconds). You can safely set it between `0.18` and `0.30` depending on whether you want Souls-like precision or casual action feel. Keep us posted if you need anything else!",
        timestamp: "2026-11-09T15:45:00Z"
      }
    ]
  }
];

export function getSavedTickets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
      return INITIAL_TICKETS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
      return INITIAL_TICKETS;
    }
    return parsed;
  } catch (e) {
    return INITIAL_TICKETS;
  }
}

export function saveTickets(tickets) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch (e) {
    console.error("Failed to save tickets to localStorage", e);
  }
}

export function createNewTicket({ email, topic, subject, message, orderNumber, priority = "Normal", attachments = [] }) {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const ticketId = `TCK-${randomNum}`;
  const accessCode = `sec_${Math.random().toString(36).substring(2, 10)}`;
  const now = new Date().toISOString();

  const newTicket = {
    id: ticketId,
    accessCode,
    email,
    topic,
    subject,
    orderNumber: orderNumber || `ORD-${randomNum}`,
    priority,
    status: "In progress",
    createdAt: now,
    updatedAt: now,
    messages: [
      {
        id: `msg-${Date.now()}-1`,
        sender: "user",
        senderName: `You (${email})`,
        avatar: "👤",
        content: message,
        attachments,
        timestamp: now
      },
      {
        id: `msg-${Date.now()}-2`,
        sender: "system",
        senderName: "ATLAS Automated Dispatcher",
        avatar: "🤖",
        content: `Ticket received! Assigned reference ${ticketId}. Our automated dispatcher has logged your issue under topic: [${topic}]. A dedicated Studio systems specialist will review your request shortly. Keep this tab open or save your access code: ${accessCode}`,
        timestamp: new Date(Date.now() + 1000).toISOString()
      }
    ]
  };

  const existing = getSavedTickets();
  const updated = [newTicket, ...existing];
  saveTickets(updated);

  return newTicket;
}

export function addMessageToTicket(ticketId, { sender, senderName, content, attachments = [] }) {
  const tickets = getSavedTickets();
  const ticketIndex = tickets.findIndex(t => t.id.toLowerCase() === ticketId.toLowerCase());
  if (ticketIndex === -1) return null;

  const ticket = tickets[ticketIndex];
  const now = new Date().toISOString();
  const newMsg = {
    id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    sender,
    senderName,
    avatar: sender === "staff" ? "🛡️" : sender === "system" ? "🤖" : "👤",
    badge: sender === "staff" ? "ATLAS Specialist" : undefined,
    content,
    attachments,
    timestamp: now
  };

  ticket.messages.push(newMsg);
  ticket.updatedAt = now;
  ticket.status = sender === "user" ? "In progress" : "Staff replied";

  tickets[ticketIndex] = ticket;
  saveTickets(tickets);
  return ticket;
}

export function updateTicketStatus(ticketId, newStatus) {
  const tickets = getSavedTickets();
  const ticket = tickets.find(t => t.id.toLowerCase() === ticketId.toLowerCase());
  if (ticket) {
    ticket.status = newStatus;
    ticket.updatedAt = new Date().toISOString();
    saveTickets(tickets);
  }
  return ticket;
}

export const TICKET_TOPICS = [
  "Download issue",
  "Payment verification",
  "Product question",
  "Studio compatibility / bug",
  "Custom work & commissions",
  "Refund request",
  "Other inquiry"
];
