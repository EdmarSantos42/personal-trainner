import { Star } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/ui/fade-in";

/** Seção de depoimentos / resultados. */
export function Testimonials() {
  return (
    <section
      id="resultados"
      style={{ backgroundColor: theme.colors.bg2, padding: "96px 24px" }}
    >
      <div style={{ width: "100%", maxWidth: "min(1440px, 92vw)", margin: "0 auto" }}>
        <SectionHeader
          align="center"
          eyebrow="Resultados reais"
          title="TRANSFORMAÇÕES"
          titleAccent="COMPROVADAS"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
            marginTop: 48,
          }}
        >
          {CONFIG.testimonials.map((item, i) => (
            <FadeIn key={item.name} delay={i * 120}>
              <Card className="flex h-full flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={theme.colors.accent}
                      color={theme.colors.accent}
                    />
                  ))}
                </div>

                <p
                  className="font-body"
                  style={{
                    fontSize: 14,
                    fontStyle: "italic",
                    lineHeight: 1.7,
                    color: theme.colors.white,
                  }}
                >
                  “{item.text}”
                </p>

                <div
                  style={{
                    height: 1,
                    backgroundColor: theme.colors.borderF,
                    margin: "4px 0",
                  }}
                />

                <p
                  className="font-body"
                  style={{ fontSize: 15, fontWeight: 700, color: theme.colors.white }}
                >
                  {item.name}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="accent">{item.goal}</Badge>
                  <Badge variant="muted">{item.result}</Badge>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
