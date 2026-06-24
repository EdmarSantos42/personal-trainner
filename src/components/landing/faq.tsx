"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeIn } from "@/components/ui/fade-in";

/** Seção de perguntas frequentes (accordion). */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" style={{ backgroundColor: theme.colors.bg, padding: "96px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <SectionHeader
          align="center"
          eyebrow="Dúvidas"
          title="PERGUNTAS"
          titleAccent="FREQUENTES"
        />

        <div className="mt-12 flex flex-col gap-3">
          {CONFIG.faq.map((item, i) => {
            const open = openIndex === i;
            return (
              <FadeIn key={item.q} delay={i * 80}>
                <div
                  style={{
                    borderRadius: 14,
                    backgroundColor: theme.colors.card,
                    border: `1px solid ${open ? theme.colors.accent : theme.colors.borderF}`,
                    transition: "border-color 0.3s ease",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 text-left font-body"
                    style={{ padding: "22px 26px", color: theme.colors.white, fontSize: 15, fontWeight: 600 }}
                  >
                    {item.q}
                    <ChevronDown
                      size={20}
                      color={open ? theme.colors.accent : theme.colors.muted}
                      style={{
                        flexShrink: 0,
                        transform: open ? "rotate(180deg)" : "none",
                        transition: "transform 0.35s ease",
                      }}
                    />
                  </button>

                  <div
                    style={{
                      maxHeight: open ? 360 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.35s ease",
                    }}
                  >
                    <p
                      className="font-body"
                      style={{
                        padding: "0 26px 22px",
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: theme.colors.muted,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
