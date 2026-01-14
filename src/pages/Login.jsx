import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";

function Login({ onAuthChange }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please enter your email and password.");
      return;
    }
    try {
      setIsSubmitting(true);
      const email = form.email.trim().toLowerCase();

      // 1) Check if user already exists by email
      const { data: existingUsers } = await API.get("/users", {
        params: { email },
      });

      let user = existingUsers[0];

      if (mode === "signup") {
        // SIGN UP FLOW
        if (user) {
          toast.error("Account already exists for this email. Please sign in instead.");
          return;
        }

        const { data: created } = await API.post("/users", {
          email,
          password: form.password,
          createdAt: new Date().toISOString(),
        });
        user = created;
        toast.success("Account created successfully.");
      } else {
        // LOGIN FLOW
        if (!user) {
          toast.error("No account found for this email. Please sign up first.");
          return;
        }
        if (user.password !== form.password) {
          toast.error("Wrong password. Please check and try again.");
          return;
        }
      }

      // Record login in json-server
      await API.post("/logins", {
        userId: user.id,
        email: user.email,
        loggedAt: new Date().toISOString(),
        userAgent: window.navigator.userAgent,
      });

      // Store simple auth state locally
      window.localStorage.setItem("rb-auth-email", user.email);
      window.localStorage.setItem("rb-auth-logged-in", "true");

      if (onAuthChange) {
        onAuthChange(true);
      }

      toast.success(mode === "signup" ? "Signed up and logged in." : "Logged in successfully.");
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLogin = mode === "login";

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.22)] backdrop-blur-sm dark:border-violet-900/70 dark:bg-slate-950/95 dark:shadow-[0_26px_80px_rgba(109,40,217,0.85)]">
        <div className="mb-4 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-700 dark:bg-violet-950/80 dark:text-violet-200">
            Resume Builder
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-zinc-50">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h1>
        </div>

        <div className="mb-4 flex rounded-full bg-slate-100 p-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-zinc-300">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full px-3 py-1 transition-colors ${
              isLogin
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-zinc-50"
                : "bg-transparent"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-full px-3 py-1 transition-colors ${
              !isLogin
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-zinc-50"
                : "bg-transparent"
            }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium text-slate-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 dark:border-violet-900/70 dark:bg-slate-950/80 dark:text-zinc-50 dark:placeholder:text-zinc-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-medium text-slate-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 dark:border-violet-900/70 dark:bg-slate-950/80 dark:text-zinc-50 dark:placeholder:text-zinc-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/40 transition-transform hover:-translate-y-0.5 hover:shadow-emerald-500/60 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Please wait..." : isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

