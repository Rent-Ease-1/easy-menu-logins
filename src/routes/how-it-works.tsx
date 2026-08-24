import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Cpu,
  Eye,
  FileCheck2,
  FileSignature,
  Headphones,
  Home,
  KeyRound,
  Leaf,
  MessageSquare,
  Scale,
  ScanSearch,
  ShieldCheck,
  Wallet,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";

import { SiteHeader } from "@/components/site-header";

import { SiteFooter } from "@/components/site-footer";
import heroHome from "@/assets/hero-home.jpg";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How RentEaze Works — Rent a Home in 5 Simple Steps" },
      {
        name: "description",
        content:
          "From finding a home to moving in: search verified listings, complete KYC, get a lawyer-reviewed agreement, pay via RentEaze Escrow and move in protected.",
      },
      { property: "og:title", content: "How RentEaze Works — Simple, Secure Renting in Nigeria" },
      {
        property: "og:description",
        content:
          "Five simple steps to a verified home: search, apply & verify, legal review, secure escrow payment, then move in with full protection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

const heroChips = [
  { icon: ShieldCheck, label: "Verified\nProperties" },
  { icon: BadgeCheck, label: "Secure\nPayments" },
  { icon: Scale, label: "Legal\nProtection" },
  { icon: Cpu, label: "AI-Powered\nAssistance" },
];

const steps = [
  {
    icon: Home,
    title: "Search & Discover",
    body: "Find verified properties that match your needs.",
  },
  {
    icon: FileCheck2,
    title: "Apply & Verify",
    body: "Submit your application and complete KYC verification.",
  },
  {
    icon: Scale,
    title: "Legal Review",
    body: "Property lawyer reviews and generates a digital agreement.",
  },
  {
    icon: Wallet,
    title: "Secure Payment",
    body: "Pay securely via RentEaze Escrow while your agreement is being finalized.",
  },
  {
    icon: KeyRound,
    title: "Move In & Enjoy",
    body: "Get verified, documented and legally protected accommodation.",
  },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    body: "All listings are verified and authentic",
  },
  { icon: Scale, title: "Legal Protection", body: "Lawyer-backed documentation" },
  { icon: BadgeCheck, title: "Secure Payments", body: "Pay safely with RentEaze Escrow" },
  {
    icon: MessageSquare,
    title: "AI Property Assistant",
    body: "Get instant help and recommendations",
  },
  { icon: Wallet, title: "RentEaze Wallet", body: "Save towards rent and get financial control" },
  { icon: ScanSearch, title: "Fraud Detection", body: "AI-powered threat monitoring" },
  {
    icon: FileSignature,
    title: "Digital Agreements",
    body: "Signed and securely stored agreements",
  },
  { icon: Eye, title: "Verified Listings", body: "Physically inspected before going live" },
  { icon: Headphones, title: "Dedicated Support", body: "Real people ready to help" },
  { icon: Cpu, title: "Complete Transparency", body: "No hidden charges or surprises" },
];

function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
        {children}
      </h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
      {sub && (
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{sub}</p>
      )}
    </div>
  );
}

function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader active="How It Works" />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-accent/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-secondary/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> How It Works
            </span>
            <h1 className="mt-5 text-balance text-[2.2rem] font-extrabold leading-[1.03] tracking-[-0.03em] text-foreground sm:text-5xl">
              Find Your Next Home <span className="text-primary">With RentEaze</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              A smarter, safer and easier way to rent properties in Nigeria — five simple steps from
              search to move-in.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {heroChips.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-2xl border border-border bg-card/75 px-3.5 py-2.5 backdrop-blur transition-shadow hover:shadow-[var(--shadow-card)]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <span className="whitespace-pre-line text-[11px] font-semibold leading-tight text-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-border shadow-[var(--shadow-search)]">
              <img
                src={heroHome}
                alt="Modern Nigerian home with palm trees at dusk"
                width={1200}
                height={900}
                className="h-[260px] w-full object-cover sm:h-[360px] md:h-[440px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-deep/55 via-transparent to-transparent" />
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-[var(--shadow-card)] backdrop-blur lg:absolute lg:-bottom-6 lg:right-5 lg:mt-0 lg:max-w-[17rem]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">Your Safe Rental Partner</p>
                <p className="text-[11px] text-muted-foreground">
                  Trusted by thousands of Nigerians
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Steps */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading sub="From finding a home to moving in — we make renting simple, secure and stress-free.">
          How RentEaze Works
        </SectionHeading>

        {/* Mobile: vertical numbered timeline */}
        <ol className="relative mt-8 lg:hidden">
          <span
            aria-hidden
            className="absolute bottom-10 left-5 top-10 w-0.5 rounded-full bg-primary/25"
          />
          {steps.map(({ icon: Icon, title, body }, i) => {
            const isActive = activeStep === i;
            return (
              <li key={title} className="relative pb-4 last:pb-0">
                <button
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => setActiveStep(i)}
                  className="flex w-full items-stretch gap-3 text-left"
                >
                  <span
                    className={`z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-full text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-primary-deep text-primary-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`flex min-w-0 flex-1 items-center gap-3 rounded-2xl border bg-card p-3 transition-all ${
                      isActive
                        ? "border-primary shadow-[var(--shadow-card)]"
                        : "border-border shadow-sm"
                    }`}
                  >
                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isActive ? "bg-primary" : "bg-accent"
                      }`}
                    >
                      <Icon
                        className={`h-7 w-7 ${isActive ? "text-primary-foreground" : "text-primary"}`}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-extrabold text-foreground">{title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                        {body}
                      </span>
                    </span>
                    <ChevronRight
                      className={`h-5 w-5 shrink-0 transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ol>


        {/* Desktop: horizontal flow */}
        <ol className="mt-12 hidden items-stretch gap-2 lg:flex">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="flex flex-1 items-stretch gap-2">
              <div className="relative flex flex-1 flex-col rounded-2xl border border-border bg-card px-4 pb-6 pt-8 text-center shadow-[var(--shadow-card)]">

                <span className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary-deep text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                  <Icon className="h-7 w-7 text-primary" />
                </span>
                <h3 className="mt-4 text-sm font-extrabold text-foreground">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight aria-hidden className="h-4 w-4 shrink-0 self-center text-primary" />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Why choose */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14">
        <SectionHeading>Why Choose RentEaze?</SectionHeading>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-secondary/40 p-4 text-center transition-shadow hover:shadow-[var(--shadow-card)] sm:p-5"
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <h3 className="mt-3 text-xs font-bold text-foreground sm:text-sm">{title}</h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-14">
        <div
          className="flex flex-col items-center gap-5 rounded-2xl p-6 sm:p-8 md:flex-row"
          style={{ background: "var(--gradient-purple)" }}
        >
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
            <Home className="h-7 w-7 text-primary-foreground" />
            <Leaf className="absolute bottom-2 right-2 h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-extrabold text-primary-foreground sm:text-2xl">
              Ready to Find Your Next Home?
            </h2>
            <p className="mt-2 text-xs text-primary-foreground/85 sm:text-sm">
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
