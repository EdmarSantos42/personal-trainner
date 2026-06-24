import { MessageCircle } from "lucide-react";
import { theme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";

interface FinalCTAProps {
  onQuizClick: () => void;
  onChatClick: () => void;
}

/** Chamada final de conversão. */
export function FinalCTA({ onQuizClick, onChatClick }: FinalCTAProps) {
  return (
    <section
      id="cta"
      style={{
        backgroundColor: theme.colors.bg2,
        borderTop: `1px solid ${theme.colors.borderF}`,
        padding: "112px 24px",
      }}
    >
      <div
        className="flex flex-col items-center gap-6 text-center"
        style={{ maxWidth: 820, margin: "0 auto" }}
      >
        <p
          className="font-body"
          style={{
            textTransform: "uppercase",
            letterSpacing: "4px",
            fontSize: 12,
            color: theme.colors.accent,
          }}
        >
          Pronto pra começar?
        </p>

        <h2
          style={{
            fontFamily: theme.fonts.display,
            fontSize: "clamp(40px, 7vw, 84px)",
            lineHeight: 0.95,
            color: theme.colors.white,
          }}
        >
          SUA
          <br />
          <GradientText>TRANSFORMAÇÃO</GradientText>
          <br />
          COMEÇA AGORA
        </h2>

        <p
          className="font-body"
          style={{ fontSize: 16, color: theme.colors.muted }}
        >
          Primeira conversa gratuita. Sem compromisso.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg" onClick={onQuizClick}>
            Começar agora
          </Button>
          <Button variant="secondary" size="lg" onClick={onChatClick}>
            <MessageCircle size={18} />
            Falar com João Paulo
          </Button>
        </div>
      </div>
    </section>
  );
}
