import { Home, Dumbbell, Monitor, Utensils, type LucideIcon } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import type { ServiceIcon } from "@/types";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  home: Home,
  dumbbell: Dumbbell,
  monitor: Monitor,
  utensils: Utensils,
};

/** Seção de modalidades de atendimento. */
export function Services() {
  return (
    <section
      id="servicos"
      style={{ backgroundColor: theme.colors.bg2, padding: "96px 24px" }}
    >
      <div style={{ width: "100%", maxWidth: "min(1440px, 92vw)", margin: "0 auto" }}>
        <SectionHeader
          eyebrow="O que ofereço"
          title="MODALIDADES DE"
          titleAccent="ATENDIMENTO"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginTop: 48,
          }}
        >
          {CONFIG.services.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <FadeIn key={service.title} delay={i * 120}>
                <Card className="h-full">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      backgroundColor: "rgba(0,212,255,0.1)",
                      marginBottom: 20,
                    }}
                  >
                    <Icon size={22} color={theme.colors.accent} />
                  </div>

                  <h3
                    style={{
                      fontFamily: theme.fonts.display,
                      fontSize: 22,
                      color: theme.colors.white,
                      marginBottom: 10,
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="font-body"
                    style={{
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: theme.colors.muted,
                      marginBottom: 18,
                    }}
                  >
                    {service.desc}
                  </p>

                  <ul className="flex flex-col gap-2">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-2 font-body"
                        style={{ fontSize: 13, color: theme.colors.muted }}
                      >
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            backgroundColor: theme.colors.accent,
                            flexShrink: 0,
                          }}
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
