import { createFileRoute } from "@tanstack/react-router";
import {
  Home,
  Plus,
  CalendarDays,
  Users,
  TrendingUp,
  BarChart3,
  Star,
  Wrench,
  MessageSquare,
  Wallet,
  LineChart as LineChartIcon,
  FileText,
  Settings,
  LayoutDashboard,
  Banknote,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, DashboardShell, StatCard, type NavItem } from "@/components/dashboard-shell";
import propDuplex from "@/assets/prop-duplex.jpg";
import propApartment from "@/assets/prop-apartment.jpg";
import propStudio from "@/assets/prop-studio.jpg";
import propTerrace from "@/assets/prop-terrace.jpg";

export const Route = createFileRoute("/dashboard/landlord")({
  head: () => ({
    meta: [
      { title: "Landlord Dashboard — RentEaze" },
      {
        name: "description",
        content:
          "Manage your properties, tenants, bookings and revenue from the RentEaze landlord dashboard.",
      },
      { property: "og:title", content: "Landlord Dashboard — RentEaze" },
      {
        property: "og:description",
        content: "Properties, tenants, bookings and revenue analytics for RentEaze landlords.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandlordDashboard,
});

const NAV: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Properties", icon: Home },
  { label: "Add New Property", icon: Plus },
  { label: "Bookings", icon: CalendarDays },
  { label: "Tenants", icon: Users },
  { label: "Revenue Analytics", icon: TrendingUp },
  { label: "Property Performance", icon: BarChart3 },
  { label: "Reviews & Ratings", icon: Star },
  { label: "Maintenance Requests", icon: Wrench, badge: 3 },
  { label: "Messages", icon: MessageSquare, badge: 5 },
  { label: "Wallet", icon: Wallet },
  { label: "Analytics", icon: LineChartIcon },
  { label: "Reports", icon: FileText },
  { label: "Settings", icon: Settings },
];

const revenue = [
  { month: "Dec", value: 4.2 },
  { month: "Jan", value: 6.1 },
  { month: "Feb", value: 7.8 },
  { month: "Mar", value: 9.3 },
  { month: "Apr", value: 11.1 },
  { month: "May", value: 12.45 },
];

const performance = [
  { name: "Duplex", value: 4.6 },
  { name: "Apartments", value: 3.4 },
  { name: "Studio", value: 2.6 },
  { name: "Terraced", value: 1.9 },
  { name: "Serviced Apt", value: 1.6 },
];

const occupancy = [
  { name: "Occupied", value: 85 },
  { name: "Vacant", value: 15 },
];

const bookings = [
  { id: "BK-1001", property: "3 Bedroom Duplex", tenant: "Chinedu E.", date: "May 20, 2026", status: "Completed" },
  { id: "BK-1002", property: "2 Bedroom Apartment", tenant: "Ngozi O.", date: "May 18, 2026", status: "Confirmed" },
  { id: "BK-1003", property: "Studio Apartment", tenant: "Someni A.", date: "May 16, 2026", status: "Pending" },
  { id: "BK-1004", property: "4 Bedroom Terraced", tenant: "Tunde A.", date: "May 14, 2026", status: "Completed" },
  { id: "BK-1005", property: "3 Bedroom Duplex", tenant: "Fatima M.", date: "May 12, 2026", status: "Confirmed" },
];

const topProperties = [
  { img: propDuplex, title: "3 Bedroom Duplex", location: "Lekki Phase 1, Lagos", score: "92%" },
  { img: propApartment, title: "2 Bedroom Apartment", location: "Yaba, Lagos", score: "88%" },
  { img: propStudio, title: "Studio Apartment", location: "Surulere, Lagos", score: "86%" },
  { img: propTerrace, title: "4 Bedroom Terraced", location: "Victoria Island, Lagos", score: "84%" },
];

const activity = [
  { icon: CalendarDays, title: "New booking for 2 Bedroom Apartment", meta: "Ngozi O. — May 20, 2026", time: "2m ago" },
  { icon: Banknote, title: "Payment received", meta: "Monisola A. — ₦120,000", time: "1h ago" },
  { icon: Wrench, title: "Maintenance request", meta: "Studio Apartment — Leaking faucet", time: "3h ago" },
  { icon: Star, title: "New review", meta: "3 Bedroom Duplex — 5 ★", time: "1 day ago" },
];

const quickActions = [
  { icon: Home, title: "Add Property", body: "List a new property" },
  { icon: CalendarDays, title: "View Bookings", body: "Manage bookings" },
  { icon: Users, title: "Add Tenant", body: "Register new tenant" },
  { icon: BarChart3, title: "View Analytics", body: "See performance" },
];

const statusClass: Record<string, string> = {
  Completed: "bg-accent text-primary",
  Confirmed: "bg-accent text-primary",
  Pending: "bg-muted text-muted-foreground",
};

function LandlordDashboard() {
  return (
    <DashboardShell
      role="landlord"
      title="Landlord Dashboard"
      subtitle="Manage your properties, tenants and grow your rental business"
      nav={NAV}
      searchPlaceholder="Search for properties, tenants, reports..."
      promo={{
        heading: "Grow Your Rental Business",
        body: "List more properties, reach more tenants, earn more.",
        cta: "+ Add Property",
      }}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={Home} label="Total Properties" value="12" delta="12% vs. last month" />
            <StatCard icon={Users} label="Total Tenants" value="24" delta="8% vs. last month" />
            <StatCard icon={Banknote} label="Total Revenue" value="₦12,450,000" delta="10% vs. last month" />
            <StatCard icon={CalendarDays} label="Total Bookings" value="24" delta="6% vs. last month" />
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <Card title="Revenue Trend" action="Last 6 Months">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenue} margin={{ left: -12, right: 8, top: 8 }}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis
                      tickFormatter={(v) => `₦${v}M`}
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />
                    <Tooltip formatter={(v: number) => [`₦${v}M`, "Revenue"]} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-primary)"
                      strokeWidth={2.5}
                      fill="url(#rev)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Occupancy Rate">
              <div className="relative h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={occupancy}
                      dataKey="value"
                      innerRadius="70%"
                      outerRadius="100%"
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                      isAnimationActive={false}
                    >
                      <Cell fill="var(--color-primary)" />
                      <Cell fill="var(--color-muted)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-foreground">85%</span>
                  <span className="text-xs text-muted-foreground">Productive Occupancy</span>
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-accent/60 p-3 text-center">
                <div className="text-sm font-bold text-foreground">9 / 12 Properties Active</div>
                <div className="mt-1 text-xs font-semibold text-primary">↑ 5% vs. last month</div>
              </div>
            </Card>
          </div>

          <Card title="Recent Bookings" action="View All">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="py-2 pr-4 font-semibold">ID</th>
                    <th className="py-2 pr-4 font-semibold">Property</th>
                    <th className="py-2 pr-4 font-semibold">Tenant</th>
                    <th className="py-2 pr-4 font-semibold">Date</th>
                    <th className="py-2 pr-4 font-semibold">Status</th>
                    <th className="py-2 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-border/60 last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">{b.id}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{b.property}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{b.tenant}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{b.date}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[b.status]}`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          type="button"
                          className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Monthly Property Performance" action="View Details">
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performance} margin={{ left: -16, right: 8, top: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} />
                    <YAxis
                      tickFormatter={(v) => `₦${v}M`}
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                    />
                    <Tooltip formatter={(v: number) => [`₦${v}M`, "Revenue"]} />
                    <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} barSize={34} isAnimationActive={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Quick Actions">
              <div className="grid gap-3 sm:grid-cols-2">
                {quickActions.map((a) => (
                  <button
                    key={a.title}
                    type="button"
                    className="flex items-center gap-3 rounded-xl border border-border p-3 text-left transition-colors hover:border-primary"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                      <a.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">{a.title}</span>
                      <span className="block text-xs text-muted-foreground">{a.body}</span>
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <Card title="Top Performing Properties" action="View All">
            <ul className="space-y-3">
              {topProperties.map((p) => (
                <li key={p.title} className="flex items-center gap-3">
                  <img
                    src={p.img}
                    alt={`${p.title} in ${p.location}`}
                    loading="lazy"
                    className="h-12 w-14 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-foreground">{p.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{p.location}</div>
                  </div>
                  <span className="rounded-lg bg-accent px-2 py-1 text-xs font-bold text-primary">
                    {p.score}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Recent Activity" action="View All">
            <ul className="space-y-3">
              {activity.map((a) => (
                <li key={a.title} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <a.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-foreground">{a.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{a.meta}</div>
                  </div>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{a.time}</span>
                </li>
              ))}
            </ul>
          </Card>

          <section className="rounded-2xl bg-accent p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wallet className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Your Wallet</h2>
                <p className="text-xs text-muted-foreground">All your earnings in one place</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              View Wallet →
            </button>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
