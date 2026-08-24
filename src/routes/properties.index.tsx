import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Home,
  MapPin,
  BedDouble,
  Bath,
  Sofa,
  Heart,
  Search,
  SlidersHorizontal,
  BadgeCheck,
  LayoutGrid,
  List,
  ChevronRight,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import banner from "@/assets/properties-banner.jpg";
import { allProperties, type Property } from "@/data/properties";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Properties for Rent in Nigeria | RentEaze" },
      {
        name: "description",
        content:
          "Browse verified rental properties across Nigeria on RentEaze. Filter by location, budget, property type and bedrooms, then connect directly with landlords.",
      },
      { property: "og:title", content: "Browse Verified Properties | RentEaze" },
      {
        property: "og:description",
        content:
          "Discover verified homes across Nigeria. Filter by location, budget and bedrooms, and rent with confidence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Properties,
});

const locationOptions = ["Lagos", "Abuja", "Port Harcourt"];
const typeOptions = ["Apartment", "Duplex", "Terrace", "Studio"];
const bedroomOptions = ["Studio", "1", "2", "3", "4+"];
const featureOptions = [
  "Furnished",
  "Unfurnished",
  "Water Supply",
  "Power Supply",
  "Security",
] as const;

function FilterSelect({
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
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
        <Icon className="h-4 w-4 text-primary" /> {label}
      </div>
      <div className="relative flex items-center rounded-lg border border-border bg-background px-3 py-2.5 focus-within:border-primary">
        <select
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none bg-transparent text-sm outline-none ${
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
        <span className="pointer-events-none ml-2 text-muted-foreground">▾</span>
      </div>
    </div>
  );
}

function PropertyCard({ p, view }: { p: Property; view: "grid" | "list" }) {
  return (
    <article
      className={`overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] ${
        view === "list" ? "flex" : ""
      }`}
    >
      <div className={`relative ${view === "list" ? "w-32 shrink-0 sm:w-72" : ""}`}>
        <img
          src={p.img}
          alt={`${p.title} in ${p.location}`}
          loading="lazy"
          width={800}
          height={600}
          className={`h-full w-full object-cover ${view === "list" ? "min-h-full" : "h-48"}`}
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
      <div className="flex-1 p-4">
        <h3 className="text-base font-bold text-foreground">{p.title}</h3>
        <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {p.location}
        </p>
        <p className="mt-2 text-lg font-extrabold text-primary">
          {p.price}
          <span className="text-xs font-normal text-muted-foreground"> / year</span>
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5" /> {p.beds}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" /> {p.baths}
          </span>
          <span className="flex items-center gap-1">
            <Sofa className="h-3.5 w-3.5" /> {p.furnishing}
          </span>
        </div>
        <div className={`mt-4 flex gap-2 ${view === "list" ? "flex-col sm:flex-row" : ""}`}>
          <Link
            to="/properties/$propertyId"
            params={{ propertyId: p.id }}
            className="flex-1 rounded-lg border border-primary px-3 py-2.5 text-center text-xs font-semibold text-primary transition-colors hover:bg-accent"
          >
            View Details
          </Link>
          <button className="flex-1 rounded-lg bg-primary-deep px-3 py-2.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            Contact Landlord
          </button>
        </div>
      </div>
    </article>
  );
}

function Properties() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [applied, setApplied] = useState({
    location: "",
    type: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
    features: [] as string[],
  });
  const [sort, setSort] = useState("Recently Listed");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFeature = (f: string) =>
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const results = useMemo(() => {
    const min = Number(applied.minPrice) || 0;
    const max = Number(applied.maxPrice) || Infinity;
    const list = allProperties.filter((p) => {
      if (applied.location && p.city !== applied.location) return false;
      if (applied.type && p.type !== applied.type) return false;
      if (p.priceValue < min || p.priceValue > max) return false;
      if (applied.bedrooms) {
        if (applied.bedrooms === "Studio" && p.bedrooms !== 0) return false;
        if (applied.bedrooms === "4+" && p.bedrooms < 4) return false;
        if (
          !["Studio", "4+"].includes(applied.bedrooms) &&
          p.bedrooms !== Number(applied.bedrooms)
        )
          return false;
      }
      const furnishingFilters = applied.features.filter(
        (f) => f === "Furnished" || f === "Unfurnished",
      );
      if (furnishingFilters.length && !furnishingFilters.includes(p.furnishing)) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      if (sort === "Price: Low to High") return a.priceValue - b.priceValue;
      if (sort === "Price: High to Low") return b.priceValue - a.priceValue;
      return b.listedAt - a.listedAt;
    });
  }, [applied, sort]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader active="Properties" />

      {/* Banner */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-border shadow-[var(--shadow-card)]">
          <img
            src={banner}
            alt="Modern verified apartment building in Nigeria"
            width={1600}
            height={500}
            className="h-64 w-full object-cover sm:h-72 md:h-80"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--gradient-banner-from) 0%, color-mix(in oklab, var(--gradient-banner-from) 88%, transparent) 45%, transparent 85%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
              <BadgeCheck className="h-3.5 w-3.5" /> Verified listings
            </span>
            <h1 className="mt-4 max-w-lg text-balance text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
              Find Your Next Home <span className="text-primary">With RentEaze</span>
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Browse verified properties, connect with landlords and rent with confidence.
            </p>
          </div>
        </div>
      </section>


      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 pt-5 text-xs text-muted-foreground sm:px-6"
      >
        <Home className="h-3.5 w-3.5" />
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-foreground">Properties</span>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[300px_1fr]">
        {/* Filters */}
        <div>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            {filtersOpen ? "Hide Filters" : "Filter Properties"}
          </button>

          <aside
            className={`${filtersOpen ? "block" : "hidden"} rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] lg:block`}
          >
            <h2 className="flex items-center gap-2 border-b border-border pb-4 text-lg font-extrabold text-foreground">
              <SlidersHorizontal className="h-5 w-5 text-primary" /> Filter Properties
            </h2>

            <div className="mt-5 space-y-5">
              <FilterSelect
                label="Location"
                icon={MapPin}
                placeholder="Select location"
                value={location}
                onChange={setLocation}
                options={locationOptions}
              />
              <FilterSelect
                label="Property Type"
                icon={Home}
                placeholder="Select property type"
                value={type}
                onChange={setType}
                options={typeOptions}
              />

              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <BadgeCheck className="h-4 w-4 text-primary" /> Budget Range
                </div>
                <div className="flex gap-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    aria-label="Minimum price"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    aria-label="Maximum price"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
              </div>

              <FilterSelect
                label="Bedrooms"
                icon={BedDouble}
                placeholder="Select bedrooms"
                value={bedrooms}
                onChange={setBedrooms}
                options={bedroomOptions}
              />

              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground">
                  <BadgeCheck className="h-4 w-4 text-primary" /> Features
                </div>
                <div className="space-y-3">
                  {featureOptions.map((f) => (
                    <label key={f} className="flex cursor-pointer items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={features.includes(f)}
                        onChange={() => toggleFeature(f)}
                        className="h-4 w-4 rounded border-border accent-primary"
                      />
                      <span className="text-muted-foreground">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  setApplied({ location, type, bedrooms, minPrice, maxPrice, features })
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-deep px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Search className="h-4 w-4" /> Apply Filters
              </button>
            </div>
          </aside>
        </div>

        {/* Listings */}
        <section>
          <p className="text-xs text-muted-foreground">
            Showing {results.length} of {allProperties.length} properties
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                All Properties
              </h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Discover verified properties across Nigeria. Rent with confidence.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                <span className="text-xs text-muted-foreground">Sort by:</span>
                <select
                  aria-label="Sort properties"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-transparent text-xs font-medium text-foreground outline-none"
                >
                  <option>Recently Listed</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <span className="pointer-events-none text-muted-foreground">▾</span>
              </div>
              <div className="flex overflow-hidden rounded-lg border border-border">
                <button
                  type="button"
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                  className={`p-2.5 transition-colors ${view === "grid" ? "bg-primary-deep text-primary-foreground" : "bg-card text-muted-foreground hover:bg-accent"}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  className={`p-2.5 transition-colors ${view === "list" ? "bg-primary-deep text-primary-foreground" : "bg-card text-muted-foreground hover:bg-accent"}`}
                >
                  <List className="h-4 w-4" />
                </button>

              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <p className="mt-6 rounded-xl border border-border bg-secondary/40 p-8 text-center text-sm text-muted-foreground">
              No properties match your filters. Try widening your budget or location.
            </p>
          ) : (
            <div
              className={`mt-6 grid gap-5 ${
                view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {results.map((p) => (
                <PropertyCard key={p.title + p.location} p={p} view={view} />
              ))}
            </div>
          )}
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
