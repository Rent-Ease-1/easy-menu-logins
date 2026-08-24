import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Scale,
  Users,
  Building2,
  MessageSquare,
  Settings,
  AlertTriangle,
  CheckCircle2,
  Clock,
  PenLine,
  CalendarDays,
  Bell,
  HelpCircle,
  BarChart3,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Download,
  FileSignature,
  Lock,
  Sparkles,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Card, DashboardShell, type NavItem } from "@/components/dashboard-shell";
import lawyerHero from "@/assets/lawyer-hero.jpg";

export const Route = createFileRoute("/dashboard/lawyer")({
  head: () => ({
    meta: [
      { title: "Lawyer Dashboard — RentEaze" },
      {
        name: "description",
        content:
          "Review, verify and manage lawyer-backed rental agreements, documents and disputes from the RentEaze lawyer dashboard.",
      },
      { property: "og:title", content: "Lawyer Dashboard — RentEaze" },
      {
        property: "og:description",
        content: "Agreement review, document verification and compliance tools for RentEaze lawyers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LawyerDashboard,
});

const NAV: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Contract Management", icon: FileText },
  { label: "Tenant Management", icon: Users },
  { label: "Landlord Management", icon: Building2 },
  { label: "Document Verification", icon: ShieldCheck },
  { label: "Communications", icon: MessageSquare, badge: 5 },
  { label: "Dispute Management", icon: Scale },
  { label: "Reports & Analytics", icon: BarChart3 },
  { label: "Calendar", icon: CalendarDays },
  { label: "Notifications", icon: Bell, badge: 3 },
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: HelpCircle },
];

const stats = [
  { icon: FileText, value: "24", label: "Total Assigned Agreements" },
  { icon: Clock, value: "8", label: "Pending Review" },
  { icon: CheckCircle2, value: "10", label: "Approved" },
  { icon: PenLine, value: "4", label: "Under Revision" },
  { icon: AlertTriangle, value: "2", label: "Requires Attention" },
  { icon: CalendarDays, value: "6", label: "Expiring Soon" },
];

const agreements = [
  {
    id: "AG-2026-0456",
    property: "Lekki Phase 1 Duplex",
    landlord: "Mrs. Amaka Okafor",
    tenant: "Chinedu Ezekwe",
    status: "Pending Review",
    due: "20 May 2026",
  },
  {
    id: "AG-2026-0455",
    property: "Victoria Island Apartment",
    landlord: "Mr. Tunde Lawal",
    tenant: "Ngozi Eze",
    status: "Under Revision",
    due: "18 May 2026",
  },
  {
    id: "AG-2026-0454",
    property: "Ikoyi Terrace",
    landlord: "Mr. Kunle Adeyemi",
    tenant: "Fatima Bello",
    status: "Pending Review",
    due: "17 May 2026",
  },
  {
    id: "AG-2026-0453",
    property: "Surulere Flat",
    landlord: "Mrs. Bolanle Akinyemi",
    tenant: "Samuel Orji",
    status: "Approved",
    due: "15 May 2026",
  },
  {
    id: "AG-2026-0452",
    property: "Ajah Studio Apartment",
    landlord: "Mr. Daniel Efiong",
    tenant: "Peace Abiola",
    status: "Awaiting Tenant",
    due: "14 May 2026",
  },
];

const statusClass: Record<string, string> = {
  "Pending Review": "bg-star/15 text-foreground",
  "Under Revision": "bg-primary/10 text-primary",
  Approved: "bg-primary/15 text-primary",
  "Awaiting Tenant": "bg-muted text-muted-foreground",
};

const quickActions = [
  { icon: FileSignature, title: "Review Agreement", body: "Review and take action on agreements" },
  { icon: ShieldCheck, title: "Verify Documents", body: "Verify landlord and tenant documents" },
  { icon: MessageSquare, title: "Send Message", body: "Communicate with tenants or landlords" },
  { icon: PenLine, title: "Create Legal Note", body: "Add notes or legal observations" },
  { icon: BarChart3, title: "Generate Report", body: "Download agreement or legal reports" },
];

const notifications = [
  {
    icon: FileText,
    title: "New agreement submitted",
    meta: "Agreement #AG-2026-0456",
    time: "10:30 AM",
  },
  {
    icon: MessageSquare,
    title: "Tenant replied to your message",
    meta: "Regarding Agreement #AG-2026-0441",
    time: "09:15 AM",
  },
  {
    icon: AlertTriangle,
    title: "Document expiring soon",
    meta: "Landlord ID for Property #PR-1024",
    time: "Yesterday",
  },
  {
    icon: CheckCircle2,
    title: "Agreement approved",
    meta: "Agreement #AG-2026-0432",
    time: "Yesterday",
  },
];

const summary = [
  { name: "Pending Review", value: 8, pct: "33%", color: "var(--color-star)" },
  { name: "Approved", value: 10, pct: "42%", color: "var(--color-primary)" },
  { name: "Under Revision", value: 4, pct: "17%", color: "var(--color-silver-dark)" },
  { name: "Others", value: 2, pct: "8%", color: "var(--color-muted-foreground)" },
];

const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
// May 2026 grid starting Sunday 26 Apr; `muted` marks days outside May.
const CALENDAR: { day: number; muted?: boolean }[] = [
  ...[26, 27, 28, 29, 30].map((day) => ({ day, muted: true })),
  ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1 })),
];
const TODAY = 16;

