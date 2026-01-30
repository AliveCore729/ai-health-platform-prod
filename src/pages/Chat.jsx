import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi 👋 I’m your AI health assistant. I can explain reports, symptoms, and medical terms. How can I help?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: "ai", text: data.reply }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, I couldn’t respond right now. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full pb-24">

      {/* Disclaimer */}
      <div className="text-xs text-slate-500 bg-slate-100 p-3 rounded-xl mb-3">
        ⚠️ This AI provides general health information only and is not a doctor.
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 px-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "ai" && (
              <Bot className="text-medical-600 mt-1" size={18} />
            )}

            <div
              className={`p-3 rounded-xl max-w-[75%] text-sm ${
                m.role === "user"
                  ? "bg-medical-600 text-white"
                  : "bg-white border shadow-sm"
              }`}
            >
              {m.text}
            </div>

            {m.role === "user" && (
              <User className="text-slate-400 mt-1" size={18} />
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask about symptoms, reports, scans..."
          className="flex-1 border rounded-xl px-3 py-2 text-sm"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-medical-600 text-white p-3 rounded-xl disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
