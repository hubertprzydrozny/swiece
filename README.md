# LOMMA — React storefront

Frontend sklepu zbudowany na React, Vite i TanStack Router.

## Uruchomienie lokalne

```bash
pnpm install
pnpm dev
```

## Build produkcyjny

```bash
pnpm build
```

Wynik trafia do katalogu `dist`.

## Cloudflare Pages

- Framework preset: `React (Vite)`
- Build command: `pnpm build` (lub `npm run build`)
- Build output directory: `dist`
- Root directory: `v6` — jeśli repozytorium zawiera również `v1`–`v4`

Plik `public/_redirects` zachowuje routing SPA po bezpośrednim wejściu na adres produktu.

## Ważne

Koszyk i checkout są obecnie demonstracyjne. Prawdziwe płatności i zamówienia należy później podłączyć przez Shopify.
