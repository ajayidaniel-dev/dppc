import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Eye,
  EyeOff,
  FileText,
  LineChart,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Button } from "../../components/elements";
import { useAuth } from "../../utils/useAuth";
import { routes } from "../../router/routes";
import { cn } from "../../utils/helpers";

interface LoginForm {
  email: string;
  password: string;
}

const highlights = [
  {
    icon: LineChart,
    title: "Real-time portfolio visibility",
    description: "Track health, budget, and progress across every project.",
  },
  {
    icon: FileText,
    title: "Automated executive reporting",
    description: "Weekly to annual reports, generated and export-ready.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & milestone tracking",
    description: "Surface critical risks and milestones before they slip.",
  },
];

/**
 * Build a demo JWT (unsigned) so the cookie-based auth guard treats the
 * session as valid. Replace this with a real `usePost` login call when the
 * backend is wired up.
 */
const buildDemoToken = (email: string): string => {
  const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    })
  );
  return `${header}.${payload}.`;
};

function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    // TODO: replace with real authentication request.
    login({
      token: buildDemoToken(data.email),
      profile: {
        id: 1,
        name: data.email.split("@")[0] || "Admin User",
        email: data.email,
        role: "Executive",
      },
      permissions: ["dashboard:view", "project:view", "report:view"],
    });
    toast.success("Signed in successfully");
    const redirect = params.get("redirect");
    navigate(redirect || routes.DASHBOARD, { replace: true });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary-700 p-12 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 60% at 85% 10%, rgba(255,255,255,0.16), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(0,0,0,0.25), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-10 top-1/3 h-56 w-56 rounded-full border border-white/10" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-base font-bold backdrop-blur-sm">
            D
          </div>
          <span className="text-lg font-semibold tracking-tight">
            DPPC Dashboard
          </span>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">
            The command center for your project portfolio.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            A single source of truth for executives, project teams, and
            stakeholders, from strategy down to delivery.
          </p>

          <ul className="mt-10 flex flex-col gap-5">
            {highlights.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs leading-relaxed text-white/60">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <span className="relative text-xs text-white/50">
          © {new Date().getFullYear()} DPPC. All rights reserved.
        </span>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center bg-background px-6 py-10 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              D
            </div>
            <span className="text-lg font-semibold text-foreground">DPPC</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to access your dashboard.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={cn(
                    "h-11 w-full rounded-lg border bg-surface pl-10 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30",
                    errors.email
                      ? "border-danger focus:border-danger focus:ring-danger/30"
                      : "border-input"
                  )}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && (
                <span className="text-xs text-danger">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    toast("Password recovery is disabled in the demo.")
                  }
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={cn(
                    "h-11 w-full rounded-lg border bg-surface pl-10 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30",
                    errors.password
                      ? "border-danger focus:border-danger focus:ring-danger/30"
                      : "border-input"
                  )}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-danger">
                  {errors.password.message}
                </span>
              )}
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-input"
                style={{ accentColor: "var(--color-primary)" }}
              />
              Keep me signed in
            </label>

            <Button
              type="submit"
              isLoading={isSubmitting}
              size="lg"
              className="w-full"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Sign in
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              or
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => toast("Single sign-on is disabled in the demo.")}
          >
            Continue with SSO
          </Button>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Demo environment, use any email and password to sign in.
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
