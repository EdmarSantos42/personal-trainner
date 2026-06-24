import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

interface HowItWorksProps {
  onQuizClick: () => void;
}

/** Seção "como funciona" — passos do processo. */
export function HowItWorks({ onQuizClick }: HowItWorksProps) {
  return (
    <section style={{ backgroundColor: theme.colors.bg, padding: "96px 24px" }}>
      <div style={{ width: "100%", maxWidth: "min(1440px, 92vw)", margin: "0 auto" }}>
        <SectionHeader
          align="center"
          eyebrow="O processo"
          title="COMO"
          titleAccent="FUNCIONA"
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CONFIG.steps.map((step, i) => (
            <FadeIn key={step.n} delay={i * 120}>
              <div className="flex flex-col gap-3">
                <span
                  style={{
                    fontFamily: theme.fonts.display,
                    fontSize: 56,
                    lineHeight: 1,
                    color: "rgba(0,212,255,0.12)",
                  }}
                >
                  {step.n}
                </span>
                <span
                  style={{
                    width: 32,
                    height: 2,
                    backgroundColor: theme.colors.accent,
                  }}
                />
                <h3
                  style={{
                    fontFamily: theme.fonts.display,
                    fontSize: 20,
                    color: theme.colors.white,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: 14, lineHeight: 1.7, color: theme.colors.muted }}
                >
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="primary" size="lg" onClick={onQuizClick}>
            Começar pelo quiz
          </Button>
        </div>
      </div>
    </section>
  );
}
