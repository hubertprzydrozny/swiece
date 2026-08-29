LOMMA v7 — Quiet Luxury UX/UI patch

Inspiracja: struktura i spokojny sposób prezentacji produktu z nowoczesnego e-commerce (m.in. Animal Island), ale bez kopiowania layoutu, tekstów ani identyfikacji wizualnej.

Cel:
- mniej "premium e-commerce", więcej spokojnego/editorial designu
- produkt i fotografia są najważniejsze
- mniej pillów, ciężkich cieni, zaokrągleń i efektów hover
- czytelniejsza ścieżka: produkt -> cena -> ilość -> Dodaj do koszyka -> dostawa/zwroty -> szczegóły
- lepszy mobile UX

Zmienione:
- src/components/layout/nav.tsx
- src/components/product-card.tsx
- src/components/cart-drawer.tsx
- src/components/qty-selector.tsx
- src/components/ui/button.tsx
- src/routes/index.tsx
- src/routes/sklep.tsx
- src/routes/zapach.$id.tsx
- src/styles.css

Bez zmian:
- logika koszyka
- dane produktów
- routing
- obrazy
- konfiguracja Vite/Tailwind
- checkout / integracje

Po nadpisaniu uruchom lokalnie:
  npm.cmd run build

Jeśli build przejdzie, obejrzyj desktop + mobile przed commit/push.
