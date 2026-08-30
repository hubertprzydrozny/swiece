import type { ReactNode } from "react";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { TrustBar } from "@/components/layout/trust-bar";
import { Toaster } from "sonner";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-bg">
      <Nav />
      <main className="flex-1">{children}</main>
      <TrustBar />
      <Footer />
      <CartDrawer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className:
            "font-sans border border-line bg-elevated text-fg shadow-none",
        }}
      />
    </div>
  );
}
