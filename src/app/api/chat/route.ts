import { NextResponse } from "next/server";
import { CONFIG } from "@/lib/config";
import type { ChatMessage } from "@/types";

/**
 * Endpoint do chat.
 *
 * O comportamento é decidido por `CONFIG.chat.mode`. Hoje ("simulated") resolve
 * a resposta por palavra-chave. Para virar IA real ou atendimento humano, basta
 * trocar a lógica AQUI — o widget (`src/components/chat/`) NÃO muda, pois o
 * contrato de entrada ({ messages }) e saída ({ reply }) permanece o mesmo.
 */
function resolveSimulatedReply(userText: string): string {
  const text = userText.toLowerCase();

  for (const entry of CONFIG.chat.simulatedReplies) {
    if (entry.keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      return entry.reply;
    }
  }

  return CONFIG.chat.defaultReply;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages: ChatMessage[] };
    const messages = body.messages ?? [];
    const lastUserMessage =
      [...messages].reverse().find((message) => message.role === "user")
        ?.content ?? "";

    // Tipado como string para permitir os outros modos no futuro sem erro de TS.
    const mode: string = CONFIG.chat.mode;

    if (mode === "simulated") {
      // Pequeno delay artificial pra parecer digitação real.
      await new Promise((resolve) =>
        setTimeout(resolve, 600 + Math.random() * 400),
      );

      const reply = lastUserMessage
        ? resolveSimulatedReply(lastUserMessage)
        : CONFIG.chat.greeting;

      return NextResponse.json({ reply });
    }

    // ──────────────────────────────────────────────────────────────
    // FUTURO: mode === "ai"
    //   Aqui entraria a chamada à Anthropic API (Claude), por ex.:
    //
    //   const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    //   const completion = await anthropic.messages.create({
    //     model: "claude-...",
    //     system: "Você é o assistente do personal João Paulo...",
    //     messages: messages.map((m) => ({ role: m.role, content: m.content })),
    //   });
    //   return NextResponse.json({ reply: completion.content[0].text });
    // ──────────────────────────────────────────────────────────────

    // ──────────────────────────────────────────────────────────────
    // FUTURO: mode === "human"
    //   Aqui a mensagem entraria numa fila de atendimento (ex.: persistir em DB,
    //   notificar via WhatsApp Business / websocket) e retornaria um ack:
    //
    //   await enqueueHumanHandoff({ messages });
    //   return NextResponse.json({ reply: "Já chamei o João Paulo, ele te responde já já!" });
    // ──────────────────────────────────────────────────────────────

    return NextResponse.json({ reply: CONFIG.chat.defaultReply });
  } catch {
    return NextResponse.json(
      {
        reply: `Tive um probleminha técnico aqui 😅 Me chama direto no WhatsApp: ${CONFIG.personal.whatsapp}`,
      },
      { status: 200 },
    );
  }
}
