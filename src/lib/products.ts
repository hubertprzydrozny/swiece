export type ProductId = "karkonosze" | "ogrod" | "baltyk" | "mazury";

export type ScentNote = {
  name: string;
  text: string;
};

export type Product = {
  id: ProductId;
  index: string;
  name: string;
  location: string;
  time: string;
  price: number;
  notes: string[];
  character: string;
  shortDescription: string;
  description: string;
  howItSmells: ScentNote[];
  image: string;
  scene: string;
  hourStart: number;
  hourEnd: number;
};

export const PRODUCTS: Record<ProductId, Product> = {
  ogrod: {
    id: "ogrod",
    index: "01",
    name: "Poranek w Ogrodzie",
    location: "Ogród",
    time: "07:18",
    price: 89,
    notes: ["zielone liście", "czarna figa", "mech"],
    character: "zielony · figowy · rześki",
    shortDescription:
      "Chłodny poranek, krople rosy na liściach i pierwsze promienie słońca wpadające do ogrodu.",
    description:
      "Przez uchylone okno wdziera się chłodny powiew poranka, niosąc zapach dopiero co skoszonej trawy i ziemi skropionej nocnym deszczem. Świat dopiero nabiera barw, a filiżanka parującej kawy na drewnianym stole zaczyna rozgrzewać pierwszy promień słońca.",
    howItSmells: [
      { name: "Zielone liście", text: "soczyste, naturalne, rześkie" },
      { name: "Czarna figa", text: "słodka, zielona, otulająca" },
      { name: "Mech", text: "wilgotny, leśny, ziemisty" },
    ],
    image: "/images/ogrod.jpg",
    scene: "/images/ogrod-scene.jpg",
    hourStart: 5,
    hourEnd: 11,
  },
  mazury: {
    id: "mazury",
    index: "04",
    name: "Popołudnie na Mazurach",
    location: "Mazury",
    time: "15:42",
    price: 89,
    notes: ["liście figi", "woda", "cedr"],
    character: "wodny · zielony · spokojny",
    shortDescription:
      "Chłodna woda, ciepły drewniany pomost i słońce, które zatrzymało się na chwilę.",
    description:
      "Czas zatrzymał się gdzieś pomiędzy błękitem jeziora a głębokim cieniem starych sosen. Powietrze pachnie żywicą, rozgrzanym w słońcu drewnem i letnim wiatrem, który przynosi ze sobą echo dalekich żagli sunących po tafli wody.",
    howItSmells: [
      { name: "Liście figi", text: "zielone, słodkawe, mleczne" },
      { name: "Woda", text: "chłodna, czysta, mineralna" },
      { name: "Cedr", text: "ciepły, drewniany, lekko suchy" },
    ],
    // TODO: podmienić na docelowe zdjęcie mazury.jpg / mazury-scene.jpg
    image: "/images/mazury.jpg",
    scene: "/images/mazury-scene.jpg",
    hourStart: 12,
    hourEnd: 17,
  },
  karkonosze: {
    id: "karkonosze",
    index: "02",
    name: "Wieczór w Karkonoszach",
    location: "Karkonosze",
    time: "21:37",
    price: 89,
    notes: ["sosna", "żywica", "cedr"],
    character: "leśny · żywiczny · spokojny",
    shortDescription:
      "Górskie powietrze, świerkowy las i zapach żywicznego drewna po zmroku.",
    description:
      "Nad szczytami gór powoli zapada granatowy zmierzch, a w dolinach rozświetlają się pojedyncze okna schronisk. Powietrze staje się rześkie i przesiąknięte zapachem żywicznego lasu oraz subtelną, otulającą wonią dymu z palącego się w kominku drewna.",
    howItSmells: [
      { name: "Sosna", text: "świeża, zielona, górska" },
      { name: "Żywica", text: "gęsta, ciepła, leśna" },
      { name: "Cedr", text: "ciepły, drewniany, lekko suchy" },
    ],
    image: "/images/karkonosze.jpg",
    scene: "/images/karkonosze-scene.jpg",
    hourStart: 18,
    hourEnd: 21,
  },
  baltyk: {
    id: "baltyk",
    index: "03",
    name: "Zachód nad Bałtykiem",
    location: "Bałtyk",
    time: "20:46",
    price: 89,
    notes: ["morska bryza", "bursztyn", "drewno"],
    character: "słony · bursztynowy · otulający",
    shortDescription:
      "Słona bryza, chłodne skały i ciepłe drewno o zachodzie słońca.",
    description:
      "Słońce powoli dotyka tafli morza, malując horyzont na odcienie głębokiego oranżu i fioletu. Wiatr niesie ze sobą słonawy zapach wodorostów i wysuszonego przez słońce drewna, zamykając w jednym oddechu całą surowość i piękno północnego wybrzeża.",
    howItSmells: [
      { name: "Morska bryza", text: "słona, chłodna, czysta" },
      { name: "Bursztyn", text: "ciepły, miękki, świetlisty" },
      { name: "Drewno", text: "suche, spokojne, otulające" },
    ],
    image: "/images/baltyk.jpg",
    scene: "/images/baltyk-scene.jpg",
    hourStart: 20,
    hourEnd: 23,
  },
};

