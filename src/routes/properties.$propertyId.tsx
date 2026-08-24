import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home,
  ChevronRight,
  MapPin,
  BedDouble,
  Bath,
  Sofa,
  Ruler,
  BadgeCheck,
  Heart,
  Share2,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { allProperties, getPropertyById } from "@/data/properties";

export const Route = createFileRoute("/properties/$propertyId")({
  loader: ({ params }) => {
    const property = getPropertyById(params.propertyId);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Property Unavailable | RentEaze" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { property } = loaderData;
    const title = `${property.title} in ${property.location} | RentEaze`;
    const description = `${property.title} for rent in ${property.location} at ${property.price} per year. ${property.beds}, ${property.baths}, ${property.size}, ${property.furnishing}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PropertyDetail,
  notFoundComponent: PropertyNotFound,
});

function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader active="Properties" />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-extrabold text-foreground">Property not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This listing may have been rented out or removed.
        </p>
        <Link
          to="/properties"
          className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Browse all properties
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  const [active, setActive] = useState(0);

  const similar = allProperties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  const facts = [
    { icon: BedDouble, label: "Bedrooms", value: property.beds },
    { icon: Bath, label: "Bathrooms", value: property.baths },
    { icon: Ruler, label: "Size", value: property.size },
    { icon: Sofa, label: "Furnishing", value: property.furnishing },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader active="Properties" />

      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 pt-5 text-xs text-muted-foreground sm:px-6"
      >
        <Home className="h-3.5 w-3.5" />
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/properties" className="hover:text-primary">
          Properties
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate font-semibold text-foreground">{property.title}</span>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src={property.gallery[active]}
              alt={`${property.title} in ${property.location} — photo ${active + 1}`}
              width={1200}
              height={800}
              className="h-64 w-full object-cover sm:h-[26rem]"
            />
            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
              <BadgeCheck className="h-3.5 w-3.5" /> Verified
            </span>
            <div className="absolute bottom-3 right-3 rounded-md bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-foreground">
              {active + 1} / {property.gallery.length}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-3">
            {property.gallery.map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActive(i)}
                aria-label={`View photo ${i + 1}`}
                aria-current={i === active}
                className={`overflow-hidden rounded-lg border-2 transition-colors ${
                  i === active ? "border-primary" : "border-transparent hover:border-border"
                }`}
              >
                <img
                  src={img}
                  alt={`${property.title} thumbnail ${i + 1}`}
                  loading="lazy"
                  width={300}
                  height={200}
                  className="h-16 w-full object-cover sm:h-20"
                />
              </button>
            ))}
          </div>

          {/* Title block */}
          <div className="mt-6">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> {property.location}
            </p>
          </div>

          {/* Key facts */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
              >
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                  {label}
                </div>
                <div className="text-sm font-bold text-foreground">{value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <section className="mt-8">
            <h2 className="text-lg font-extrabold text-foreground">About this property</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {property.description}
            </p>
          </section>

          {/* Highlights */}
          <section className="mt-8">
            <h2 className="text-lg font-extrabold text-foreground">Key highlights</h2>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {property.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2.5 text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {h}
                </li>
              ))}
            </ul>
          </section>

          {/* Amenities */}
          <section className="mt-8">
            <h2 className="text-lg font-extrabold text-foreground">Amenities</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {property.amenities.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {a}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="text-2xl font-extrabold text-primary">
              {property.price}
              <span className="text-sm font-normal text-muted-foreground"> / year</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {property.type} · Listed {property.listedAt} days ago
            </p>

            <div className="mt-5 border-t border-border pt-4">
              <div className="text-sm font-bold text-foreground">{property.landlord.name}</div>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-primary">
                <BadgeCheck className="h-3.5 w-3.5" /> {property.landlord.role}
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {property.landlord.responseTime}
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                <MessageSquare className="h-4 w-4" /> Contact Landlord
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent">
                <Phone className="h-4 w-4" /> Schedule Inspection
              </button>
              <div className="flex gap-2.5">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-accent">
                  <Heart className="h-4 w-4 text-primary" /> Save
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-accent">
                  <Share2 className="h-4 w-4 text-primary" /> Share
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <h2 className="text-lg font-extrabold text-foreground">Similar properties</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {similar.map((p) => (
              <Link
                key={p.id}
                to="/properties/$propertyId"
                params={{ propertyId: p.id }}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-shadow hover:shadow-lg"
              >
                <img
                  src={p.img}
                  alt={`${p.title} in ${p.location}`}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {p.location}
                  </p>
                  <p className="mt-2 text-base font-bold text-primary">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
