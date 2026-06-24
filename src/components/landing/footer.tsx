import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import { Logo } from "@/components/ui/logo";

/** Rodapé da landing. */
export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: theme.colors.bg,
        borderTop: `1px solid ${theme.colors.borderF}`,
        padding: "36px 24px",
      }}
    >
      <div
        className="mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between"
        style={{ width: "100%", maxWidth: "min(1440px, 92vw)" }}
      >
        <div className="flex items-center gap-3">
          <Logo variant="selo" height={40} />
          <span
            className="font-body"
            style={{ fontSize: 14, color: theme.colors.muted }}
          >
            {CONFIG.brand.tagline}
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {CONFIG.footer.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="font-body"
              style={{ fontSize: 14, color: theme.colors.muted }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p
          className="font-body"
          style={{ fontSize: 13, color: theme.colors.muted }}
        >
          {CONFIG.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
