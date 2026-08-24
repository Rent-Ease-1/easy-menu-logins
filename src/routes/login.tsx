import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, Mail, Lock, Eye, EyeOff, ShieldCheck, KeyRound } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout, SocialButtons, fieldClass } from "@/components/auth-layout";
import {
  DEMO_ACCOUNTS,
  findDemoAccount,
  saveDemoSession,
  ROLE_DASHBOARDS,
} from "@/lib/demo-accounts";


export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In to RentEaze — Access Your Rental Dashboard" },
      {
        name: "description",
        content:
          "Log in to RentEaze to track applications, manage rent payments and view your digital rental agreements for verified homes across Nigeria.",
      },
      { property: "og:title", content: "Sign In to RentEaze" },
      {
        property: "og:description",
        content: "Access your RentEaze account to manage rentals, payments and agreements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: true });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const account = findDemoAccount(form.email, form.password);
    if (!account) {
      toast.error("Invalid credentials. Use one of the demo logins below.");
      return;
    }
    saveDemoSession(account);
    toast.success(`Welcome back! Signed in as ${account.role}.`);
    navigate({ to: ROLE_DASHBOARDS[account.role], replace: true });
  }

  function fillDemo(email: string, password: string, label: string) {
    setForm((f) => ({ ...f, email, password }));
    toast.success(`${label} credentials filled — hit Sign In.`);
  }

  return (
    <AuthLayout altPrompt="New to RentEaze?" altLabel="Create Account" altTo="/register">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-purple text-primary-foreground shadow-md">
          <LogIn className="h-6 w-6" />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Welcome Back</h2>
          <p className="text-sm text-muted-foreground">Sign in to continue with RentEaze.</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Email Address <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              className={fieldClass}
              placeholder="Enter your email address"
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-foreground">
            Password <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPw ? "text" : "password"}
              className={fieldClass}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPw ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm((f) => ({ ...f, remember: e.target.checked }))}
              className="h-4 w-4 accent-[var(--primary)]"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={() => toast("Password reset link will be sent once accounts are live.")}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-purple px-4 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:opacity-95 hover:shadow-xl active:scale-[0.99]"
        >
          Sign In
        </button>
      </form>

      <section className="mt-6 rounded-2xl border border-dashed border-primary/40 bg-accent/40 p-4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <KeyRound className="h-4 w-4 text-primary" /> Demo logins
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Tap any account below to fill in the form. Password for all demo accounts:{" "}
          <span className="font-semibold text-foreground">Demo123</span>
        </p>
        <div className="mt-3 grid gap-2">
          {DEMO_ACCOUNTS.map((a) => (
            <button
              key={a.email}
              type="button"
              onClick={() => fillDemo(a.email, a.password, a.label)}
              className={`rounded-xl border px-4 py-3 text-left transition-all hover:border-primary/50 hover:shadow-md ${
                form.email === a.email
                  ? "border-primary bg-background ring-2 ring-primary/20"
                  : "border-border bg-background"
              }`}
            >
              <div className="text-sm font-semibold text-foreground">{a.label}</div>
              <div className="text-xs text-muted-foreground">
                Email: {a.email} · Password: {a.password}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{a.blurb}</div>
            </button>
          ))}
        </div>
      </section>

      <SocialButtons verb="sign in" />


      <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" /> Your information is secure with us.
      </p>
    </AuthLayout>
  );
}
