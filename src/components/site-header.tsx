import { Link } from "@tanstack/react-router";
import { User, Menu, Bell, X } from "lucide-react";
import { useState } from "react";

import logoWhite from "../assets/renteaze-logo-white.png";
import logoDark from "../assets/renteaze-logo-dark.png";

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <img
      src={inverted ? logoWhite : logoDark}
      alt="RentEaze — Simplifying Rentals in Nigeria"
      className="h-10 w-auto shrink-0 object-contain sm:h-12"
    />
  );
}

export function SiteHeader({ active = "Home" }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-12 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                l.label === active ? "text-primary" : "text-foreground"
              }`}
            >
              {l.label}
              {l.label === active && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <button
            aria-label="Notifications"
            className="relative hidden p-1.5 text-foreground hover:text-primary sm:block"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
              3
            </span>
          </button>
          <Link
            to="/login"
            className="hidden items-center gap-1.5 rounded-xl border border-primary/60 px-4 py-2.5 text-xs font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-accent hover:shadow-md sm:flex sm:px-5 sm:text-sm"
          >
            <LogIn className="h-4 w-4" /> Sign In
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-purple px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:opacity-95 hover:shadow-lg active:translate-y-0 sm:px-5 sm:text-sm"
          >
            <UserPlus className="h-4 w-4" /> Sign Up
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="p-1.5 text-foreground lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-3 shadow-[var(--shadow-card)] lg:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                l.label === active
                  ? "bg-accent text-primary"
                  : "text-foreground hover:bg-accent/60 hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-4 rounded-2xl border border-primary/25 bg-accent/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Your account
            </p>
            <p className="mt-1 text-sm text-foreground">
              Sign in to track applications, or create a free RentEaze account.
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-purple px-4 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:opacity-95 active:scale-[0.99]"
              >
                <UserPlus className="h-4 w-4" /> Create Free Account
              </Link>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-primary bg-background px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent"
              >
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            </div>
          </div>
        </nav>
      )}

    </header>
  );
}
