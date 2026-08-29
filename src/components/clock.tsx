import { cn } from "@/lib/utils";

export function ClockTime({
  time,
  className,
}: {
  time: string;
  className?: string;
}) {
  const [hours, minutes] = time.split(":");
  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {hours}
      <span className="clock-colon" aria-hidden="true">
        :
      </span>
      {minutes}
    </span>
  );
}
