import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  Search,
  MapPin,
  Home,
  BedDouble,
  ShieldCheck,
  FileText,
  Scale,
  BadgeCheck,
  Eye,
  MessageSquare,
  Heart,
  KeyRound,
  Bath,
  Sofa,
  ArrowRight,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import heroHome from "@/assets/hero-home.jpg";
import { allProperties } from "@/data/properties";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RentEaze — Rent Verified Homes in Nigeria Without the Stress" },
      {
        name: "description",
        content:
          "RentEaze connects verified landlords directly with tenants in Nigeria. No hidden fees, lawyer-backed agreements and secure digital rentals.",
      },
      { property: "og:title", content: "RentEaze — Simplifying Rentals in Nigeria" },
      {
        property: "og:description",
        content:
          "Find verified homes, sign lawyer-backed agreements and move in with confidence — all on one secure platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});



const trustBadges = [
  { icon: ShieldCheck, label: "Verified\nLandlords" },
  { icon: FileText, label: "Secure Digital\nAgreements" },
  { icon: Scale, label: "Lawyer-Backed\nDocumentation" },
  { icon: BadgeCheck, label: "No Hidden\nFees" },
  { icon: Home, label: "Smarter\nRental Process" },
];

const steps = [
  {
    n: "1",
    icon: Home,
    title: "Search & Discover",
    body: "Find verified properties that match your needs.",
  },
  {
    n: "2",
    icon: FileText,
    title: "Secure Agreement",
    body: "Get lawyer-backed, legally binding rental agreements.",
  },
  {
    n: "3",
    icon: KeyRound,
    title: "Move In with Confidence",
    body: "Sign, pay and move in — all on one secure platform.",
  },
];

const properties = allProperties;

const locationOptions = ["Lagos", "Abuja", "Port Harcourt"];
const typeOptions = ["Apartment", "Duplex", "Terrace", "Studio"];
const bedroomOptions = ["Studio", "1", "2", "3", "4+"];
const budgetOptions = [
  { label: "Under ₦1,000,000", min: 0, max: 1000000 },
  { label: "₦1,000,000 – ₦2,500,000", min: 1000000, max: 2500000 },
  { label: "₦2,500,000 – ₦5,000,000", min: 2500000, max: 5000000 },
  { label: "Above ₦5,000,000", min: 5000000, max: Infinity },
];


const whyChoose = [
  { icon: ShieldCheck, title: "Payment Security", body: "Safe and trusted\ntransactions" },
  { icon: Scale, title: "Legal Protection", body: "Lawyer-backed\ndocumentation" },
  { icon: BadgeCheck, title: "Verified Listings", body: "Only genuine\nproperties" },
  { icon: MessageSquare, title: "Dedicated Support", body: "We're always here\nto help" },
  { icon: Eye, title: "Complete Transparency", body: "No hidden fees\nor charges" },
];

const testimonials = [
  {
    quote: "RentEaze made finding my apartment so easy. No hidden fees, no stress!",
    name: "Chinedu Okafor",
    city: "Lagos",
  },
  {
    quote: "I got a verified landlord and signed my lease online. It's the safest way to rent.",
    name: "Tolu Adebayo",
    city: "Abuja",
  },
  {
    quote: "As a landlord, RentEaze helps me find reliable tenants quickly.",
    name: "Emeka Nwankwo",
    city: "Port Harcourt",
  },
];




function SelectField({
  label,
  icon: Icon,
  placeholder,
  value,
  onChange,
  options,
}: {
  label: string;
  icon: typeof MapPin;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-1.5 block text-xs font-semibold text-foreground">{label}</label>
      <div className="relative flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 focus-within:border-primary">
        <Icon className="h-4 w-4 shrink-0 text-primary" />
        <select
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full min-w-0 appearance-none truncate bg-transparent text-sm outline-none ${
            value ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none ml-auto text-muted-foreground">▾</span>
      </div>
    </div>
  );
}


function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        {children}
      </h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
    </div>
  );
}

