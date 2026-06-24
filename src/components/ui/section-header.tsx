import type { ReactNode } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { GradientText } from "./gradient-text";

type Align = "left" | "center";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: ReactNode;
  align?: Align;
}

/** Cabeçalho padrão de seção: eyebrow + título (Bebas Neue) + subtítulo. */
export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn("flex flex-col gap-4", centered && "items-center text-center")}>
      <p
        className="font-body text-xs font-semibold uppercase tracking-[0.25em]"
        style={{ color: theme.colors.accent }}
      >
        ─── {eyebrow}
      </p>

      <h2
        className="font-display leading-[1.05]"
        style={{
          fontFamily: theme.fonts.display,
          fontSize: "clamp(36px, 6vw, 62px)",
          color: theme.colors.white,
        }}
      >
        {title}
        {titleAccent ? (
          <>
            {" "}
            <GradientText>{titleAccent}</GradientText>
          </>
        ) : null}
      </h2>

      {subtitle ? (
        <p
          className={cn("max-w-2xl font-body text-base", centered && "mx-auto")}
          style={{ color: theme.colors.muted }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
