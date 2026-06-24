"use client";

import type { ReactNode } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
}

/** Texto com gradiente clipado (default: accentGradient da marca). */
export function GradientText({
  children,
  className,
  gradient = theme.gradients.accentGradient,
}: GradientTextProps) {
  return (
    <span
      className={cn("inline-block", className)}
      style={{
        backgroundImage: gradient,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}
