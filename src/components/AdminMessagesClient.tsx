"use client";

import { useState } from "react";

interface Message {
  id: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function AdminMessagesClient({ messages: initial }: { messages: Message[] }) {
  const [messages, setMessages] = useState(initial);

  const unread = messages.filter((m) => !m.read).length;

  async function handleMarkRead(id: string) {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    if (res.ok) {
      setMessages(messages.map((m) => m.id === id ? { ...m, read: true } : m));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce message ?")) return;
    const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessages(messages.filter((m) => m.id !== id));
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-warm-brown mb-2">Messages</h1>
      <p className="text-warm-gray mb-8">
        {messages.length} messages — <span className="text-coral font-medium">{unread} non lu{unread > 1 ? "s" : ""}</span>
      </p>

      {messages.length === 0 ? (
        <p className="text-center text-warm-gray py-8">Aucun message pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-2xl p-6 hover:shadow-md transition-shadow ${
                !msg.read ? "border-l-4 border-coral" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  {!msg.read && <div className="w-3 h-3 bg-coral rounded-full flex-shrink-0 animate-pulse" />}
                  <div>
                    <p className="font-semibold text-warm-brown">{msg.from_name}</p>
                    <p className="text-sm text-warm-gray">{msg.from_email}</p>
                  </div>
                </div>
                <span className="text-xs text-warm-gray">
                  {new Date(msg.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>

              <h3 className="font-semibold text-warm-brown mb-2">{msg.subject}</h3>
              <p className="text-sm text-warm-gray leading-relaxed">{msg.message}</p>

              <div className="flex gap-3 mt-4 pt-3 border-t border-cream-dark">
                <a
                  href={`mailto:${msg.from_email}?subject=Re: ${msg.subject}`}
                  className="text-sm font-medium bg-gradient-to-r from-coral to-magenta text-white px-5 py-2 rounded-full hover:shadow-md transition-all"
                >
                  Répondre
                </a>
                {!msg.read && (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    className="text-sm font-medium text-warm-gray hover:text-warm-brown transition-colors"
                  >
                    Marquer comme lu
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-sm font-medium text-warm-gray hover:text-coral transition-colors ml-auto"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
