"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import { Logo } from "@/components/ui/logo";

interface HeroSequenceProps {
  /** Seção do hero usada para medir o progresso do scroll. */
  targetRef: RefObject<HTMLElement | null>;
  /**
   * Quando true, o canvas preenche todo o elemento pai (fundo full-bleed),
   * sem caixa 16:9 nem máscara — ideal para vídeo de fundo com texto por cima.
   */
  fill?: boolean;
  /** Viés vertical do enquadramento (0 = topo, 1 = base). Padrão 0.5. */
  focusY?: number;
}

/** Monta o caminho do frame i (com zeros à esquerda). */
function frameSrc(i: number): string {
  return CONFIG.heroMedia.path.replace(
    "{i}",
    String(i).padStart(CONFIG.heroMedia.pad, "0"),
  );
}

/**
 * Máscara que esfuma (feather) as bordas do canvas, fazendo a figura 16:9 se
 * dissolver no fundo em vez de terminar num retângulo duro. A elipse é ampla
 * (passa das bordas) e a transição é longa (42%→100%), deixando as laterais,
 * o topo e a base bem suaves.
 */
const FEATHER =
  "radial-gradient(125% 135% at 50% 44%, #000 42%, rgba(0,0,0,0.45) 72%, rgba(0,0,0,0) 100%)";

/**
 * Animação do hero frame-a-frame controlada pelo scroll (estilo "scrollytelling").
 *
 * Desenha cada frame num <canvas> conforme o usuário rola o hero. No mobile
 * carrega menos frames (amostrados do conjunto) para manter o mesmo movimento
 * sem pesar. Respeita `prefers-reduced-motion`. Enquanto `CONFIG.heroMedia.enabled`
 * for false, mostra um placeholder.
 */
export function HeroSequence({
  targetRef,
  fill = false,
  focusY = 0.5,
}: HeroSequenceProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const indexRef = useRef(0);
  const reducedRef = useRef(false);
  const [ready, setReady] = useState(false);

  const media = CONFIG.heroMedia;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Suaviza o progresso do scroll com uma mola, para o vídeo "escorregar"
  // entre os frames em vez de pular de forma seca/rápida.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.5,
    restDelta: 0.0005,
  });

  // ── Desenha um frame cobrindo o canvas (object-fit: cover) ──
  function draw(index: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    const imgRatio = img.width / img.height;
    const canvasRatio = cw / ch;
    let dw: number;
    let dh: number;
    if (imgRatio > canvasRatio) {
      dh = ch;
      dw = ch * imgRatio;
    } else {
      dw = cw;
      dh = cw / imgRatio;
    }
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) * focusY;
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  // ── Pré-carrega os frames (com amostragem no mobile) ──
  useEffect(() => {
    if (!media.enabled) return;

    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const total = media.frameCount;
    const start = media.start;
    const count = isMobile
      ? Math.min(media.frameCountMobile, total)
      : total;

    // Índices reais dos arquivos (amostrados no mobile), respeitando `start`.
    const indices =
      count <= 1
        ? [start]
        : Array.from({ length: count }, (_, k) =>
            start + Math.round((k / (count - 1)) * (total - 1)),
          );

    let loaded = 0;
    const imgs = indices.map((frameIndex, k) => {
      const img = new Image();
      img.onload = () => {
        loaded += 1;
        // Mostra o primeiro frame assim que ele chega (não espera todos).
        if (k === 0) draw(0);
        // Libera o scrubbing por scroll só quando todos estão prontos.
        if (loaded === indices.length) setReady(true);
      };
      img.src = frameSrc(frameIndex);
      return img;
    });
    imagesRef.current = imgs;
  }, [media]);

  // ── Ajusta a resolução do canvas ao tamanho exibido (retina-aware) ──
  useEffect(() => {
    if (!media.enabled) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      // Redesenha o frame correspondente à posição atual do scroll.
      const frames = imagesRef.current;
      if (frames.length) {
        const p = smoothProgress.get();
        const idx = Math.min(
          frames.length - 1,
          Math.max(0, Math.round(p * (frames.length - 1))),
        );
        indexRef.current = idx;
        draw(idx);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media.enabled, ready]);

  // ── Atualiza o frame conforme o scroll suavizado ──
  useMotionValueEvent(smoothProgress, "change", (progress) => {
    if (!media.enabled || !ready || reducedRef.current) return;
    const frames = imagesRef.current;
    const index = Math.min(
      frames.length - 1,
      Math.max(0, Math.round(progress * (frames.length - 1))),
    );
    if (index !== indexRef.current) {
      indexRef.current = index;
      draw(index);
    }
  });

  // ── Placeholder (enquanto os frames não existem) ──
  if (!media.enabled) {
    return (
      <div
        ref={wrapRef}
        className="relative mx-auto w-full"
        style={{
          aspectRatio: "3 / 4",
          maxHeight: 560,
          borderRadius: 20,
          overflow: "hidden",
          backgroundImage: theme.gradients.cardGradient,
          border: `1px solid ${theme.colors.borderF}`,
        }}
      >
        <div
          className="grain-bg"
          style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundImage: theme.gradients.accentGradient,
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div style={{ animation: "pulse-glow 2.6s ease-in-out infinite", borderRadius: "50%" }}>
            <Logo variant="selo" height={120} />
          </div>
          <span
            className="font-body"
            style={{
              fontSize: 12,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: theme.colors.muted,
            }}
          >
            Demonstração em vídeo em breve
          </span>
        </div>
      </div>
    );
  }

  // ── Modo full-bleed: canvas preenche o pai (fundo do hero) ──
  if (fill) {
    return (
      <div
        ref={wrapRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
        aria-label={media.alt}
        role="img"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ display: "block" }}
        />
      </div>
    );
  }

  // ── Canvas da animação (16:9, horizontal) ──
  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{ aspectRatio: "16 / 9" }}
      aria-label={media.alt}
      role="img"
    >
      {/* Brilho suave atrás da figura, dando profundidade e integrando ao fundo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-6% -4%",
          background:
            "radial-gradient(60% 70% at 52% 46%, rgba(0,212,255,0.16), rgba(74,158,255,0.06) 48%, transparent 72%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <canvas
        ref={canvasRef}
        className="relative h-full w-full"
        style={{
          display: "block",
          WebkitMaskImage: FEATHER,
          maskImage: FEATHER,
        }}
      />
    </div>
  );
}