export const PRODUCT_LIST: Product[] = [
  PRODUCTS.ogrod,
  PRODUCTS.karkonosze,
  PRODUCTS.baltyk,
  PRODUCTS.mazury,
];

export const FREE_SHIPPING_THRESHOLD = 199;
export const SHIPPING_COST = 13.99;
export const BUNDLE_PRICES = { one: 89, two: 169, three: 239 } as const;
export const COLLECTION_IDS: ProductId[] = [
  "ogrod",
  "karkonosze",
  "baltyk",
  "mazury",
];

export function isProductId(value: string): value is ProductId {
  return value in PRODUCTS;
}

export function getProduct(id: string): Product | undefined {
  return isProductId(id) ? PRODUCTS[id] : undefined;
}

export function calculateBundlePrice(quantity: number) {
  const threes = Math.floor(quantity / 3);
  const remainder = quantity % 3;
  return (
    threes * BUNDLE_PRICES.three +
    (remainder === 2 ? BUNDLE_PRICES.two : remainder * BUNDLE_PRICES.one)
  );
}

export function scentForHour(hour: number): Product {
  if (hour >= 5 && hour < 11) return PRODUCTS.ogrod;
  if (hour >= 12 && hour < 17) return PRODUCTS.mazury;
  if (hour >= 20 && hour < 23) return PRODUCTS.baltyk;
  return PRODUCTS.karkonosze;
}

export const PRODUCT_FACTS = [
  { label: "Waga", value: "180 g" },
  { label: "Pojemność", value: "200 ml" },
  { label: "Czas palenia", value: "~40 h" },
  { label: "Wosk", value: "Sojowy" },
  { label: "Szkło", value: "Transparentne" },
  { label: "Pokrywka", value: "Bambusowa" },
  { label: "Produkcja", value: "Polska" },
] as const;

export const FAQ_ITEMS = [
  {
    q: "Jak długo pali się świeca?",
    a: "Przy odpowiednim użytkowaniu świeca o wadze 180 g zapewnia około 40 godzin relaksu.",
  },
  {
    q: "Jakie są koszty dostawy?",
    a: "Darmowa dostawa obowiązuje przy zamówieniach powyżej 199 zł. Poniżej koszt to 13,99 zł.",
  },
  {
    q: "Czy mogę zwrócić produkt?",
    a: "Masz 14 dni na odstąpienie od umowy. Prosimy o kontakt w celu sprawnego przeprowadzenia zwrotu.",
  },
  {
    q: "Jak intensywne są zapachy?",
    a: "Kompozycje są wyczuwalne, ale spokojne — stworzone do budowania atmosfery, nie do dominowania nad wnętrzem.",
  },
] as const;

export const TRUST_BADGES = [
  { title: "Ręcznie zalewane", text: "W małych partiach w Polsce" },
  { title: "100% Wosk Sojowy", text: "Bez toksyn, benzenu i kopcenia" },
  { title: "Darmowa Dostawa", text: "Dla zamówień od 199 zł" },
  { title: "30 Dni na Zwrot", text: "Gwarancja bezpiecznych zakupów" },
] as const;
