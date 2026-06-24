"use client";

import { useEffect, useState } from "react";

/**
 * Conta de 0 até `target` quando `active` vira true (easeOutCubic).
 *
 * @param target   valor final
 * @param active   dispara a animação quando true
 * @param duration duração em ms (default 1500)
 */
export function useCounter(
  target: number,
  active: boolean,
  duration = 1500,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}
