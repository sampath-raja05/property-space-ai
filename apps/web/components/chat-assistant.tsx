"use client";

import { useState } from "react";

export default function ChatAssistant() {
  const [messages, setMessages] = useState<string[]>(["Ask about rental yield or market trends."]);
  const [input, setInput] = useState("");

  return (
    <section className="rounded-xl border border-slate-200 p-4">
      <h2 className="mb-3 text-sm font-semibold">AI Assistant (MVP)</h2>
      <div className="mb-3 h-32 overflow-y-auto rounded-md bg-slate-50 p-2 text-sm">
        {messages.map((msg, i) => (
          <p key={i} className="mb-1">
            {msg}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-md border border-slate-300 p-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a question"
        />
        <button
          className="rounded-md bg-sky-600 px-3 py-2 text-sm text-white"
          onClick={() => {
            if (!input.trim()) return;
            setMessages((prev) => [...prev, `You: ${input}`, "Assistant: Use property detail page to inspect score."]);
            setInput("");
          }}
        >
          Send
        </button>
      </div>
    </section>
  );
}
