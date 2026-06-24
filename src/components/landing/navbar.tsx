"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { theme } from "@/lib/theme";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useScrollY } from "@/hooks/use-scroll-y";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Barra de navegação fixa com drawer responsivo. */
export function Navbar() {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const scrolled = scrollY > 60;

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 66,
        backgroundColor: scrolled ? "rgba(8,13,24,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: `1px solid ${scrolled ? theme.colors.borderF : "transparent"}`,
        transition: "all 0.4s ease",
      }}
    >
      <nav
        className="mx-auto flex h-full items-center justify-between px-6"
        style={{ width: "100%", maxWidth: "min(1440px, 92vw)" }}
      >
        <Logo variant="horizontal" height={34} onClick={scrollToTop} />

        {/* Links — desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {CONFIG.nav.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                className="font-body text-sm transition-colors"
                style={{ color: theme.colors.muted }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.colors.white;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme.colors.muted;
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA — desktop */}
        <div className="hidden md:block">
          <Button variant="primary" size="sm" onClick={() => go("quiz")}>
            Começar
          </Button>
        </div>

        {/* Hambúrguer — mobile */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          style={{ color: theme.colors.white }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Drawer — mobile */}
      {open ? (
        <div
          className="flex flex-col gap-2 px-6 py-4 md:hidden"
          style={{
            backgroundColor: "rgba(8,13,24,0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: `1px solid ${theme.colors.borderF}`,
          }}
        >
          {CONFIG.nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="py-2 text-left font-body text-base"
              style={{ color: theme.colors.muted }}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => go("quiz")}
            >
              Começar
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
