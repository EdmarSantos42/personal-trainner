"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { HeroSequence } from "./hero-sequence";

interface HeroProps {
  onQuiz: () => void;
  onResults: () => void;
}

const LINE_DELAYS = [0.38, 0.54, 0.7];

/** Seção principal (above the fold) com animações de entrada. */
export function Hero({ onQuiz, onResults }: HeroProps) {
  const { hero } = CONFIG;
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center"
      style={{
        minHeight: "100vh",
        paddingTop: 80,
        overflow: "hidden",
        backgroundColor: "#080D18",
      }}
    >
      {/* ── Vídeo de fundo (frame-a-frame controlado pelo scroll) ── */}
      <HeroSequence targetRef={sectionRef} fill focusY={0.3} />

      {/* ── Scrims: garantem leitura do texto e fundem o vídeo no fundo ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(8,13,24,0.94) 0%, rgba(8,13,24,0.82) 32%, rgba(8,13,24,0.45) 58%, rgba(8,13,24,0.12) 100%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(8,13,24,0.7) 0%, rgba(8,13,24,0) 22%, rgba(8,13,24,0) 55%, #080D18 100%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 78% 35%, rgba(0,212,255,0.10), transparent 45%)",
        }}
      />
      <div
        className="grain-bg"
        style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }}
      />

      {/* ── Conteúdo: texto sobreposto à esquerda ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "min(1440px, 92vw)",
          margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 40px)",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body"
            style={{
              textTransform: "uppercase",
              letterSpacing: "5px",
              fontSize: 12,
              color: theme.colors.accent,
              marginBottom: 24,
            }}
          >
            ─── {hero.eyebrow}
          </motion.p>

          <h1
            style={{
              fontFamily: theme.fonts.display,
              fontSize: "clamp(52px, 9.5vw, 118px)",
              lineHeight: 0.88,
              textShadow: "0 2px 30px rgba(0,0,0,0.5)",
            }}
          >
            {hero.lines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: LINE_DELAYS[i] ?? 0.7 }}
                style={{
                  display: "block",
                  color:
                    i === 0
                      ? theme.colors.white
                      : i === 1
                        ? theme.colors.silver
                        : undefined,
                }}
              >
                {i === 2 ? <GradientText>{line}</GradientText> : line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="font-body"
            style={{
              maxWidth: 520,
              fontSize: 16.5,
              lineHeight: 1.75,
              color: theme.colors.muted,
              marginTop: 28,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex flex-wrap gap-4"
            style={{ marginTop: 40 }}
          >
            <Button variant="primary" size="lg" onClick={onQuiz}>
              Descobrir meu plano
              <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" size="lg" onClick={onResults}>
              Ver resultados
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
