LOMMA v6 — UX/UI patch

Wypakuj zawartosc tego ZIP-a do folderu v6 i wybierz nadpisanie plikow.

Zmienione:
- src/components/layout/nav.tsx
- src/components/product-card.tsx
- src/components/cart-drawer.tsx
- src/components/qty-selector.tsx
- src/routes/sklep.tsx
- src/routes/zapach.$id.tsx
- src/styles.css

Zakres zmian:
- wycentrowane menu desktopowe + lepszy header mobilny
- bardziej czytelny koszyk i licznik produktów
- prawdziwy "Dodaj do koszyka" na kartach produktow
- toast po dodaniu produktu
- pasek postepu do darmowej dostawy w koszyku
- czytelniejsza karta sklepu i sekcja benefitow
- mocniejszy CTA na stronie produktu
- lepszy selector ilosci
- brak ciemnego blysku przed zaladowaniem motywu jasnego
- poprawione focus states i mobile safe-area

Po nadpisaniu uruchom w PowerShell:
  npm.cmd run build

Jesli build przejdzie, dopiero wtedy commit + push.