function Index() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [filters, setFilters] = useState({ location: "", budget: "", type: "", bedrooms: "" });
  const resultsRef = useRef<HTMLElement>(null);

  const results = useMemo(() => {
    const band = budgetOptions.find((b) => b.label === filters.budget);
    return properties.filter((p) => {
      if (filters.location && p.city !== filters.location) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (band && (p.priceValue < band.min || p.priceValue > band.max)) return false;
      if (filters.bedrooms) {
        if (filters.bedrooms === "Studio" && p.bedrooms !== 0) return false;
        if (filters.bedrooms === "4+" && p.bedrooms < 4) return false;
        if (!["Studio", "4+"].includes(filters.bedrooms) && p.bedrooms !== Number(filters.bedrooms))
          return false;
      }
      return true;
    });
  }, [filters]);

  const hasFilters = Boolean(
    filters.location || filters.budget || filters.type || filters.bedrooms,
  );

  const handleSearch = () => {
    setFilters({ location, budget, type, bedrooms });
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearSearch = () => {
    setLocation("");
    setBudget("");
    setType("");
    setBedrooms("");
    setFilters({ location: "", budget: "", type: "", bedrooms: "" });
  };

  return (

    <div className="min-h-screen bg-background font-sans">
      <SiteHeader active="Home" />


      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroHome}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(105deg, oklch(1 0 0 / 0.97) 0%, oklch(1 0 0 / 0.93) 45%, oklch(0.965 0.015 305 / 0.72) 70%, oklch(0.237 0.106 310.9 / 0.45) 100%)",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-secondary/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified rentals in Nigeria
            </span>
            <h1 className="mt-5 text-balance text-[2.35rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[3.6rem]">
              Find Your Next Home{" "}
              <span className="text-primary">Without the Stress</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              <span className="lg:hidden">
                For millions of Nigerians, finding a house is often frustrating, expensive and
                uncertain. RentEaze makes it simpler, safer and more transparent.
              </span>
              <span className="hidden lg:inline">
                Excessive agency fees, unverified listings and rental scams make renting
                overwhelming. RentEaze is a secure digital rental ecosystem that connects verified
                landlords directly with tenants — simpler, safer and fully transparent.
              </span>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
              >
                Browse Properties <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/60"
              >
                How It Works
              </Link>
            </div>
            <dl className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border/70 pt-6">
              {[
                { k: "10,000+", v: "Verified homes" },
                { k: "25,000+", v: "Happy renters" },
                { k: "100%", v: "Secure payments" },
              ].map(({ k, v }) => (
                <div key={v}>
                  <dt className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                    {k}
                  </dt>
                  <dd className="text-xs text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-border shadow-[var(--shadow-search)]">
              <img
                src={heroHome}
                alt="Modern verified rental home at dusk in Nigeria"
                width={1200}
                height={900}
                className="h-[260px] w-full object-cover sm:h-[360px] md:h-[460px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-deep/45 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 right-3 flex items-center gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur sm:right-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground">Verified Properties</div>
                <div className="text-[11px] text-muted-foreground">
                  Safe • Secure • Transparent
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Search bar */}
        <div className="relative mx-auto mt-10 max-w-7xl px-4 pb-10 sm:px-6 md:mt-12 md:pb-12">
          <div className="rounded-2xl bg-primary-deep p-2 shadow-[var(--shadow-search)] sm:p-2.5">
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-card p-3 sm:p-4 md:flex md:flex-row md:items-end">
              <SelectField
                label="Location"
                icon={MapPin}
                placeholder="Select location"
                value={location}
                onChange={setLocation}
                options={locationOptions}
              />
              <SelectField
                label="Budget"
                icon={BadgeCheck}
                placeholder="Select budget"
                value={budget}
                onChange={setBudget}
                options={budgetOptions.map((b) => b.label)}
              />
              <SelectField
                label="Property Type"
                icon={Home}
                placeholder="Select property type"
                value={type}
                onChange={setType}
                options={typeOptions}
              />
              <SelectField
                label="Bedrooms"
                icon={BedDouble}
                placeholder="Select bedrooms"
                value={bedrooms}
                onChange={setBedrooms}
                options={bedroomOptions}
              />
              <button
                onClick={handleSearch}
                className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Search className="h-4 w-4" /> Search Properties
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid grid-cols-2 gap-5 rounded-2xl border border-border bg-secondary/40 p-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:border-0 lg:bg-transparent lg:p-0">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 text-center lg:flex-row lg:gap-3 lg:text-left"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="whitespace-pre-line text-xs font-semibold text-foreground sm:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <SectionTitle>How RentEaze Works</SectionTitle>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map(({ n, icon: Icon, title, body }) => (
            <div
              key={n}
              className="flex items-start gap-4 rounded-xl border border-border bg-secondary/50 p-6"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-deep text-sm font-bold text-primary-foreground">
                {n}
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular properties */}
      <section ref={resultsRef} className="mx-auto max-w-7xl scroll-mt-20 px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
              {hasFilters ? "Search Results" : "Popular Properties"}
            </h2>
            <div className="mt-2 h-1 w-24 rounded-full bg-primary" />
            {hasFilters && (
              <p className="mt-2 text-xs text-muted-foreground">
                {results.length} {results.length === 1 ? "property" : "properties"} match your
                search
              </p>
            )}
          </div>
          {hasFilters ? (
            <button
              onClick={clearSearch}
              className="flex items-center gap-1 text-sm font-medium text-primary"
            >
              Clear filters
            </button>
          ) : (
            <Link to="/properties" className="flex items-center gap-1 text-sm font-medium text-primary">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {hasFilters && results.length === 0 && (
          <p className="mt-6 rounded-xl border border-border bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
            No properties match your filters yet. Try a wider budget or a different location.
          </p>
        )}

        <div className="-mx-4 mt-6 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {results.map((p) => (

            <article
              key={p.id}
              className="w-[78%] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] sm:w-auto"
            >
              <div className="relative">
                <img
                  src={p.img}
                  alt={`${p.title} in ${p.location}`}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-44 w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                  Verified
                </span>
                <button
                  aria-label="Save property"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card"
                >
                  <Heart className="h-4 w-4 text-primary" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.location}
                </p>
                <p className="mt-2 text-base font-bold text-primary">
                  {p.price}
                  <span className="text-xs font-normal text-muted-foreground"> / year</span>
                </p>
                <div className="mt-3 flex items-center gap-3 border-t border-border pt-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5" /> {p.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" /> {p.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Sofa className="h-3.5 w-3.5" /> Furnished
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    to="/properties/$propertyId"
                    params={{ propertyId: p.id }}
                    className="flex-1 rounded-lg border border-primary px-3 py-2 text-center text-xs font-semibold text-primary transition-colors hover:bg-accent"
                  >
                    View Details
                  </Link>
                  <button className="flex-1 rounded-lg bg-primary-deep px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                    Contact
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why choose */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <SectionTitle>Why Choose RentEaze?</SectionTitle>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
          {whyChoose.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-4 text-center shadow-[var(--shadow-card)] sm:p-6"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent sm:h-12 sm:w-12">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-3 text-xs font-bold text-foreground sm:mt-4 sm:text-sm">{title}</h3>
              <p className="mt-2 whitespace-pre-line text-[11px] text-muted-foreground sm:text-xs">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <SectionTitle>What Our Users Say</SectionTitle>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary">
                {t.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div>
                <div className="text-star text-sm">★★★★★</div>
                <blockquote className="mt-2 text-xs leading-relaxed text-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-3 text-xs font-bold text-foreground">
                  – {t.name}
                  <div className="font-normal text-muted-foreground">{t.city}</div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === 0 ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-14">
        <div
          className="flex flex-col items-center gap-6 rounded-2xl p-8 md:flex-row"
          style={{ background: "var(--gradient-purple)" }}
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
            <Home className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-primary-foreground">
              Ready to Find Your Next Home?
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Join thousands of Nigerians using RentEaze for a safer, simpler and smarter rental
              experience.
            </p>
          </div>
          <Link
            to="/register"
            className="flex items-center gap-2 rounded-lg bg-card px-6 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />

    </div>
  );
}
