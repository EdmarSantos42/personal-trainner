"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import type { PlanPeriod } from "@/types";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Plan = (typeof CONFIG.plans)[number];

const PERIODS: { id: PlanPeriod; label: string }[] = [
  { id: "monthly", label: "Mensal" },
  { id: "quarterly", label: "Trimestral" },
  { id: "annual", label: "Anual" },
];

const DISCOUNT: Record<PlanPeriod, string | null> = {
  monthly: null,
  quarterly: "−14%",
  annual: "−33%",
};

function PlanCard({
  plan,
  period,
  onChoose,
}: {
  plan: Plan;
  period: PlanPeriod;
  onChoose: (planName: string) => void;
}) {
  const disabled = plan.disabledFeatures as readonly number[];
  const discount = DISCOUNT[period];

  const handleClick = () => onChoose(plan.name);

  return (
    <div className="relative h-full">
      <Card
        variant={plan.highlight ? "highlight" : "default"}
        className="relative flex h-full flex-col"
      >
        {/* Slot do selo — reserva altura em todos os cards para alinhar o conteúdo
            e evita que o selo flutue por cima do toggle de período. */}
        <div
          className="flex justify-center"
          style={{ minHeight: 24, marginBottom: 12 }}
        >
          {plan.highlight && "badge" in plan ? (
            <span
              className="font-body"
              style={{
                padding: "4px 14px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                whiteSpace: "nowrap",
                color: theme.colors.bg,
                backgroundImage: theme.gradients.accentGradient,
              }}
            >
              {plan.badge}
            </span>
          ) : null}
        </div>

        {discount ? (
          <span
            className="font-body"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              padding: "3px 10px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              color: theme.colors.accent,
              backgroundColor: "rgba(0,212,255,0.1)",
            }}
          >
            {discount}
          </span>
        ) : null}

        <h3
          style={{
            fontFamily: theme.fonts.display,
            fontSize: 26,
            color: theme.colors.white,
          }}
        >
          {plan.name}
        </h3>
        <p
          className="font-body"
          style={{ fontSize: 13, color: theme.colors.muted, marginTop: 4 }}
        >
          {plan.sub}
        </p>

        <div className="flex items-end gap-1" style={{ margin: "20px 0" }}>
          <span style={{ fontFamily: theme.fonts.display, fontSize: 56, lineHeight: 1, color: theme.colors.white }}>
            R${plan.prices[period]}
          </span>
          <span className="font-body" style={{ fontSize: 14, color: theme.colors.muted, paddingBottom: 8 }}>
            /mês
          </span>
        </div>

        <ul className="flex flex-col gap-3" style={{ marginBottom: 28 }}>
          {plan.features.map((feature, i) => {
            const isOff = disabled.includes(i);
            return (
              <li key={feature} className="flex items-center gap-2 font-body" style={{ fontSize: 14 }}>
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    flexShrink: 0,
                    backgroundColor: isOff ? theme.colors.borderF : "rgba(0,212,255,0.1)",
                  }}
                >
                  <Check size={12} color={isOff ? theme.colors.muted : theme.colors.accent} />
                </span>
                <span
                  style={{
                    color: isOff ? theme.colors.muted : theme.colors.white,
                    textDecoration: isOff ? "line-through" : "none",
                    opacity: isOff ? 0.6 : 1,
                  }}
                >
                  {feature}
                </span>
              </li>
            );
          })}
        </ul>

        <Button
          variant={plan.highlight ? "primary" : "secondary"}
          size="md"
          className="w-full"
          onClick={handleClick}
        >
          {plan.cta}
        </Button>
      </Card>
    </div>
  );
}

interface PricingProps {
  /** Chamado quando o usuário escolhe um plano (abre o chat com o plano em contexto). */
  onChoosePlan: (planName: string) => void;
}

/** Seção de planos com toggle de período. */
export function Pricing({ onChoosePlan }: PricingProps) {
  const [period, setPeriod] = useState<PlanPeriod>("monthly");

  return (
    <section
      id="planos"
      style={{ backgroundColor: theme.colors.bg2, padding: "96px 24px" }}
    >
      <div style={{ width: "100%", maxWidth: "min(1440px, 92vw)", margin: "0 auto" }}>
        <SectionHeader
          align="center"
          eyebrow="Investimento"
          title="ESCOLHA SEU"
          titleAccent="PLANO"
        />

        <div className="flex justify-center" style={{ marginTop: 36 }}>
          <div
            className="inline-flex gap-1"
            style={{
              padding: 4,
              borderRadius: 999,
              backgroundColor: theme.colors.card,
              border: `1px solid ${theme.colors.borderF}`,
            }}
          >
            {PERIODS.map((p) => {
              const active = period === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPeriod(p.id)}
                  className="font-body"
                  style={{
                    padding: "8px 18px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                    color: active ? theme.colors.bg : theme.colors.muted,
                    backgroundImage: active ? theme.gradients.accentGradient : "none",
                    transition: "all 0.25s ease",
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ marginTop: 72, gap: 40, alignItems: "stretch" }}
        >
          {CONFIG.plans.map((plan) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              period={period}
              onChoose={onChoosePlan}
            />
          ))}
        </div>

        <p
          className="font-body"
          style={{
            marginTop: 32,
            textAlign: "center",
            fontSize: 13,
            color: theme.colors.muted,
          }}
        >
          Primeira conversa gratuita e sem compromisso · Cancele quando quiser
        </p>
      </div>
    </section>
  );
}
