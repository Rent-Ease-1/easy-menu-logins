import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  BadgeCheck,
  Bell,
  ChevronDown,
  ChevronRight,
  Home,
  Leaf,
  LogOut,
  Menu,
  Search,
  X,
  type LucideIcon,
} from "lucide-react";

import {
  clearDemoSession,
  getDemoSession,
  ROLE_DASHBOARDS,
  type DemoRole,
  type DemoSession,
} from "@/lib/demo-accounts";
import avatarTenant from "@/assets/team-4.jpg";
import avatarLandlord from "@/assets/team-1.jpg";
import avatarLawyer from "@/assets/team-2.jpg";

export type NavItem = { label: string; icon: LucideIcon; badge?: number };

export type PromoCard = {
  image?: string;
  heading: string;
  body?: string;
  cta: string;
};

const ROLE_PROFILE: Record<
  DemoRole,
  { name: string; title: string; avatar: string; verified: boolean }
> = {
  tenant: { name: "Ngozi Eze", title: "Tenant", avatar: avatarTenant, verified: false },
  landlord: { name: "Adebayo S.", title: "Landlord", avatar: avatarLandlord, verified: false },
  lawyer: {
    name: "Barr. Adaeze Nwosu",
    title: "Verified Lawyer",
    avatar: avatarLawyer,
    verified: true,
  },
};

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary">
        <Home className="h-5 w-5 text-sidebar-primary-foreground" strokeWidth={2.2} />
        <Leaf className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 text-sidebar-primary-foreground" />
      </span>
      <span className="leading-none">
        <span
          className={`block text-lg font-extrabold tracking-tight ${
            dark ? "text-sidebar-foreground" : "text-foreground"
          }`}
        >
          Rent<span className="text-sidebar-primary">Êaze</span>
        </span>
        <span
          className={`mt-1 block text-[9px] ${
            dark ? "text-sidebar-foreground/60" : "text-muted-foreground"
          }`}
        >
          Simplifying Rentals in Nigeria
        </span>
      </span>
    </div>
  );
}

