import { Link } from "@tanstack/react-router";
import { ShieldCheck, FileText, Wallet, Headphones } from "lucide-react";
import type { ReactNode } from "react";

import { Logo } from "@/components/site-header";
import authAside from "@/assets/hero-home.jpg";

const perks = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    body: "Every listing is inspected and verified for your peace of mind.",
  },
  {
    icon: FileText,
    title: "Secure Agreements",
    body: "Digital rental agreements that are safe and legally compliant.",
  },
  {
    icon: Wallet,
    title: "Easy Payments",
    body: "Make payments, track history and get rent reminders.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    body: "Our support team is always here to help you.",
  },
];

export function AuthLayout({
  children,
  altPrompt,
  altLabel,
  altTo,
}: {
  children: ReactNode;
  altPrompt: string;
  altLabel: string;
  altTo: "/login" | "/register";
}) {
  return (
    <div className="min-h-screen bg-gradient-purple lg:grid lg:grid-cols-[minmax(0,440px)_1fr]">
      <aside className="relative flex flex-col gap-8 overflow-hidden px-6 py-10 text-footer-foreground lg:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-glow/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
        />
        <Link to="/" className="w-fit rounded-lg bg-background px-3 py-2 shadow-lg">
          <Logo />
        </Link>
        <div className="relative">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-4xl">
            Find. Rent. Live.
            <br />
            <span className="text-accent">With Ease.</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-footer-foreground/80">
            Join RentEaze today and discover verified properties, secure agreements, and a better
            renting experience.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ring-footer-foreground/20">
          <img
            src={authAside}
            alt="Bright modern living room in a verified RentEaze apartment"
            className="h-52 w-full object-cover lg:h-64"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/50 to-transparent" />
        </div>
        <ul className="space-y-4 rounded-[1.5rem] bg-background/95 p-5 text-foreground shadow-[var(--shadow-card)]">
          {perks.map((p) => (
            <li key={p.title} className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-bold">{p.title}</div>
                <p className="text-xs leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-auto text-center text-sm text-footer-foreground/70">
          Trusted by thousands of renters across Nigeria.
        </p>
      </aside>

      <main className="px-4 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-2xl items-center justify-end gap-3">
          <span className="text-sm text-footer-foreground/85">{altPrompt}</span>
          <Link
            to={altTo}
            className="rounded-lg bg-background px-4 py-2 text-sm font-semibold text-primary shadow-md transition-transform hover:scale-[1.04]"
          >
            {altLabel}
          </Link>
        </div>
        <div className="mx-auto mt-6 max-w-2xl rounded-[1.75rem] border border-border bg-card p-5 shadow-2xl sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export function SocialButtons({ verb }: { verb: string }) {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or {verb} with</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {["Google", "Facebook"].map((p) => (
          <button
            key={p}
            type="button"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Continue with {p}
          </button>
        ))}
      </div>
    </div>
  );
}

export const fieldClass =
  "w-full rounded-xl border border-input bg-background py-3 pl-11 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";
