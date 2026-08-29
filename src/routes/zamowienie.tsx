import { createFileRoute, Link } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { cartTotals, useCartStore } from "@/store/cart";

export const Route = createFileRoute("/zamowienie")({
  component: CheckoutPage,
  head: () => ({
    meta: [{ title: "Zamówienie — LOMMA" }],
  }),
});

const checkoutSchema = z.object({
  firstName: z.string().trim().min(1, "To pole jest wymagane"),
  lastName: z.string().trim().min(1, "To pole jest wymagane"),
  email: z.email("Podaj poprawny adres e-mail"),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+48\s?)?(?:\d[\s-]?){9}$/, "Podaj poprawny numer telefonu"),
  street: z.string().trim().min(1, "To pole jest wymagane"),
  houseNumber: z.string().trim().min(1, "To pole jest wymagane"),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{2}-\d{3}$/, "Użyj formatu 00-000"),
  city: z.string().trim().min(1, "To pole jest wymagane"),
  shippingMethod: z.enum(["paczkomat", "kurier"]),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const totals = cartTotals(items);
  const [done, setDone] = useState(false);

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
      shippingMethod: "paczkomat",
    },
  });

  if (done) {
    return (
      <section className="mx-auto flex min-h-[70svh] max-w-2xl flex-col items-start justify-center px-5 py-24 md:px-8">
        <p className="font-mono text-2xs uppercase tracking-caps text-accent">
          Zamówienie przyjęte
        </p>
        <h1 className="mt-4 font-display text-5xl font-medium tracking-display">
          Dziękujemy za zamówienie.
        </h1>
        <p className="mt-5 max-w-md text-muted">
          Twoje wspomnienia są w drodze. Wkrótce otrzymasz e-mail z
          potwierdzeniem.
        </p>
        <Button asChild className="mt-10">
          <Link to="/">Wróć na stronę główną</Link>
        </Button>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60svh] max-w-3xl flex-col items-start justify-center px-5 py-24 md:px-8">
        <h1 className="font-display text-5xl font-medium tracking-display">
          Twój koszyk jest pusty.
        </h1>
        <Button asChild className="mt-8">
          <Link to="/sklep">Odkryj zapachy</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-display text-5xl font-medium tracking-display">
        Złóż zamówienie
      </h1>
      <form
        className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start"
        onSubmit={form.handleSubmit(() => {
          clear();
          setDone(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        })}
        noValidate
      >
        <div className="space-y-10">
          <fieldset>
            <legend className="font-display text-2xl">Dane kontaktowe</legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                label="Imię"
                error={form.formState.errors.firstName?.message}
              >
                <Input {...form.register("firstName")} autoComplete="given-name" />
              </Field>
              <Field
                label="Nazwisko"
                error={form.formState.errors.lastName?.message}
              >
                <Input
                  {...form.register("lastName")}
                  autoComplete="family-name"
                />
              </Field>
              <Field label="E-mail" error={form.formState.errors.email?.message}>
                <Input
                  type="email"
                  {...form.register("email")}
                  autoComplete="email"
                />
              </Field>
              <Field
                label="Telefon"
                error={form.formState.errors.phone?.message}
              >
                <Input
                  type="tel"
                  {...form.register("phone")}
                  autoComplete="tel"
                  placeholder="+48"
                />
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-2xl">Dostawa</legend>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                label="Ulica"
                className="sm:col-span-2"
                error={form.formState.errors.street?.message}
              >
                <Input
                  {...form.register("street")}
                  autoComplete="address-line1"
                />
              </Field>
              <Field
                label="Numer domu/lokalu"
                error={form.formState.errors.houseNumber?.message}
              >
                <Input {...form.register("houseNumber")} />
              </Field>
              <Field
                label="Kod pocztowy"
                error={form.formState.errors.postalCode?.message}
              >
                <Input
                  {...form.register("postalCode")}
                  autoComplete="postal-code"
                  placeholder="00-000"
                />
              </Field>
              <Field
                label="Miasto"
                className="sm:col-span-2"
                error={form.formState.errors.city?.message}
              >
                <Input {...form.register("city")} autoComplete="address-level2" />
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-2xl">Metoda dostawy</legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ShippingOption
                selected={form.watch("shippingMethod") === "paczkomat"}
                onSelect={() => form.setValue("shippingMethod", "paczkomat")}
                title="Paczkomat"
                hint="InPost — najbliższy automat"
              />
              <ShippingOption
                selected={form.watch("shippingMethod") === "kurier"}
                onSelect={() => form.setValue("shippingMethod", "kurier")}
                title="Kurier"
                hint="Dostawa pod drzwi"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-2xl">Płatność</legend>
            <p className="mt-4 border border-line bg-surface px-4 py-4 text-sm text-muted">
              Płatność online — zostanie podłączona. To zamówienie jest wersją
              demonstracyjną.
            </p>
          </fieldset>
        </div>

        <aside className="border border-line bg-surface p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Twoje zamówienie</h2>
          <ul className="mt-6 space-y-3 text-sm">
            {items.map((item) => {
              const product = PRODUCTS[item.id];
              return (
                <li key={item.id} className="flex justify-between gap-3 text-muted">
                  <span>
                    {product.name} ({item.qty} szt.)
                  </span>
                  <span className="tabular-nums">
                    {formatPrice(product.price * item.qty)}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 space-y-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>Wartość produktów</span>
              <span className="tabular-nums">{formatPrice(totals.subtotal)}</span>
            </div>
            {totals.discount > 0 ? (
              <div className="flex justify-between text-accent">
                <span>Rabat za zestaw</span>
                <span>−{formatPrice(totals.discount)}</span>
              </div>
            ) : null}
            <div className="flex justify-between text-muted">
              <span>Dostawa</span>
              <span>
                {totals.shipping === 0 ? "Darmowa" : formatPrice(totals.shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t border-line pt-4 font-display text-xl text-fg">
              <span>Razem</span>
              <span className="tabular-nums">{formatPrice(totals.total)}</span>
            </div>
          </div>
          <Button type="submit" className="mt-8 w-full">
            Złóż zamówienie
          </Button>
        </aside>
      </form>
    </section>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      {children}
      {error ? (
        <p className="mt-2 text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ShippingOption({
  selected,
  onSelect,
  title,
  hint,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`border px-4 py-4 text-left transition-colors ${
        selected ? "border-fg bg-surface" : "border-line hover:border-line-strong"
      }`}
    >
      <p className="text-sm">{title}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </button>
  );
}
