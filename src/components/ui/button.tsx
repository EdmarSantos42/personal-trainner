"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "navy";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const SIZES: Record<ButtonSize, CSSProperties> = {
  sm: { padding: "8px 16px", fontSize: "13px" },
  md: { padding: "12px 24px", fontSize: "15px" },
  lg: { padding: "16px 32px", fontSize: "17px" },
};

function baseStyle(variant: ButtonVariant, hovered: boolean): CSSProperties {
  switch (variant) {
    case "primary":
      return {
        backgroundImage: theme.gradients.accentGradient,
        color: theme.colors.bg,
        fontWeight: 700,
        boxShadow: hovered ? "0 6px 28px rgba(0,212,255,0.4)" : "none",
      };
    case "secondary":
      return {
        backgroundColor: "transparent",
        color: theme.colors.white,
        border: `1px solid ${
          hovered ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.16)"
        }`,
      };
    case "ghost":
      return {
        backgroundColor: "transparent",
        color: hovered ? theme.colors.white : theme.colors.muted,
      };
    case "navy":
      return {
        backgroundImage: theme.gradients.navyGradient,
        color: theme.colors.white,
        boxShadow: hovered ? "0 6px 24px rgba(27,40,82,0.6)" : "none",
      };
  }
}

/** Botão do design system. Variantes: primary, secondary, ghost, navy. */
export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  className,
  type = "button",
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-body font-medium",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      style={{
        ...SIZES[size],
        ...baseStyle(variant, hovered && !disabled),
        borderRadius: "5px",
        transition: "all 0.25s ease",
      }}
    >
      {children}
    </button>
  );
}
