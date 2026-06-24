import Image from "next/image";
import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";
import { Logo } from "@/components/ui/logo";

const { personal } = CONFIG;

/** Seção "sobre" — apresentação do João Paulo. */
export function About() {
  return (
    <section
      id="sobre"
      style={{ backgroundColor: theme.colors.bg, padding: "96px 24px" }}
    >
      <div
        className="mx-auto grid grid-cols-1 items-center md:grid-cols-2"
        style={{ width: "100%", maxWidth: "min(1440px, 92vw)", gap: 64 }}
      >
        {/* ── Coluna esquerda: foto / placeholder ──────── */}
        <FadeIn direction="left">
          {personal.photoUrl ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                maxHeight: 480,
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${theme.colors.borderF}`,
              }}
            >
              <Image
                src={personal.photoUrl}
                alt={personal.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                maxHeight: 480,
                margin: "0 auto",
                borderRadius: 16,
                overflow: "hidden",
                backgroundImage: theme.gradients.cardGradient,
                border: `1px solid ${theme.colors.borderF}`,
              }}
            >
              <div
                className="grain-bg"
                style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }}
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
              <div
                className="flex h-full flex-col items-center justify-center gap-4"
                style={{ position: "relative" }}
              >
                <Logo variant="selo" height={110} />
                <span
                  className="font-body"
                  style={{
                    fontSize: 13,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: theme.colors.muted,
                  }}
                >
                  Foto em breve
                </span>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: 16,
                  right: 16,
                  bottom: 16,
                  padding: "14px 18px",
                  borderRadius: 12,
                  backgroundColor: theme.colors.card,
                  border: `1px solid ${theme.colors.borderF}`,
                }}
              >
                <p
                  className="font-body"
                  style={{ fontSize: 13, fontWeight: 600, color: theme.colors.white }}
                >
                  {personal.cref}
                </p>
                <p
                  className="font-body"
                  style={{ fontSize: 12, color: theme.colors.muted }}
                >
                  {personal.title}
                </p>
              </div>
            </div>
          )}
        </FadeIn>

        {/* ── Coluna direita: texto ────────────────────── */}
        <div className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="Quem vai te acompanhar"
            title={personal.firstName}
            titleAccent={personal.lastName}
          />

          <p
            className="font-body"
            style={{ fontSize: 16, lineHeight: 1.8, color: theme.colors.muted }}
          >
            {personal.bio}
          </p>

          <blockquote
            className="font-body"
            style={{
              borderLeft: `3px solid ${theme.colors.accent}`,
              paddingLeft: 18,
              fontStyle: "italic",
              color: theme.colors.white,
              lineHeight: 1.7,
            }}
          >
            {personal.quote}
          </blockquote>

          <ul className="flex flex-col gap-3">
            {personal.credentials.map((credential, i) => (
              <FadeIn key={credential} delay={i * 100}>
                <li
                  className="flex items-center gap-3 font-body"
                  style={{ fontSize: 14, color: theme.colors.muted }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: theme.colors.accent,
                      flexShrink: 0,
                    }}
                  />
                  {credential}
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
