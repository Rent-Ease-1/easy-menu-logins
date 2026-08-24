import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Headphones,
  Lock,
  Phone,
  Mail,
  MapPin,
  User,
  Send,
  ClipboardList,
  Pencil,
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Share2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import contactHero from "@/assets/contact-hero.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact RentEaze — We're Here to Help You Rent Smarter" },
      {
        name: "description",
        content:
          "Questions about a listing, payment or agreement? Reach the RentEaze team by phone, email or WhatsApp, or send us a message and we'll reply within 24 hours.",
      },
      { property: "og:title", content: "Contact RentEaze — We're Here to Help" },
      {
        property: "og:description",
        content:
          "Get in touch with RentEaze support for listings, escrow payments, legal documents and landlord enquiries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const valueProps = [
  { icon: CheckCircle2, title: "Fast Response", body: "We reply to every enquiry within 24 hours." },
  { icon: Headphones, title: "Expert Support", body: "Real specialists who know rentals inside out." },
  { icon: Lock, title: "Safe & Secure", body: "Your information stays private and protected." },
];

const subjects = [
  "General enquiry",
  "Property listing",
  "Payments & escrow",
  "Legal & agreements",
  "List my property",
];

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    lines: ["+234 812 345 6789", "+234 909 876 5432"],
    note: ["Mon - Fri: 8am - 6pm", "Sat: 9am - 2pm"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["support@rentease.ng", "partnerships@rentease.ng"],
    note: ["We reply within", "24 hours"],
  },
  {
    icon: MapPin,
    title: "Office Address",
    lines: ["123 Freedom Way, Lekki Phase 1,", "Lagos, Nigeria."],
    note: ["Visit us by", "appointment"],
  },
];


const socials = [Facebook, Instagram, Twitter, Linkedin];

const faqs = [
  {
    q: "How do I list my property on RentEaze?",
    a: "Create a landlord account, click 'List Property', and follow the guided steps. Our team verifies each listing before it goes live.",
  },
  {
    q: "Is RentEaze safe to use?",
    a: "Yes. Every landlord and property is verified, and all rent is held in RentEaze Escrow until you confirm move-in.",
  },
  {
    q: "How are rental agreements handled?",
    a: "RentEaze generates a legally-binding tenancy agreement you can review and sign digitally from anywhere.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Bank transfer, debit card and USSD are all supported, with every payment protected by escrow.",
  },
  {
    q: "How can I report an issue?",
    a: "Use the live chat, email support@rentease.ng, or call our support line — we respond within 24 hours.",
  },
];


function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SiteHeader active="Contact" />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-secondary/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur">
              <Headphones className="h-3.5 w-3.5" /> Contact Us
            </span>
            <h1 className="mt-5 text-balance text-[2.2rem] font-extrabold leading-[1.03] tracking-[-0.03em] text-foreground sm:text-5xl">
              We're Here to Help You <span className="text-primary">Rent Smarter</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              Have a question, need assistance, or want to partner with us? Our team is ready to
              help you make your renting experience seamless and stress-free.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {valueProps.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur transition-shadow hover:shadow-[var(--shadow-card)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <h3 className="mt-3 text-sm font-extrabold text-foreground">{title}</h3>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-border shadow-[var(--shadow-search)]">
              <img
                src={contactHero}
                alt="Bright modern living room with a balcony and city view"
                width={1200}
                height={912}
                className="h-[280px] w-full object-cover sm:h-[380px] md:h-[460px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-deep/65 via-primary-deep/10 to-transparent" />
            </div>
            <div className="mt-4 rounded-2xl bg-primary p-5 text-primary-foreground shadow-[var(--shadow-card)] lg:absolute lg:-bottom-6 lg:left-5 lg:mt-0 lg:max-w-[18rem]">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
                  <Headphones className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold">Need immediate help?</p>
                  <p className="mt-1 text-[11px] leading-snug text-primary-foreground/85">
                    Chat with our support team or call us directly.
                  </p>
                </div>
              </div>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-foreground px-3 py-2.5 text-xs font-semibold text-primary transition-opacity hover:opacity-90">
                Start Live Chat <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* Form + Contact info */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-7">
            <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">Send Us a Message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent — we'll reply within 24 hours.");
                (e.target as HTMLFormElement).reset();
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field icon={User} label="Full Name" placeholder="Enter your full name" name="name" />
                <Field icon={Mail} label="Email Address" placeholder="Enter your email" name="email" type="email" />
                <Field icon={Phone} label="Phone Number (Optional)" placeholder="Enter your phone number" name="phone" />
                <label className="block">
                  <span className="text-xs font-semibold text-foreground">Subject</span>
                  <div className="relative mt-1.5">
                    <ClipboardList className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <select
                      name="subject"
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-9 text-sm text-foreground outline-none focus:border-primary"
                    >
                      <option value="" disabled>
                        What is your inquiry about?
                      </option>
                      {subjects.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-semibold text-foreground">Message</span>
                <div className="relative mt-1.5">
                  <Pencil className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Type your message here..."
                    className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
              </label>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-full"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div>
            <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">Contact Information</h2>
            <div className="mt-5 space-y-4">
              {contactInfo.map(({ icon: Icon, title, lines, note }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-foreground">{title}</h3>
                    {lines.map((l) => (
                      <p key={l} className="text-sm text-muted-foreground">
                        {l}
                      </p>
                    ))}
                  </div>
                  <div className="hidden shrink-0 text-right text-xs leading-relaxed text-muted-foreground sm:block">
                    {note.map((n) => (
                      <p key={n}>{n}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Share2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-1 flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-bold text-foreground">Follow Us</h3>
                  <div className="flex gap-2.5">
                    {socials.map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        aria-label="Follow RentEaze on social media"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ + Map */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* FAQ */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
            <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">Frequently Asked Questions</h2>
            <div className="mt-5 space-y-3">
              {faqs.map(({ q, a }, i) => {
                const open = openFaq === i;
                return (
                  <div key={q} className="overflow-hidden rounded-xl border border-border bg-card">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                    >
                      <span className="text-sm font-semibold text-foreground">{q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    {open && (
                      <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{a}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-primary/40 bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent">
              View All FAQs <HelpCircle className="h-4 w-4 text-primary" />
            </button>
          </div>


          {/* Map */}
          <div>
            <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">Our Location</h2>
            <div className="relative mt-5 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="RentEaze office location in Lekki, Lagos"
                loading="lazy"
                className="h-[320px] w-full"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.44%2C6.42%2C3.49%2C6.46&layer=mapnik&marker=6.4474,3.4691"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-card p-4 shadow-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-foreground">RentEaze Headquarters</p>
                    <p className="text-xs text-muted-foreground">
                      123 Freedom Way, Lekki Phase 1, Lagos, Nigeria.
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.openstreetmap.org/?mlat=6.4474&mlon=3.4691#map=16/6.4474/3.4691"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Get Directions <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-16">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-secondary/60 p-6 text-center sm:p-8 md:flex-row md:text-left">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent">
            <Send className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-extrabold text-foreground sm:text-xl">
              Still have questions?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We're always here to help you find the perfect place to call home.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <MessageCircle className="h-4 w-4" /> Chat with Us
          </button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  ...props
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-foreground">{label}</span>
      <div className="relative mt-1.5">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          {...props}
          className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>
    </label>
  );
}
