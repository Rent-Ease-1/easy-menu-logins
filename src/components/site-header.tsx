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
            className="hidden items-center gap-1.5 rounded-lg border border-primary px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-accent sm:flex sm:px-5 sm:text-sm"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:px-5 sm:text-sm"
          >
            <User className="h-4 w-4" /> Sign Up
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
        <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm font-medium ${
                l.label === active ? "text-primary" : "text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2.5 border-t border-border pt-4 pb-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-primary px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <User className="h-4 w-4" /> Sign Up
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