const heroBadges = [
  { icon: Lock, label: "Secure & Confidential" },
  { icon: Scale, label: "Legally Compliant" },
  { icon: Sparkles, label: "Trusted by RentEaze" },
];

function LawyerDashboard() {
  return (
    <DashboardShell
      role="lawyer"
      title="Lawyer Dashboard"
      subtitle="Review, verify and manage rental agreements"
      nav={NAV}
      searchPlaceholder="Search agreements, tenants, landlords..."
      headerPill={{ icon: Scale, label: "Lawyer Dashboard" }}
      promo={{
        heading: "Your role ensures safe, legal & stress-free renting for everyone.",
        cta: "Learn More",
      }}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <section className="relative overflow-hidden rounded-2xl border border-border bg-muted">
            <img
              src={lawyerHero}
              alt="Calm modern living room representing verified RentEaze rentals"
              width={1600}
              height={640}
              className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover md:block"
            />
            <div className="absolute inset-y-0 right-1/2 hidden w-40 bg-gradient-to-r from-transparent to-muted md:block" />
            <div className="relative max-w-xl p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
                Welcome back,
                <br />
                Barr. Adaeze Nwosu
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Review, verify and manage agreements with confidence and integrity.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {heroBadges.map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-xl bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-sm"
                  >
                    <b.icon className="h-3.5 w-3.5 text-muted-foreground" /> {b.label}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 2xl:grid-cols-6">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">
                  {s.value}
                </div>
                <div className="mt-0.5 text-xs font-medium text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <Card title="Agreement Overview" action="View All Agreements">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="py-2 pr-4 font-semibold">Agreement ID</th>
                    <th className="py-2 pr-4 font-semibold">Property</th>
                    <th className="py-2 pr-4 font-semibold">Landlord</th>
                    <th className="py-2 pr-4 font-semibold">Tenant</th>
                    <th className="py-2 pr-4 font-semibold">Status</th>
                    <th className="py-2 pr-4 font-semibold">Due Date</th>
                    <th className="py-2 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {agreements.map((a) => (
                    <tr key={a.id} className="border-b border-border/60 last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">{a.id}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{a.property}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{a.landlord}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{a.tenant}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[a.status]}`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4 whitespace-nowrap text-muted-foreground">{a.due}</td>
                      <td className="py-3">
                        <button
                          type="button"
                          aria-label={`View agreement ${a.id}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Quick Actions">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
              {quickActions.map((a) => (
                <button
                  key={a.title}
                  type="button"
                  className="rounded-xl border border-border p-4 text-left transition-colors hover:border-foreground/30 hover:bg-muted/60"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <span className="mt-3 block text-sm font-bold text-foreground">{a.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{a.body}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-bold text-foreground">Calendar</h2>
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <ChevronLeft className="h-4 w-4" />
                May 2026
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
              {WEEK.map((d) => (
                <div key={d} className="py-1 font-semibold text-muted-foreground">
                  {d}
                </div>
              ))}
              {CALENDAR.map((c, i) => (
                <div
                  key={`${c.day}-${i}`}
                  className={`flex h-8 items-center justify-center rounded-full ${
                    c.muted
                      ? "text-muted-foreground/50"
                      : c.day === TODAY
                        ? "bg-foreground font-bold text-background"
                        : "text-foreground"
                  }`}
                >
                  {c.day}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:underline"
            >
              View Full Calendar <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </section>

          <Card title="Notifications" action="View All">
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li key={n.title} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                    <n.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-foreground">{n.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{n.meta}</div>
                  </div>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{n.time}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="My Summary" action="This Month">
            <div className="flex items-center gap-4">
              <div className="relative h-32 w-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={summary}
                      dataKey="value"
                      innerRadius="68%"
                      outerRadius="100%"
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                      isAnimationActive={false}
                    >
                      {summary.map((s) => (
                        <Cell key={s.name} fill={s.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold text-foreground">24</span>
                  <span className="text-[10px] text-muted-foreground">Total</span>
                </div>
              </div>
              <ul className="min-w-0 flex-1 space-y-2">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 text-xs">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="min-w-0 flex-1 truncate text-muted-foreground">{s.name}</span>
                    <span className="shrink-0 font-semibold text-foreground">
                      {s.value} ({s.pct})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="mt-4 flex w-full items-center justify-between rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Download Summary Report <Download className="h-4 w-4" />
            </button>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