function NavList({
  nav,
  active,
  onSelect,
  dark = false,
  soft = false,
}: {
  nav: NavItem[];
  active: string;
  onSelect: (label: string) => void;
  dark?: boolean;
  soft?: boolean;
}) {
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {nav.map((item) => {
        const Icon = item.icon;
        const isActive = item.label === active;
        const activeClass = dark
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : soft
            ? "bg-accent text-accent-foreground"
            : "bg-primary text-primary-foreground";
        const idleClass = dark
          ? "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          : "text-foreground/80 hover:bg-accent hover:text-accent-foreground";
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onSelect(item.label)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? activeClass : idleClass
            }`}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            <span className="flex-1 truncate text-left">{item.label}</span>
            {item.badge ? (
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                  dark
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : soft
                      ? "bg-muted-foreground/80 text-background"
                      : "bg-primary text-primary-foreground"
                }`}
              >
                {item.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}

function Promo({ promo, dark = false }: { promo: PromoCard; dark?: boolean }) {
  return (
    <div
      className={`mx-3 mb-3 overflow-hidden rounded-2xl border ${
        dark ? "border-sidebar-border bg-sidebar-accent" : "border-border bg-card"
      }`}
    >
      {promo.image ? (
        <img
          src={promo.image}
          alt=""
          loading="lazy"
          width={640}
          height={512}
          className="h-28 w-full object-cover"
        />
      ) : (
        <div className="h-20 w-full bg-gradient-green" />
      )}
      <div className="p-4">
        <h3
          className={`text-sm font-bold ${dark ? "text-sidebar-accent-foreground" : "text-foreground"}`}
        >
          {promo.heading}
        </h3>
        {promo.body && (
          <p className={`mt-1 text-xs ${dark ? "text-sidebar-foreground/70" : "text-muted-foreground"}`}>
            {promo.body}
          </p>
        )}
        <button
          type="button"
          className={`mt-3 inline-flex w-full items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-bold ${
            dark
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {promo.cta} <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function AvatarBlock({
  profile,
  dark = false,
  compact = false,
}: {
  profile: (typeof ROLE_PROFILE)[DemoRole];
  dark?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <img
        src={profile.avatar}
        alt={profile.name}
        loading="lazy"
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
      {!compact && (
        <div className="min-w-0 leading-tight">
          <div
            className={`flex items-center gap-1 truncate text-sm font-semibold ${
              dark ? "text-sidebar-foreground" : "text-foreground"
            }`}
          >
            {profile.name}
            {profile.verified && <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />}
          </div>
          <div className={`text-xs ${dark ? "text-sidebar-foreground/60" : "text-muted-foreground"}`}>
            {profile.title}
          </div>
        </div>
      )}
    </div>
  );
}

function BellButton() {
  return (
    <button aria-label="Notifications" className="relative shrink-0 p-1.5 text-foreground">
      <Bell className="h-5 w-5" />
      <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
        3
      </span>
    </button>
  );
}

export function DashboardShell({
  role,
  title,
  subtitle,
  nav,
  searchPlaceholder = "Search...",
  headerPill,
  promo,
  children,
}: {
  role: DemoRole;
  title: string;
  subtitle: string;
  nav: NavItem[];
  searchPlaceholder?: string;
  headerPill?: { icon: LucideIcon; label: string };
  promo?: PromoCard;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const [session, setSession] = useState<DemoSession | null>(null);
  const [active, setActive] = useState(nav[0]?.label ?? "Dashboard");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const current = getDemoSession();
    if (!current) {
      navigate({ to: "/login", replace: true });
      return;
    }
    if (current.role !== role) {
      navigate({ to: ROLE_DASHBOARDS[current.role], replace: true });
      return;
    }
    setSession(current);
  }, [navigate, role]);

  function signOut() {
    clearDemoSession();
    navigate({ to: "/login", replace: true });
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading your dashboard…</p>
      </div>
    );
  }

  const profile = ROLE_PROFILE[role];
  const dark = role === "landlord";
  const soft = role === "lawyer";
  const onSelect = (label: string) => {
    setActive(label);
    setOpen(false);
  };

  const drawer = open && (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
      <div
        className={`absolute inset-y-0 left-0 flex w-72 flex-col ${
          dark ? "bg-sidebar text-sidebar-foreground" : "bg-background"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute right-3 top-4 z-10 ${dark ? "text-sidebar-foreground" : "text-foreground"}`}
        >
          <X className="h-5 w-5" />
        </button>
        {dark && (
          <div className="px-5 pt-5">
            <Logo dark />
          </div>
        )}
        <NavList nav={nav} active={active} onSelect={onSelect} dark={dark} soft={soft} />
        {promo && <Promo promo={promo} dark={dark} />}
        {dark && (
          <div className="border-t border-sidebar-border px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <AvatarBlock profile={profile} dark />
              <ChevronDown className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
            </div>
            <button
              type="button"
              onClick={signOut}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/85 transition-colors hover:bg-sidebar-accent"
            >
              <LogOut className="h-[18px] w-[18px]" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (dark) {
    // Landlord layout: full-height dark sidebar with logo inside.
    return (
      <div className="min-h-screen bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-sidebar text-sidebar-foreground lg:flex">
          <div className="px-5 py-5">
            <Logo dark />
          </div>
          <NavList nav={nav} active={active} onSelect={onSelect} dark />
          {promo && <Promo promo={promo} dark />}
          <div className="border-t border-sidebar-border px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <AvatarBlock profile={profile} dark />
              <ChevronDown className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
            </div>
            <button
              type="button"
              onClick={signOut}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/85 transition-colors hover:bg-sidebar-accent"
            >
              <LogOut className="h-[18px] w-[18px]" /> Logout
            </button>
          </div>
        </aside>

        {drawer}

        <div className="lg:pl-64">
          <header className="sticky top-0 z-30 border-b border-border bg-background">
            <div className="flex items-center gap-3 px-4 py-4 sm:px-6">
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="shrink-0 p-1.5 text-foreground lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                  {title} <span className="text-primary">💚</span>
                </h1>
                <p className="hidden truncate text-sm text-muted-foreground sm:block">{subtitle}</p>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-border px-4 py-2.5 xl:flex">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  className="w-56 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder={searchPlaceholder}
                />
              </div>
              <BellButton />
              <div className="hidden items-center gap-2 sm:flex">
                <AvatarBlock profile={profile} />
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
              <div className="sm:hidden">
                <AvatarBlock profile={profile} compact />
              </div>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6">{children}</main>
        </div>
      </div>
    );
  }

  // Tenant / Lawyer layout: top bar with logo + role pill, light sidebar below.
  return (
    <div className={`min-h-screen bg-muted/40 ${soft ? "theme-neutral" : ""}`}>
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="flex h-[72px] items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="shrink-0 p-1.5 text-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo />
          {headerPill && (
            <span className="ml-2 hidden items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground md:inline-flex">
              <headerPill.icon className="h-4 w-4" /> {headerPill.label}
            </span>
          )}
          <div className="flex-1" />
          <div className="hidden w-full max-w-sm items-center gap-2 rounded-full border border-border px-4 py-2.5 lg:flex">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              placeholder={searchPlaceholder}
            />
          </div>
          <BellButton />
          <div className="hidden items-center gap-2 sm:flex">
            <AvatarBlock profile={profile} />
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
          <div className="sm:hidden">
            <AvatarBlock profile={profile} compact />
          </div>
        </div>
      </header>

      <aside className="fixed bottom-0 left-0 top-[72px] z-30 hidden w-60 flex-col border-r border-border bg-background lg:flex">
        <NavList nav={nav} active={active} onSelect={onSelect} soft={soft} />
        {promo && <Promo promo={promo} />}
      </aside>

      {drawer}

      <div className="lg:pl-60">
        <main className="px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-muted-foreground">{label}</div>
          <div className="mt-0.5 break-words text-xl font-extrabold tracking-tight text-foreground">
            {value}
          </div>
          {delta && (
            <div className="mt-1.5 inline-flex rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-primary">
              ↑ {delta}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Card({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        {action && (
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            {action} <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
