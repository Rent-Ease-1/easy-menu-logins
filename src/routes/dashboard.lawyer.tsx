import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  PenLine,
  Scale,
  Users,
  MessageSquare,
  Settings,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { Card, DashboardShell, StatCard, type NavItem } from "@/components/dashboard-shell";

export const Route = createFileRoute("/dashboard/lawyer")({
  head: () => ({
    meta: [
      { title: "Lawyer Dashboard — RentEaze" },
      {
        name: "description",
        content:
          "Draft, verify and track digital rental agreements for RentEaze landlords and tenants from your lawyer dashboard.",
      },
      { property: "og:title", content: "Lawyer Dashboard — RentEaze" },
      {
        property: "og:description",
        content: "Agreement drafting, verification and compliance for RentEaze lawyers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LawyerDashboard,
});

const NAV: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Agreements", icon: FileText, badge: 5 },
  { label: "Draft New", icon: PenLine },
  { label: "Verification Queue", icon: ShieldCheck, badge: 5 },
  { label: "Compliance", icon: Scale, badge: 1 },
  { label: "Clients", icon: Users },
  { label: "Messages", icon: MessageSquare, badge: 2 },
  { label: "Settings", icon: Settings },
];

const queue = [
  { title: "Tenancy agreement — Lekki Phase 1", parties: "Adebayo S. ↔ Chinedu E.", status: "Draft" },
  { title: "Tenancy agreement — Yaba studio", parties: "Monisola A. ↔ Ngozi O.", status: "Verification" },
  { title: "Renewal — Ikeja GRA terrace", parties: "Tunde A. ↔ Fatima M.", status: "Awaiting signature" },
  { title: "Tenancy agreement — Surulere flat", parties: "Emeka N. ↔ Someni A.", status: "Verification" },
];

const notes = [
  { icon: AlertTriangle, text: "1 clause flagged for review: service charge escalation (Ikoyi duplex)." },
  { icon: CheckCircle2, text: "All 2026 templates updated to current Lagos tenancy law." },
  { icon: CheckCircle2, text: "11 agreements executed and archived this month." },
];

function LawyerDashboard() {
  return (
    <DashboardShell
      role="lawyer"
      title="Lawyer Dashboard"
      subtitle="Draft, verify and track digital rental agreements"
      nav={NAV}
      searchPlaceholder="Search agreements, clients, clauses..."
      promo={{
        heading: "Faster agreements",
        body: "Use verified RentEaze templates to draft in minutes.",
        cta: "Draft Agreement",
      }}
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={PenLine} label="Drafts in Progress" value="3" />
          <StatCard icon={ShieldCheck} label="Awaiting Verification" value="5" delta="2 added today" />
          <StatCard icon={FileText} label="Signed This Month" value="11" delta="18% vs. last month" />
          <StatCard icon={AlertTriangle} label="Flagged Clauses" value="1" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Card title="Agreements Queue" action="View All">
            <ul className="space-y-3">
              {queue.map((q) => (
                <li
                  key={q.title}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">{q.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{q.parties}</div>
                  </div>
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-primary">
                    {q.status}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Compliance Notes">
            <ul className="space-y-3">
              {notes.map((n) => (
                <li key={n.text} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <n.icon className="h-4 w-4" />
                  </span>
                  <p className="text-sm text-muted-foreground">{n.text}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
