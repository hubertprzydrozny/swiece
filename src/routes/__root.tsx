import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SiteShell } from "@/components/layout/site-shell";
import { NotFound } from "@/components/not-found";
import { AppErrorComponent } from "@/lib/error-component";

const APP_NAME = "LOMMA — Home Fragrance";

export const Route = createRootRoute({
  component: RootDocument,
  notFoundComponent: NotFound,
  errorComponent: AppErrorComponent,
});

function RootDocument() {
  return (
    <SiteShell>
      <Outlet />
    </SiteShell>
  );
}
