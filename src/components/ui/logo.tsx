import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "horizontal" | "selo";
type LogoTheme = "dark" | "light";

interface LogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  height?: number;
  className?: string;
  onClick?: () => void;
}

/** Caminhos dos arquivos em public/ por variante e tema de fundo. */
const SOURCES: Record<LogoVariant, Record<LogoTheme, string>> = {
  horizontal: {
    dark: "/logo-horizontal.png",
    light: "/logo-horizontal-light.png",
  },
  selo: {
    dark: "/logo-selo.png",
    light: "/logo-selo-light.png",
  },
};

/**
 * Proporção aproximada (largura / altura) usada só para reservar espaço e
 * evitar layout shift. O aspect ratio real é preservado por `width: auto`,
 * que deixa o navegador calcular a largura a partir da imagem natural.
 */
const ASPECT: Record<LogoVariant, number> = {
  horizontal: 3.6,
  selo: 1,
};

/** Logo da marca João Paulo (horizontal ou selo, fundo escuro ou claro). */
export function Logo({
  variant = "horizontal",
  theme = "dark",
  height = 36,
  className,
  onClick,
}: LogoProps) {
  const src = SOURCES[variant][theme];
  const alt =
    variant === "horizontal"
      ? "João Paulo · Personal Trainer"
      : "João Paulo";

  return (
    <span
      onClick={onClick}
      className={cn("inline-flex items-center", onClick && "cursor-pointer", className)}
      style={{ height }}
    >
      <Image
        src={src}
        alt={alt}
        width={Math.round(height * ASPECT[variant])}
        height={height}
        priority={variant === "horizontal"}
        style={{ height: "100%", width: "auto" }}
      />
    </span>
  );
}
