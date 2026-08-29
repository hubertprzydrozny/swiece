import { useEffect, useState } from "react";
import { ClockTime } from "@/components/clock";
import { scentForHour } from "@/lib/products";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function NowMoment() {
  const [now, setNow] = useState<{ time: string; name: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const date = new Date();
      const scent = scentForHour(date.getHours());
      setNow({
        time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
        name: scent.name,
      });
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className="font-mono text-2xs uppercase tracking-caps text-fg/80">
        Darmowa dostawa od 199 zł · Ręcznie zalewane w Polsce
      </span>
    );
  }

  return (
    <span className="font-mono text-2xs uppercase tracking-caps text-fg/80">
      Teraz <ClockTime time={now.time} /> — {now.name}
      <span className="mx-3 hidden sm:inline" aria-hidden="true">
        ·
      </span>
      <span className="hidden sm:inline">Darmowa dostawa od 199 zł</span>
    </span>
  );
}
