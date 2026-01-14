import { Link, useNavigate } from "react-router-dom";

function Navbar({ theme, onToggleTheme, isLoggedIn = false, onLogout }) {
  const navigate = useNavigate();
  const isDark = theme === "dark";

  return (
    <nav className="fixed inset-x-0 top-0 z-20 border-b border-slate-200 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-colors duration-300 dark:border-violet-900/70 dark:bg-gradient-to-r dark:from-violet-950/95 dark:via-indigo-950/95 dark:to-slate-950/95 dark:shadow-[0_16px_45px_rgba(109,40,217,0.65)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/home"
          className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-neutral-50"
        >
          <span className="rounded-lg bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 px-2 py-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950">
            Pro
          </span>{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
            Resume Maker
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden space-x-4 text-sm font-medium text-slate-600 md:flex dark:text-neutral-200">
            <Link
              to="/home"
              className="rounded-full px-3 py-1 transition-colors duration-200 hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-violet-900/70 dark:hover:text-emerald-300"
            >
              Home
            </Link>
            <Link
              to="/editor"
              className="rounded-full px-3 py-1 transition-colors duration-200 hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-violet-900/70 dark:hover:text-emerald-300"
            >
              Create Resume
            </Link>
            <Link
              to="/saved"
              className="rounded-full px-3 py-1 transition-colors duration-200 hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-violet-900/70 dark:hover:text-emerald-300"
            >
              Saved Resumes
            </Link>
          </div>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => {
                if (onLogout) onLogout();
                navigate("/");
              }}
              className="hidden rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition-colors duration-200 hover:bg-slate-100 hover:text-red-600 md:inline-flex dark:border-violet-700/70 dark:bg-violet-900/60 dark:text-violet-50 dark:hover:bg-violet-800 dark:hover:text-red-300"
            >
              Sign out
            </button>
          ) : (
            <Link
              to="/"
              className="hidden rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition-colors duration-200 hover:bg-slate-100 hover:text-emerald-600 md:inline-flex dark:border-violet-700/70 dark:bg-violet-900/60 dark:text-violet-50 dark:hover:bg-violet-800 dark:hover:text-emerald-300"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`group relative inline-flex h-9 w-[4.5rem] items-center rounded-full border px-1 text-[0.7rem] font-medium shadow-sm transition-all duration-300 ${
              isDark
                ? "border-violet-500/70 bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 text-violet-50 shadow-[0_0_22px_rgba(129,140,248,0.7)]"
                : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[0.7rem] shadow-sm transition-transform duration-300 dark:bg-slate-950 ${
                isDark
                  ? "translate-x-6 rotate-0"
                  : "translate-x-0 rotate-0"
              }`}
            >
              {isDark ? "🌙" : "☀️"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
