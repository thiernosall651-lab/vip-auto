import { CalendarCheck, Send, Wrench, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppointment } from "../lib/appointment";
import { assistantGreeting, getAssistantReply, type AssistantReply } from "../lib/assistant/engine";

type Message = AssistantReply & { id: number; role: "assistant" | "user" };

let messageId = 0;
function createMessage(role: "assistant" | "user", reply: AssistantReply): Message {
  messageId += 1;
  return { id: messageId, role, ...reply };
}

export function MalikAssistant(): JSX.Element {
  const { openAppointment } = useAppointment();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([createMessage("assistant", assistantGreeting)]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  function send(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    if (/prendre rendez/i.test(trimmed)) {
      openAppointment();
      return;
    }
    const reply = getAssistantReply(trimmed);
    setMessages((current) => [...current, createMessage("user", { text: trimmed }), createMessage("assistant", reply)]);
    setInput("");
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-black text-white shadow-soft transition hover:bg-signal hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2"
        aria-label="Ouvrir l'assistant Malik Auto"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-signal">
          <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="hidden sm:inline">Malik Auto</span>
      </button>
    );
  }

  const lastAssistant = [...messages].reverse().find((message) => message.role === "assistant");

  return (
    <div
      className="fixed bottom-4 left-4 z-50 flex h-[520px] max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl"
      role="dialog"
      aria-label="Assistant Malik Auto"
    >
      <div className="flex items-center gap-3 border-b border-slate-200 bg-ink px-4 py-3 text-white">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-signal">
          <Wrench className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black leading-none">Malik Auto</p>
          <p className="mt-0.5 text-xs text-slate-300">Assistant expert · VIP AUTO Dakar</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="inline-flex h-8 w-8 items-center justify-center rounded text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
        {messages.map((message) => (
          <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-6 ${
                message.role === "user" ? "bg-ink text-white" : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              <p className="whitespace-pre-line">{message.text}</p>
              {message.role === "assistant" && message.suggestBooking ? (
                <button
                  type="button"
                  onClick={() => openAppointment(message.service ? { service: message.service } : undefined)}
                  className="mt-2 inline-flex items-center gap-1.5 rounded bg-signal px-3 py-1.5 text-xs font-black uppercase tracking-normal text-white transition hover:bg-red-700"
                >
                  <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Prendre rendez-vous
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {lastAssistant?.quickReplies && lastAssistant.quickReplies.length > 0 ? (
        <div className="flex flex-wrap gap-2 border-t border-slate-200 bg-white px-3 py-2">
          {lastAssistant.quickReplies.map((quick) => (
            <button
              key={quick}
              type="button"
              onClick={() => send(quick)}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs font-bold text-slate-600 transition hover:border-signal hover:text-signal"
            >
              {quick}
            </button>
          ))}
        </div>
      ) : null}

      <form
        className="flex items-center gap-2 border-t border-slate-200 p-3"
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
      >
        <input
          className="min-h-10 flex-1 rounded border border-slate-300 px-3 text-sm outline-none transition focus:border-signal focus:ring-2 focus:ring-red-100"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Décrivez le problème…"
          aria-label="Votre message"
        />
        <button
          type="submit"
          className="inline-flex h-10 w-10 flex-none items-center justify-center rounded bg-ink text-white transition hover:bg-signal disabled:bg-slate-300"
          disabled={!input.trim()}
          aria-label="Envoyer"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
