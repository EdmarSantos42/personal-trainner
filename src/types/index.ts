/**
 * Tipos compartilhados da aplicação.
 *
 * Centralizar tipos aqui evita duplicação e prepara o terreno para a evolução
 * da landing em uma plataforma completa (CRM de leads, chat com IA, etc.).
 */

// ── Chat ───────────────────────────────────────────────────

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ── Leads ──────────────────────────────────────────────────

export interface Lead {
  name?: string;
  whatsapp?: string;
  quizAnswers?: number[];
  recommendedPlan?: string;
  source: "quiz" | "chat";
  createdAt: string;
}

// ── Conteúdo / UI ──────────────────────────────────────────

export type ServiceIcon = "home" | "dumbbell" | "monitor" | "utensils";

export type PlanPeriod = "monthly" | "quarterly" | "annual";
