import { createFileRoute } from "@tanstack/react-router";
import {
  Target,
  Eye,
  Gem,
  CheckCircle2,
  Play,
  ShieldCheck,
  Home,
  Users,
  FileText,
  Lock,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  Search,
  ShieldPlus,
  Handshake,
  LifeBuoy,
  TrendingUp,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import aboutHero from "@/assets/about-hero.jpg";
import aboutStory from "@/assets/about-story.jpg";
import propApartmentVi from "@/assets/prop-apartment-vi.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About RentEaze — Building a Safer Rental Ecosystem in Nigeria" },
      {
        name: "description",
        content:
          "RentEaze is Nigeria's trusted rental platform connecting tenants with verified properties and landlords. Simple, safe and stress-free renting.",
      },
      { property: "og:title", content: "About RentEaze — Simple, Safe & Stress-Free Renting" },
      {
        property: "og:description",
        content:
          "Making renting simple, safe and stress-free for everyone. Verified properties, trusted landlords and secure agreements across Nigeria.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = ["Integrity", "Transparency", "Security", "Customer First", "Innovation"];

const stats = [
  { icon: Home, stat: "10,000+", label: "Verified Properties" },
  { icon: Users, stat: "25,000+", label: "Happy Users" },
  { icon: Users, stat: "5,000+", label: "Trusted Landlords" },
  { icon: FileText, stat: "15,000+", label: "Agreements Created" },
  { icon: Lock, stat: "100%", label: "Secure & Trusted" },
];

const impactFeatures = [
  { icon: ShieldCheck, title: "Safer Transactions", body: "Payments and deposits protected end-to-end." },
  { icon: BadgeCheck, title: "Verified Properties", body: "Every listing checked before it goes live." },
  { icon: Sparkles, title: "Transparency", body: "Clear terms, no hidden fees, no surprises." },
  { icon: LifeBuoy, title: "Support That Cares", body: "Real people ready to help at every step." },
];

const processSteps = [
  { icon: Search, title: "Verify", body: "We verify every property, landlord and tenant." },
  { icon: ShieldPlus, title: "Protect", body: "Secure payments and protected agreements." },
  { icon: Handshake, title: "Connect", body: "Tenants and landlords matched with confidence." },
  { icon: LifeBuoy, title: "Support", body: "Dedicated help throughout the journey." },
  { icon: TrendingUp, title: "Improve", body: "We learn and refine with every rental." },
];

const banks = ["GTBank", "Access Bank", "FirstBank", "Zenith Bank", "Stanbic IBTC"];

const team = [
  {
    photo: team1,
    name: "Chidi Okafor",
    role: "Co-Founder & CEO",
    bio: "Chidi leads RentEaze with a decade of experience in Nigerian real estate, driven to make renting fair and transparent.",
  },
  {
    photo: team2,
    name: "Amara Eze",
    role: "Co-Founder & COO",
    bio: "Amara oversees operations and customer experience, ensuring every tenant and landlord is supported end-to-end.",
  },
  {
    photo: team3,
    name: "Tunde Bakare",
    role: "Head of Technology",
    bio: "Tunde builds the platform that keeps listings verified, payments secure and agreements seamless.",
  },
  {
    photo: team4,
    name: "Ngozi Adewale",
    role: "Head of Legal & Trust",
    bio: "Ngozi shapes our tenancy agreements and verification standards so every rental is protected by law.",
  },
  {
    photo: team5,
    name: "Femi Adebayo",
    role: "Head of Partnerships",
    bio: "Femi grows our network of trusted landlords and partners across Nigeria's major cities.",
  },
];

function TeamCard({
  photo,
  name,
  role,
  bio,
}: {
  photo: string;
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)] sm:flex-row sm:text-left">
      <img
        src={photo}
        alt={name}
        loading="lazy"
        width={96}
        height={96}
        className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-accent sm:h-20 sm:w-20"
      />
      <div className="mt-4 sm:mt-0 sm:ml-5">
        <h3 className="text-base font-extrabold text-foreground">{name}</h3>
        <p className="text-sm font-semibold text-primary">{role}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader active="About Us" />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-secondary/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> About RentEaze
            </span>
            <h1 className="mt-5 text-balance text-[2.2rem] font-extrabold leading-[1.03] tracking-[-0.03em] text-foreground sm:text-5xl">
              Making Renting Simple, Safe &amp; <span className="text-primary">Stress-Free</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              RentEaze is Nigeria's trusted platform connecting tenants with verified properties and
              landlords. We remove the guesswork, middlemen and risk from renting — so you can find a
              home you can trust.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5">
                <Play className="h-4 w-4 fill-current" /> Our Story
              </button>
              <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground">
                <BadgeCheck className="h-4 w-4 text-primary" /> 10,000+ verified homes
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-border shadow-[var(--shadow-search)]">
              <img
                src={aboutHero}
                alt="Modern Nigerian living room overlooking an apartment complex"
                width={1200}
                height={900}
                className="h-[260px] w-full object-cover sm:h-[360px] md:h-[440px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-primary-deep/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-card/90 p-4 shadow-[var(--shadow-card)] backdrop-blur sm:inset-x-5 sm:bottom-5 sm:max-w-sm">
                <p className="text-sm font-bold text-foreground">Verified. Secure. Transparent.</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">
                  Every property and agreement on RentEaze is verified for your peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Mission / Vision / Values */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Our Mission",
              body: "To simplify the way people rent in Nigeria — making it easy, secure and transparent for tenants and landlords alike.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              body: "To become Africa's most trusted rental marketplace, transforming how people find, rent and manage homes.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)] sm:p-8"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)] sm:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
              <Gem className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-extrabold text-foreground">Our Values</h3>
            <ul className="mx-auto mt-3 inline-block space-y-2 text-left">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Statistics bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-primary sm:grid-cols-3 lg:grid-cols-5">
          {stats.map(({ icon: Icon, stat, label }) => (
            <div key={label} className="bg-primary px-4 py-6 text-center sm:py-8">
              <Icon className="mx-auto h-7 w-7 text-primary-foreground/80" />
              <div className="mt-2 text-xl font-extrabold text-primary-foreground sm:text-2xl">
                {stat}
              </div>
              <p className="mt-1 text-[11px] text-primary-foreground/75 sm:text-xs">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Impact */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Building Trust. Creating Better Rental Experiences.
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
        </div>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative">
            <img
              src={propApartmentVi}
              alt="Modern multi-story apartment building at twilight"
              loading="lazy"
              width={1200}
              height={900}
              className="h-[280px] w-full rounded-2xl object-cover shadow-[var(--shadow-card)] sm:h-[360px]"
            />
            <button className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-opacity hover:opacity-90">
              <Play className="h-6 w-6 fill-current" />
            </button>
          </div>
          <div>
            <div className="space-y-5">
              {impactFeatures.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Learn More <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              How We Ensure a Safe & Reliable Experience
            </p>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {processSteps.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="relative rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]"
              >
                <span className="absolute right-3 top-3 text-xs font-bold text-primary/40">
                  {i + 1}
                </span>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-foreground">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-center gap-6 rounded-2xl bg-secondary/50 p-5 sm:p-8 md:grid-cols-[0.85fr_1.15fr] md:gap-10">
          <img
            src={aboutStory}
            alt="Nigerian couple browsing rental homes on a laptop"
            loading="lazy"
            width={1000}
            height={800}
            className="h-56 w-full rounded-xl object-cover shadow-[var(--shadow-card)] sm:h-64 md:h-[240px]"
          />
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Our <span className="text-primary">Story</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              RentEaze was born from a simple idea — renting a home in Nigeria should be easy, safe
              and transparent. We saw a system where tenants and landlords struggle with trust,
              verification, legal protection and payment security.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              So we built RentEaze: a digital ecosystem that connects everyone, removes middlemen,
              and uses technology to make renting better.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Meet the Team</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            The People Behind RentEaze
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.slice(0, 3).map((m) => (
            <TeamCard key={m.name} {...m} />
          ))}
        </div>
        <div className="mx-auto mt-5 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
          {team.slice(3).map((m) => (
            <TeamCard key={m.name} {...m} />
          ))}
        </div>
      </section>

      {/* Final CTA banner */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div
          className="flex flex-col items-center gap-5 rounded-2xl p-6 sm:p-8 md:flex-row"
          style={{ background: "var(--gradient-cta)" }}
        >
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
            <Home className="h-7 w-7 text-primary-foreground" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-extrabold text-primary-foreground sm:text-2xl">
              Ready to experience stress-free renting?
            </h2>
            <p className="mt-2 text-xs text-primary-foreground/85 sm:text-sm">
              Join thousands of Nigerians who trust RentEaze to find, rent and manage homes with
              confidence.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-card px-6 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90">
            Find Properties <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-16">
        <p className="text-center text-xs text-muted-foreground sm:text-sm">
          Trusted by individuals, families and professionals across Nigeria.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {banks.map((b) => (
            <span
              key={b}
              className="text-sm font-extrabold tracking-tight text-muted-foreground/50 grayscale transition-colors hover:text-muted-foreground"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
