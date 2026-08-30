export type ProductId = "karkonosze" | "ogrod" | "baltyk";

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
    time: "07:15",
    price: 89,
    notes: ["bergamotka", "mandarynka", "neroli"],
    character: "świeży · zielony · lekki",
    description:
      "Bergamotka, mandarynka i neroli otwierają świeżą kompozycję, po której pojawiają się róża i mięta. Całość ociepla miękkie piżmo z odrobiną benzoesu.",
    howItSmells: [
      { name: "Bergamotka", text: "świeża, cytrusowa, lekka" },
      { name: "Białe kwiaty", text: "delikatne i czyste" },
      { name: "Zielone liście", text: "soczyste, naturalne, rześkie" },
    ],
    image: "/images/ogrod.jpg",
    scene: "/images/ogrod-scene.jpg",
    hourStart: 5,
    hourEnd: 11,
  },
  karkonosze: {
    id: "karkonosze",
    index: "02",
    name: "Wieczór w Karkonoszach",
    location: "Karkonosze",
    time: "19:42",
    price: 89,
    notes: ["igły sosnowe", "balsam jodłowy", "cedr"],
    character: "leśny · głęboki · spokojny",
    description:
      "Chłodne igły sosny i balsam jodłowy spotykają się z ciepłem cedru i żywicy. Leśny, głęboki zapach na spokojny wieczór.",
    howItSmells: [
      { name: "Cedr", text: "ciepły, drewniany, lekko suchy" },
      { name: "Jałowiec", text: "świeży, zielony, chłodny" },
      { name: "Mech", text: "wilgotny, leśny, ziemisty" },
    ],
    image: "/images/karkonosze.jpg",
    scene: "/images/karkonosze-scene.jpg",
    hourStart: 16,
    hourEnd: 20,
  },
  baltyk: {
    id: "baltyk",
    index: "03",
    name: "Wieczór nad Bałtykiem",
    location: "Bałtyk",
    time: "21:05",
    price: 89,
    notes: ["ozon", "algi", "mokre drewno"],
    character: "czysty · mineralny · otulający",
    description:
      "Chłodne algi i morska bryza przechodzą w delikatne kwiaty, a baza mokrego drewna, bursztynu i piżma zostawia spokojne, ciepłe wykończenie.",
    howItSmells: [
      { name: "Sól morska", text: "chłodna, mineralna, czysta" },
      { name: "Bursztyn", text: "ciepły, miękki, świetlisty" },
      { name: "Drewno", text: "suche, spokojne, otulające" },
    ],
    image: "/images/baltyk.jpg",
    scene: "/images/baltyk-scene.jpg",
    hourStart: 20,
    hourEnd: 5,
  },
};

export const PRODUCT_LIST: Product[] = [
  PRODUCTS.ogrod,
  PRODUCTS.karkonosze,
  PRODUCTS.baltyk,
];

export const FREE_SHIPPING_THRESHOLD = 199;
export const SHIPPING_COST = 13.99;
export const BUNDLE_PRICES = { one: 89, two: 169, three: 239 } as const;
export const COLLECTION_IDS: ProductId[] = ["ogrod", "karkonosze", "baltyk"];

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
  if (hour >= 18 && hour < 23) return PRODUCTS.karkonosze;
  if (hour >= 23 || hour < 5) return PRODUCTS.baltyk;
  return PRODUCTS.ogrod;
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


