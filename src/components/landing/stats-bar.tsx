import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import { Counter } from "@/components/ui/counter";

/** Faixa de números/provas sociais. */
export function StatsBar() {
  return (
    <section
      style={{
        backgroundColor: theme.colors.bg2,
        borderTop: `1px solid ${theme.colors.borderF}`,
        borderBottom: `1px solid ${theme.colors.borderF}`,
        padding: "48px 24px",
      }}
    >
      <div
        className="mx-auto grid grid-cols-2 gap-8 md:grid-cols-4"
        style={{ width: "100%", maxWidth: "min(1440px, 92vw)" }}
      >
        {CONFIG.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <Counter value={stat.value} suffix={stat.suffix} label={stat.label} />
          </div>
        ))}
      </div>
    </section>
  );
}
