"use client";

import { useEffect, useState } from "react";
import { useScrollY } from "@/hooks/use-scroll-y";
import { theme } from "@/lib/theme";

/** Barra de progresso de leitura no topo da página. */
export function ScrollProgress() {
  const scrollY = useScrollY();
  const [scrollable, setScrollable] = useState(0);

  useEffect(() => {
    const update = () =>
      setScrollable(
        document.documentElement.scrollHeight - window.innerHeight,
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const progress = scrollable > 0 ? Math.min(scrollY / scrollable, 1) : 0;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          backgroundImage: theme.gradients.accentGradient,
          boxShadow: `0 0 10px ${theme.colors.accent}`,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
