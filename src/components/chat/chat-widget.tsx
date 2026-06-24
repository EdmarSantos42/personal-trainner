"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import type { ChatMessage, Lead } from "@/types";
import { Logo } from "@/components/ui/logo";

interface ChatWidgetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Plano recomendado pelo quiz (quando o usuário chega pelo quiz). */
  quizResult?: string | null;
  /** Plano escolhido diretamente na tabela de preços. Tem prioridade sobre o quiz. */
  chosenPlan?: string | null;
}

/** Salva o plano de interesse no lead (sessionStorage) sem sobrescrever nome/whatsapp. */
function persistPlanToLead(plan: string) {
  try {
    const raw = sessionStorage.getItem("jp_lead");
    const lead: Lead = raw
      ? (JSON.parse(raw) as Lead)
      : { source: "chat", createdAt: new Date().toISOString() };
    lead.recommendedPlan = plan;
    if (!lead.createdAt) lead.createdAt = new Date().toISOString();
    sessionStorage.setItem("jp_lead", JSON.stringify(lead));
  } catch {
    // ignora erros de storage
  }
}

/**
 * Atualiza (ou cria) o lead em sessionStorage quando detecta nome ou WhatsApp.
 * Só persistência local nesta fase — o endpoint /api/leads vem na fase plataforma.
 */
function captureLead(text: string) {
  try {
    const raw = sessionStorage.getItem("jp_lead");
    const lead: Lead = raw
      ? (JSON.parse(raw) as Lead)
      : { source: "chat", createdAt: new Date().toISOString() };

    let changed = false;

    const nameMatch = text.match(
      /(?:meu nome é|me chamo|sou o|sou a)\s+([A-Za-zÀ-ÿ]+)/i,
    );
    if (nameMatch?.[1]) {
      lead.name = nameMatch[1];
      changed = true;
    }

    const digits = text.replace(/\D/g, "");
    if (digits.length >= 10 && digits.length <= 11) {
      lead.whatsapp = digits;
      changed = true;
    }

    if (changed) {
      lead.source = "chat";
      sessionStorage.setItem("jp_lead", JSON.stringify(lead));
    }
  } catch {
    // sessionStorage indisponível — ignora silenciosamente.
  }
}

