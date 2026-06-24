import type { CSSProperties, ReactNode } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type BadgeVariant = "accent" | "muted" | "navy";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const VARIANTS: Record<BadgeVariant, CSSProperties> = {
  accent: {
    backgroundColor: "rgba(0,212,255,0.1)",
    color: theme.colors.accent,
  },
  muted: {
    backgroundColor: theme.colors.bg2,
    color: theme.colors.muted,
  },
  navy: {
    backgroundColor: "rgba(27,40,82,0.6)",
    color: theme.colors.silver,
  },
};

/** Etiqueta compacta. Variantes: accent, muted, navy. */
export function Badge({ variant = "accent", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider",
        className,
      )}
      style={VARIANTS[variant]}
    >
      {children}
    </span>
  );
}
