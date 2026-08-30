import { useEffect, useState } from "react";
import { ClockTime } from "@/components/clock";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function hourLabel(hour: number) {
  if (hour >= 5 && hour < 11) return "Poranek w Ogrodzie";
  if (hour >= 12 && hour < 17) return "Popołudnie na Mazurach";
  if (hour >= 20 && hour < 23) return "Zachód nad Bałtykiem";
  return "Wieczór w Karkonoszach";
}

export function NowMoment() {
  const [now, setNow] = useState<{ time: string; label: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const date = new Date();
      setNow({
        time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
        label: hourLabel(date.getHours()),
      });
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className="font-mono text-2xs uppercase tracking-caps text-fg/80">
        Zapachy do domu inspirowane miejscami i godzinami
      </span>
    );
  }

  return (
    <span className="font-mono text-2xs uppercase tracking-caps text-fg/80">
      Teraz <ClockTime time={now.time} /> — {now.label}
    </span>
  );
}
