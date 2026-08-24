import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  UserPlus,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import { AuthLayout, SocialButtons, fieldClass } from "@/components/auth-layout";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Your RentEaze Account — Register Free" },
      {
        name: "description",
        content:
          "Register on RentEaze to browse verified Nigerian rentals, sign secure digital agreements and pay rent safely. Free for tenants, landlords and agents.",
      },
      { property: "og:title", content: "Create Your RentEaze Account" },
      {
        property: "og:description",
        content: "Join RentEaze for verified properties, secure agreements and easy rent payments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

const cities = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Enugu", "Kano", "Benin City"];

function passwordStrength(pw: string): { score: number; label: string; bar: string } {
  if (!pw) return { score: 0, label: "", bar: "bg-border" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 2) return { score: 1, label: "Weak", bar: "bg-destructive" };
  if (score === 3) return { score: 2, label: "Fair", bar: "bg-amber-500" };
  if (score === 4) return { score: 3, label: "Good", bar: "bg-accent" };
  return { score: 4, label: "Strong", bar: "bg-accent" };
}

function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    city: "",
    agree: false,
  });

  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  const strength = passwordStrength(form.password);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (form.phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!form.city) {
      toast.error("Please select your city.");
      return;
    }
    if (!form.agree) {
      toast.error("Please accept the Terms & Conditions.");
      return;
    }
    toast.success("Account created! Please sign in to continue.");
    navigate({ to: "/login" });
  }

  return (
    <AuthLayout altPrompt="Already have an account?" altLabel="Sign In" altTo="/login">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-purple text-primary-foreground shadow-md">
          <UserPlus className="h-6 w-6" />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            Create Your Account
          </h2>
          <p className="text-sm text-muted-foreground">Register to get started with RentEaze.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {(
          [
            { key: "tenant", label: "I am a Tenant", icon: User },
            { key: "landlord", label: "I am a Landlord / Agent", icon: Building2 },
          ] as const
        ).map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => setRole(o.key)}
            className={`relative flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
              role === o.key
                ? "border-primary bg-accent text-primary shadow-sm ring-2 ring-primary/20"
                : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-accent/50"
            }`}
          >
            <o.icon className="h-4 w-4" /> {o.label}
            {role === o.key && (
              <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            )}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
        <Field label="Full Name" icon={User}>
          <input
            className={fieldClass}
            placeholder="Enter your full name"
            value={form.name}
            maxLength={100}
            onChange={(e) => set("name", e.target.value)}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email Address" icon={Mail}>
            <input
              type="email"
              className={fieldClass}
              placeholder="Enter your email address"
              value={form.email}
              maxLength={255}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <Field label="Phone Number" icon={Phone}>
            <input
              type="tel"
              className={fieldClass}
              placeholder="+234 801 234 5678"
              value={form.phone}
              maxLength={20}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Password" icon={Lock} hint="Password must be at least 8 characters long.">
          <input
            type={showPw ? "text" : "password"}
            className={fieldClass}
            placeholder="Create a password"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
          />
          <Toggle shown={showPw} onClick={() => setShowPw((v) => !v)} />
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= strength.score ? strength.bar : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                Password strength: <span className="text-foreground">{strength.label}</span>
              </p>
            </div>
          )}
        </Field>

        <Field label="Confirm Password" icon={Lock}>
          <input
            type={showConfirm ? "text" : "password"}
            className={fieldClass}
            placeholder="Confirm your password"
            value={form.confirm}
            onChange={(e) => set("confirm", e.target.value)}
          />
          <Toggle shown={showConfirm} onClick={() => setShowConfirm((v) => !v)} />
          {form.confirm && form.password === form.confirm && (
            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-accent">
              <CheckCircle2 className="h-3.5 w-3.5" /> Passwords match
            </p>
          )}
        </Field>

        <Field label="Location" icon={MapPin}>
          <select
            className={`${fieldClass} appearance-none`}
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
          >
            <option value="">Select your city</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <label className="flex items-start gap-3 text-sm text-foreground">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => set("agree", e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--primary)]"
          />
          <span>
            I agree to the{" "}
            <span className="font-semibold text-primary">Terms &amp; Conditions</span> and{" "}
            <span className="font-semibold text-primary">Privacy Policy</span>
          </span>
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-purple px-4 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:opacity-95 hover:shadow-xl active:scale-[0.99]"
        >
          Create Account
        </button>
      </form>

      <SocialButtons verb="register" />

      <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" /> Your information is secure with us.
      </p>
    </AuthLayout>
  );
}

function Field({
  label,
  icon: Icon,
  hint,
  children,
}: {
  label: string;
  icon: React.ElementType;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-foreground">
        {label} <span className="text-destructive">*</span>
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {children}
      </div>
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Toggle({ shown, onClick }: { shown: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={shown ? "Hide password" : "Show password"}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
    >
      {shown ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
    </button>
  );
}
