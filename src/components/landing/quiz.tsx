"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import type { Lead } from "@/types";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";

interface QuizProps {
  onComplete: (answers: number[], recommendation: string) => void;
  onCTAClick: () => void;
}

function QuizOption({
  emoji,
  text,
  onClick,
}: {
  emoji: string;
  text: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 text-left"
      style={{
        padding: "20px 24px",
        borderRadius: 14,
        backgroundColor: hovered ? theme.colors.cardHover : theme.colors.card,
        border: `1px solid ${hovered ? theme.colors.accent : theme.colors.borderF}`,
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 0.25s ease",
      }}
    >
      <span style={{ fontSize: 30 }}>{emoji}</span>
      <span className="font-body" style={{ fontSize: 15, color: theme.colors.white }}>
        {text}
      </span>
    </button>
  );
}

/** Quiz de qualificação de lead (3 perguntas) + recomendação de plano. */
export function Quiz({ onComplete, onCTAClick }: QuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const total = CONFIG.quiz.length;
  const recommendation = CONFIG.quizMap[answers[0] ?? 0] ?? "Essencial";

  const select = (optIndex: number) => {
    const next = [...answers, optIndex];
    setAnswers(next);

    if (step < total - 1) {
      setStep(step + 1);
      return;
    }

    const rec = CONFIG.quizMap[next[0] ?? 0] ?? "Essencial";
    setDone(true);

    const lead: Lead = {
      quizAnswers: next,
      recommendedPlan: rec,
      source: "quiz",
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem("jp_lead", JSON.stringify(lead));
    onComplete(next, rec);
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setDone(false);
  };

  const current = CONFIG.quiz[step];

  return (
    <section
      id="quiz"
      style={{ backgroundColor: theme.colors.bg, padding: "96px 24px" }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {done || !current ? (
          <div className="flex flex-col items-center gap-5 text-center">
            <div
              className="flex items-center justify-center"
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: `2px solid ${theme.colors.accent}`,
              }}
            >
              <Check size={30} color={theme.colors.accent} />
            </div>

            <p
              className="font-body"
              style={{
                textTransform: "uppercase",
                letterSpacing: "3px",
                fontSize: 12,
                color: theme.colors.muted,
              }}
            >
              Seu resultado
            </p>

            <h2
              style={{
                fontFamily: theme.fonts.display,
                fontSize: "clamp(28px, 5vw, 50px)",
                color: theme.colors.white,
                lineHeight: 1.05,
              }}
            >
              Plano ideal: <GradientText>{recommendation}</GradientText>
            </h2>

            <p
              className="font-body"
              style={{
                maxWidth: 460,
                fontSize: 15,
                lineHeight: 1.7,
                color: theme.colors.muted,
              }}
            >
              Com base nas suas respostas, o plano {recommendation} é o que mais
              combina com seu objetivo e rotina. Bora dar o primeiro passo?
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" size="lg" onClick={onCTAClick}>
                Quero começar
              </Button>
              <Button variant="ghost" size="lg" onClick={restart}>
                Refazer
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex gap-2">
              {CONFIG.quiz.map((q, i) => (
                <span
                  key={q.q}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor:
                      i <= step ? theme.colors.accent : theme.colors.borderF,
                    transition: "background-color 0.3s ease",
                  }}
                />
              ))}
            </div>

            <p
              className="font-body"
              style={{
                textTransform: "uppercase",
                letterSpacing: "3px",
                fontSize: 12,
                color: theme.colors.accent,
              }}
            >
              Pergunta {step + 1} de {total}
            </p>

            <h2
              style={{
                fontFamily: theme.fonts.display,
                fontSize: "clamp(28px, 5vw, 50px)",
                color: theme.colors.white,
                lineHeight: 1.05,
              }}
            >
              {current.q}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {current.opts.map((opt, optIndex) => (
                <QuizOption
                  key={opt.t}
                  emoji={opt.e}
                  text={opt.t}
                  onClick={() => select(optIndex)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
