import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

import { Logo } from "./site-header";

const quickLinkPaths: Record<string, string> = {
  Home: "/",
  Properties: "/properties",
  "How It Works": "/how-it-works",
  "About Us": "/about",
  Contact: "/contact",
};

const footerCols = [
  { title: "Quick Links", links: ["Home", "Properties", "How It Works", "About Us", "Contact"] },
  {
    title: "For Tenants",
    links: ["Find Properties", "Create Account", "Pay Rent", "Our Guarantees", "FAQs"],
  },
  { title: "For Landlords", links: ["List Property", "Rent Management", "FAQs"] },
  { title: "For Lawyers", links: ["Handle Cases", "My Cases", "Lawyer Resources"] },
];

export function SiteFooter() {
  return (
    <footer className="bg-footer py-12 text-footer-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-[1.2fr_repeat(4,0.8fr)_1.3fr] lg:gap-10">
        <div>
          <Logo inverted />
          <p className="mt-4 text-xs text-footer-foreground/70">
            The smarter way to rent. Safe. Secure. Transparent.
          </p>
          <div className="mt-5 flex gap-4 text-footer-foreground/80">
            <Facebook className="h-4 w-4" />
            <Twitter className="h-4 w-4" />
            <Instagram className="h-4 w-4" />
            <Linkedin className="h-4 w-4" />
            <Youtube className="h-4 w-4" />
          </div>
        </div>
        {footerCols.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-xs text-footer-foreground/70 hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-sm font-bold">Subscribe for Updates</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-4 w-full rounded-lg bg-card px-4 py-2.5 text-xs text-foreground outline-none"
          />
          <button className="mt-3 w-full rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground">
            Subscribe
          </button>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-footer-foreground/10 px-6 pt-6 text-center text-[11px] text-footer-foreground/60">
        © 2026 RentEaze. All rights reserved.
      </div>
    </footer>
  );
}