/** Widget de chat flutuante (simulado nesta fase). */
export function ChatWidget({
  open,
  onOpenChange,
  quizResult,
  chosenPlan,
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: CONFIG.chat.greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProactive, setShowProactive] = useState(false);

  const hasOpenedRef = useRef(false);
  const lastContextRef = useRef<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Marca como aberto e esconde a proativa.
  useEffect(() => {
    if (open) {
      hasOpenedRef.current = true;
      setShowProactive(false);
    }
  }, [open]);

  // Saudação contextual ao abrir: plano escolhido na tabela tem prioridade
  // sobre a recomendação do quiz. Evita repetir as perguntas iniciais.
  useEffect(() => {
    if (!open) return;

    const plan = chosenPlan ?? quizResult;
    if (!plan) return;

    const context = chosenPlan ? `plan:${chosenPlan}` : `quiz:${quizResult}`;
    if (lastContextRef.current === context) return;
    lastContextRef.current = context;

    const template = chosenPlan
      ? CONFIG.chat.planGreeting
      : CONFIG.chat.quizGreeting;
    setMessages([
      { role: "assistant", content: template.replace("{plan}", plan) },
    ]);
    persistPlanToLead(plan);
  }, [open, quizResult, chosenPlan]);

  // Bolha proativa após o delay, se o chat nunca foi aberto.
  useEffect(() => {
    if (open || hasOpenedRef.current) return;
    const timer = setTimeout(() => {
      if (!hasOpenedRef.current) setShowProactive(true);
    }, CONFIG.chat.proactiveDelay);
    return () => clearTimeout(timer);
  }, [open]);

  // Scroll automático para o fim.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    captureLead(text);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = (await res.json()) as { reply: string };
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Tive um probleminha aqui 😅 Me chama direto no WhatsApp: ${CONFIG.personal.whatsapp}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Bolha proativa ───────────────────────────── */}
      {showProactive && !open ? (
        <button
          type="button"
          onClick={() => onOpenChange(true)}
          className="font-body"
          style={{
            position: "fixed",
            bottom: 92,
            right: 24,
            zIndex: 1000,
            maxWidth: 230,
            textAlign: "left",
            padding: "12px 14px",
            borderRadius: 14,
            backgroundColor: theme.colors.card,
            border: `1px solid ${theme.colors.border}`,
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            animation: "fadein 0.4s ease",
          }}
        >
          <p style={{ fontSize: 14, fontWeight: 600, color: theme.colors.white }}>
            Ei! 👋
          </p>
          <p style={{ fontSize: 13, color: theme.colors.muted, marginTop: 2 }}>
            {CONFIG.chat.proactiveMessage}
          </p>
          <span
            style={{
              position: "absolute",
              bottom: -6,
              right: 22,
              width: 12,
              height: 12,
              transform: "rotate(45deg)",
              backgroundColor: theme.colors.card,
              borderRight: `1px solid ${theme.colors.border}`,
              borderBottom: `1px solid ${theme.colors.border}`,
            }}
          />
        </button>
      ) : null}

      {/* ── Painel ───────────────────────────────────── */}
      {open ? (
        <div
          className="flex flex-col"
          style={{
            position: "fixed",
            bottom: 92,
            right: 24,
            zIndex: 1000,
            width: "min(340px, 90vw)",
            maxHeight: 520,
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: theme.colors.card,
            border: `1px solid ${theme.colors.border}`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3"
            style={{
              padding: "14px 16px",
              backgroundColor: theme.colors.bg2,
              borderBottom: `1px solid ${theme.colors.borderF}`,
            }}
          >
            <Logo variant="selo" height={36} />
            <div className="flex flex-col">
              <span
                className="font-body"
                style={{ fontSize: 14, fontWeight: 600, color: theme.colors.white }}
              >
                {CONFIG.personal.name}
              </span>
              <span
                className="font-body"
                style={{ fontSize: 12, color: theme.colors.accent }}
              >
                ● Online agora
              </span>
            </div>
          </div>

          {/* Mensagens */}
          <div
            className="flex flex-col"
            style={{
              flexGrow: 1,
              overflowY: "auto",
              padding: 16,
              gap: 12,
              maxHeight: 320,
            }}
          >
            {messages.map((message, i) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={i}
                  className="font-body"
                  style={{
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    maxWidth: "82%",
                    padding: "10px 13px",
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: isUser ? theme.colors.bg : theme.colors.white,
                    backgroundColor: isUser ? undefined : theme.colors.bg2,
                    backgroundImage: isUser ? theme.gradients.accentGradient : undefined,
                    borderRadius: isUser ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  }}
                >
                  {message.content}
                </div>
              );
            })}

            {loading ? (
              <div
                className="flex items-center gap-1"
                style={{
                  alignSelf: "flex-start",
                  padding: "12px 14px",
                  borderRadius: "12px 12px 12px 2px",
                  backgroundColor: theme.colors.bg2,
                }}
              >
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: theme.colors.accent,
                      animation: "bounce 1s infinite",
                      animationDelay: `${dot * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            ) : null}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2"
            style={{
              padding: 12,
              backgroundColor: theme.colors.bg2,
              borderTop: `1px solid ${theme.colors.borderF}`,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder={CONFIG.chat.placeholder}
              className="font-body"
              style={{
                flexGrow: 1,
                padding: "10px 12px",
                fontSize: 14,
                color: theme.colors.white,
                backgroundColor: theme.colors.card,
                border: `1px solid ${theme.colors.borderF}`,
                borderRadius: 10,
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={!input.trim() || loading}
              aria-label="Enviar"
              className="flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                flexShrink: 0,
                borderRadius: "50%",
                backgroundImage: theme.gradients.accentGradient,
                color: theme.colors.bg,
                opacity: !input.trim() || loading ? 0.5 : 1,
                cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                transition: "opacity 0.2s ease",
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : null}

      {/* ── Botão flutuante ──────────────────────────── */}
      <button
        type="button"
        aria-label={open ? "Fechar chat" : "Abrir chat"}
        onClick={() => {
          setShowProactive(false);
          onOpenChange(!open);
        }}
        className="flex items-center justify-center"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundImage: theme.gradients.accentGradient,
          color: theme.colors.bg,
          boxShadow: "0 8px 30px rgba(0,212,255,0.45)",
          transition: "transform 0.2s ease",
        }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}
