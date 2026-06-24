"use client";

import { useInView } from "@/hooks/use-in-view";
import { useCounter } from "@/hooks/use-counter";
import { theme } from "@/lib/theme";
import { GradientText } from "./gradient-text";

interface CounterProps {
  value: number;
  suffix: string;
  label: string;
}

/** Número animado (Bebas Neue) com rótulo. Dispara ao entrar na viewport. */
export function Counter({ value, suffix, label }: CounterProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.5 });
  const count = useCounter(value, isInView);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span style={{ fontFamily: theme.fonts.display, fontSize: "48px", lineHeight: 1 }}>
        <GradientText>
          {count}
          {suffix}
        </GradientText>
      </span>
      <span
        className="font-body text-xs uppercase"
        style={{ color: theme.colors.muted, letterSpacing: "3px" }}
      >
        {label}
      </span>
    </div>
  );
}
