export type DemoRole = "tenant" | "landlord" | "lawyer";

export type DemoAccount = {
  role: DemoRole;
  label: string;
  email: string;
  password: string;
  blurb: string;
};

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "tenant",
    label: "Tenant Demo Login",
    email: "tenant@demo.renteaze.com",
    password: "Demo123",
    blurb: "Browse verified homes, apply and track rent payments.",
  },
  {
    role: "landlord",
    label: "Landlord Demo Login",
    email: "landlord@demo.renteaze.com",
    password: "Demo123",
    blurb: "List properties, review applications and manage tenants.",
  },
  {
    role: "lawyer",
    label: "Lawyer Demo Login",
    email: "lawyer@demo.renteaze.com",
    password: "Demo123",
    blurb: "Draft and verify digital rental agreements.",
  },
];

export function findDemoAccount(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  return DEMO_ACCOUNTS.find((a) => a.email === normalized && a.password === password);
}

const STORAGE_KEY = "rentease-demo-session";

export function saveDemoSession(account: DemoAccount) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ role: account.role, email: account.email }),
  );
}

export const ROLE_DASHBOARDS: Record<DemoRole, string> = {
  tenant: "/dashboard/tenant",
  landlord: "/dashboard/landlord",
  lawyer: "/dashboard/lawyer",
};

export type DemoSession = { role: DemoRole; email: string };

export function getDemoSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoSession;
    return parsed && parsed.role ? parsed : null;
  } catch {
    return null;
  }
}

export function clearDemoSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
