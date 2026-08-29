import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useUiStore } from "@/store/ui";

export function ThemeToggle() {
  const theme = useUiStore((s) => s.theme);
  const setTheme = useUiStore((s) => s.setTheme);

  useEffect(() => {
    const saved = window.localStorage.getItem("lomma-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("lomma-theme", theme);
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="inline-flex items-center gap-2 border border-line-strong px-3 py-2 font-mono text-2xs uppercase tracking-caps text-muted transition-colors hover:border-fg hover:text-fg"
      aria-label={`Przełącz na motyw ${nextTheme === "dark" ? "ciemny" : "jasny"}`}
    >
      {theme === "dark" ? <Sun className="size-3.5" strokeWidth={1.5} /> : <Moon className="size-3.5" strokeWidth={1.5} />}
      <span>LOMMA {theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
