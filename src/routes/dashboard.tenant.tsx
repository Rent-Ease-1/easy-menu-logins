import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Search,
  Heart,
  CalendarDays,
  FileText,
  FileSignature,
  Banknote,
  Wallet,
  Wrench,
  MessageSquare,
  Bell,
  UserCheck,
  Settings,
  HelpCircle,
  Home,
  ShieldCheck,
  Scale,
  Lock,
  BadgeCheck,
  Headphones,
  ChevronRight,
  Bed,
  Bath,
  Sofa,
  MapPin,
} from "lucide-react";

import { Card, DashboardShell, StatCard, type NavItem } from "@/components/dashboard-shell";
import heroHome from "@/assets/hero-home.jpg";
import propDuplex from "@/assets/prop-duplex.jpg";
import propApartment from "@/assets/prop-apartment.jpg";
import propTerrace from "@/assets/prop-terrace.jpg";
import propStudio from "@/assets/prop-studio.jpg";

export const Route = createFileRoute("/dashboard/tenant")({
  head: () => ({
    meta: [
      { title: "Tenant Dashboard — RentEaze" },
      {
        name: "description",
        content:
          "Search verified homes, track bookings and applications, and manage your RentEaze wallet and residential lease plan.",
      },
      { property: "og:title", content: "Tenant Dashboard — RentEaze" },
      {
        property: "og:description",
        content: "Verified listings, secure payments and lawyer-backed agreements for RentEaze tenants.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TenantDashboard,
});

const NAV: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Search Properties", icon: Search },
  { label: "Saved Properties", icon: Heart },
  { label: "My Bookings", icon: CalendarDays },
  { label: "Rental Applications", icon: FileText },
  { label: "Rental Agreements", icon: FileSignature },
  { label: "Payment History", icon: Banknote },
  { label: "RentEaze Wallet", icon: Wallet },
  { label: "Maintenance Requests", icon: Wrench },
  { label: "Messages", icon: MessageSquare, badge: 2 },
  { label: "Notifications", icon: Bell, badge: 3 },
  { label: "Profile & Verification", icon: UserCheck },
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: HelpCircle },
];

const featured = [
  { img: propDuplex, title: "3 Bedroom Duplex", location: "Lekki Phase 1, Lagos", price: "₦2,500,000", beds: 3, baths: 3 },
  { img: propApartment, title: "2 Bedroom Apartment", location: "Yaba, Lagos", price: "₦1,200,000", beds: 2, baths: 2 },
  { img: propTerrace, title: "4 Bedroom Terrace", location: "Lekki Phase 1, Lagos", price: "₦4,000,000", beds: 4, baths: 4 },
  { img: propStudio, title: "Studio Apartment", location: "Surulere, Lagos", price: "₦800,000", beds: 1, baths: 1 },
];

const trust = [
  { icon: ShieldCheck, title: "Verified Properties", body: "All listings are verified" },
  { icon: Scale, title: "Lawyer-Backed Agreements", body: "Legally binding rentals" },
  { icon: Lock, title: "Secure Payments", body: "Pay safely with the wallet" },
  { icon: BadgeCheck, title: "No Hidden Fees", body: "Transparent pricing" },
  { icon: Headphones, title: "24/7 Support", body: "We're always here to help" },
];

const filters = [
  { label: "Location", placeholder: "Select location", icon: MapPin },
  { label: "Property Type", placeholder: "Select property type", icon: Home },
  { label: "Budget", placeholder: "Select budget", icon: Banknote },
  { label: "Bedrooms", placeholder: "Select bedrooms", icon: Bed },
];

function TenantDashboard() {
  return (
    <DashboardShell
      role="tenant"
      title="Residential Lease"
      subtitle="Find your next home with confidence"
      nav={NAV}
      searchPlaceholder="Search properties..."
      promo={{
        heading: "Rent Smarter with RentEaze",
        body: "Browse verified listings with no agent wahala.",
        cta: "Browse Properties →",
      }}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-4">
          <section className="relative overflow-hidden rounded-2xl border border-border bg-accent">
            <img
              src={heroHome}
              alt="Modern verified home available on RentEaze"
              loading="lazy"
              className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover md:block"
            />
            <div className="relative max-w-xl p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Welcome, Ngozi! 👋
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Find your next home with confidence.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { icon: ShieldCheck, label: "Verified Properties" },
                  { icon: Scale, label: "Lawyer-Backed Agreements" },
                  { icon: Lock, label: "Secure Payments" },
                ].map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm"
                  >
                    <b.icon className="h-3.5 w-3.5 text-primary" /> {b.label}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={Home} label="Saved Properties" value="2" />
            <StatCard icon={CalendarDays} label="Active Booking" value="1" />
            <StatCard icon={FileText} label="Rental Applications" value="2" />
            <StatCard icon={Wallet} label="Wallet Balance" value="₦0" />
          </div>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-xl font-extrabold tracking-tight text-foreground">Find Your Next Home</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search thousands of verified properties across Nigeria
            </p>
            <div className="mt-4 grid gap-3 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
              {filters.map((f) => (
                <label key={f.label} className="block text-xs font-semibold text-foreground">
                  {f.label}
                  <span className="mt-1.5 flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm font-normal text-muted-foreground">
                    <f.icon className="h-4 w-4 text-primary" />
                    {f.placeholder}
                  </span>
                </label>
              ))}
              <button
                type="button"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                <Search className="h-4 w-4" /> Search Properties
              </button>
            </div>
          </section>

          <Card title="Featured Properties" action="View All">
            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              {featured.map((p) => (
                <article key={p.title} className="overflow-hidden rounded-2xl border border-border">
                  <div className="relative">
                    <img
                      src={p.img}
                      alt={`${p.title} in ${p.location}`}
                      loading="lazy"
                      className="h-36 w-full object-cover"
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground">
                      Verified
                    </span>
                    <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-card text-primary">
                      <Heart className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {p.location}
                    </p>
                    <p className="mt-1.5 text-sm font-extrabold text-primary">
                      {p.price} <span className="text-xs font-medium text-muted-foreground">/ year</span>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Bed className="h-3 w-3" /> {p.beds} Beds
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bath className="h-3 w-3" /> {p.baths} Baths
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Sofa className="h-3 w-3" /> Furnished
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-border px-2 py-1.5 text-xs font-semibold text-foreground"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-primary px-2 py-1.5 text-xs font-semibold text-primary-foreground"
                      >
                        Contact Landlord
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Card>

          <section className="grid gap-4 rounded-2xl border border-border bg-accent p-5 sm:grid-cols-2 xl:grid-cols-5">
            {trust.map((t) => (
              <div key={t.title} className="flex items-start gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card text-primary">
                  <t.icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-bold text-foreground">{t.title}</div>
                  <div className="text-[11px] text-muted-foreground">{t.body}</div>
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
                <Wallet className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-foreground">Your RentEaze Wallet</h2>
            </div>
            <div className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">₦0.00</div>
            <p className="text-xs text-muted-foreground">Available Balance</p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
            >
              Top Up Wallet
            </button>
            <button
              type="button"
              className="mt-2 w-full rounded-xl border border-primary px-4 py-2.5 text-sm font-bold text-primary"
            >
              View Transactions
            </button>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
                  <BadgeCheck className="h-4 w-4" />
                </span>
                <h2 className="text-base font-bold text-foreground">Your Subscription</h2>
              </div>
              <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-primary">
                Active
              </span>
            </div>
            <div className="mt-4 text-sm font-bold text-foreground">Residential Lease Plan</div>
            <p className="text-xs text-muted-foreground">Next Renew Date: 12 Nov 2026</p>
            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-1 rounded-xl border border-primary px-4 py-2.5 text-sm font-bold text-primary"
            >
              Manage Subscription <ChevronRight className="h-4 w-4" />
            </button>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
