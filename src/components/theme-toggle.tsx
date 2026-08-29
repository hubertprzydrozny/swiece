import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useUiStore } from "@/store/ui";

export function ThemeToggle() {
  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    window.localStorage.removeItem("lomma-theme");
  }, []);

  return null;
}
