import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import resumeImg from "../assets/undraw_online-resume_z4sp.png";

function Home() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-gradient-to-b from-slate-50 via-sky-50 to-indigo-50 px-6 text-center dark:from-transparent dark:via-transparent dark:to-transparent">
      {/* Hero */}
      <section className="flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row">
        <div className="max-w-xl text-left">
          <Motion.h1
            className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-neutral-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Build a{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
              world‑class resume
            </span>{" "}
            in minutes.
          </Motion.h1>

          <Motion.p
            className="mb-8 max-w-xl text-base text-slate-600 sm:text-lg dark:text-neutral-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            ATS‑friendly templates, smart sections, and clean typography — so your
            experience stands out to recruiters, not your formatting.
          </Motion.p>

          <Motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Link
              to="/editor"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 px-8 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-0.5 hover:shadow-emerald-500/50 sm:text-base"
            >
              Start building for free
            </Link>
            <span className="text-xs text-slate-500 dark:text-neutral-500">
              No login required • Export to PDF anytime
            </span>
          </Motion.div>
        </div>

        <Motion.div
          className="mt-6 w-full max-w-md md:mt-0"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-[1px] shadow-[0_18px_60px_rgba(15,23,42,0.20)] dark:border-neutral-800 dark:bg-gradient-to-tr dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800/60 dark:shadow-[0_0_60px_rgba(16,185,129,0.25)]">
            <div className="relative overflow-hidden rounded-3xl bg-slate-50 px-6 py-6 dark:bg-neutral-900/90 sm:px-8 sm:py-8">
              <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.18),_transparent_55%)] dark:block" />
              <Motion.img
                src={resumeImg}
                alt="Resume preview illustration"
                className="relative w-full max-w-xs rounded-2xl border border-slate-200 shadow-2xl shadow-black/10 dark:border-neutral-800/80 dark:shadow-black/60"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              />
            </div>
          </div>
        </Motion.div>
      </section>

      {/* Highlights */}
      <section className="mt-20 w-full max-w-5xl">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="shimmer-border rounded-3xl border border-slate-200/80 bg-white/95 p-7 text-left shadow-[0_20px_45px_rgba(15,23,42,0.18)] transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(56,189,248,0.35)] dark:border-violet-900/80 dark:bg-gradient-to-b dark:from-slate-950/95 dark:via-slate-950 dark:to-violet-950/90">
            <h3 className="mb-3 text-base font-semibold tracking-tight text-slate-800 dark:text-neutral-50">
              Designed for recruiters
            </h3>
            <p className="text-sm text-slate-600 dark:text-neutral-300">
              Clean hierarchy and spacing so hiring managers can scan your profile
              in seconds.
            </p>
          </div>
          <div className="shimmer-border rounded-3xl border border-slate-200/80 bg-white/95 p-7 text-left shadow-[0_20px_45px_rgba(15,23,42,0.18)] transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(56,189,248,0.35)] dark:border-violet-900/80 dark:bg-gradient-to-b dark:from-slate-950/95 dark:via-slate-950 dark:to-violet-950/90">
            <h3 className="mb-3 text-base font-semibold tracking-tight text-slate-800 dark:text-neutral-50">
              Multiple templates
            </h3>
            <p className="text-sm text-slate-600 dark:text-neutral-300">
              Switch between modern, elegant, or minimal looks without re‑typing your
              content.
            </p>
          </div>
          <div className="shimmer-border rounded-3xl border border-slate-200/80 bg-white/95 p-7 text-left shadow-[0_20px_45px_rgba(15,23,42,0.18)] transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(56,189,248,0.35)] dark:border-violet-900/80 dark:bg-gradient-to-b dark:from-slate-950/95 dark:via-slate-950 dark:to-violet-950/90">
            <h3 className="mb-3 text-base font-semibold tracking-tight text-slate-800 dark:text-neutral-50">
              Save & edit anytime
            </h3>
            <p className="text-sm text-slate-600 dark:text-neutral-300">
              Come back later, tweak details, and export updated versions with a click.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
