"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import { theme } from "@/lib/theme";

type CardVariant = "default" | "highlight" | "flat";

interface CardProps {
  variant?: CardVariant;
  hoverable?: boolean;
  className?: string;
  children: ReactNode;
}

/** Container do design system. Variantes: default, highlight, flat. */
export function Card({
  variant = "default",
  hoverable = true,
  className,
  children,
}: CardProps) {
  const [hovered, setHovered] = useState(false);

  // Espaçamento/raio aplicados via inline para garantir o respiro interno
  // independentemente da geração de classes do Tailwind.
  const base: CSSProperties = { borderRadius: 18, padding: 32 };

  if (variant === "highlight") {
    return (
      <motion.div
        whileHover={hoverable ? { scale: 1.02 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={className}
        style={{
          ...base,
          backgroundImage: theme.gradients.cardGradient,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === "flat") {
    return (
      <div
        className={className}
        style={{ ...base, backgroundColor: theme.colors.card }}
      >
        {children}
      </div>
    );
  }

  const active = hoverable && hovered;
  const style: CSSProperties = {
    ...base,
    backgroundColor: active ? theme.colors.cardHover : theme.colors.card,
    border: `1px solid ${active ? theme.colors.border : theme.colors.borderF}`,
    boxShadow: active ? `0 12px 40px ${theme.colors.border}` : "none",
    transform: active ? "translateY(-4px)" : "none",
    transition: "all 0.3s ease",
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}
