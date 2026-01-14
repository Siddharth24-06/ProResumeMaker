import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";

const templateBadgeStyles = {
  modern: "bg-blue-100 text-blue-700",
  elegant: "bg-purple-100 text-purple-700",
  creative: "bg-pink-100 text-pink-700",
  professional: "bg-slate-100 text-slate-700",
  minimal: "bg-emerald-100 text-emerald-700",
};

const templateOptions = ["all", "modern", "elegant", "creative", "professional", "minimal"];

function SavedResumes() {
  const [resumes, setResumes] = useState([]);
  const [query, setQuery] = useState("");
  const [templateFilter, setTemplateFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const fetchResumes = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/resumes", {
        params: { _sort: "updatedAt", _order: "desc" },
      });
      setResumes(res.data);
    } catch (err) {
      console.error("Error fetching resumes:", err);
      toast.error("Unable to load your saved resumes.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = async (resumeId) => {
    try {
      await API.delete(`/resumes/${resumeId}`);
      setResumes((prev) => prev.filter((resume) => resume.id !== resumeId));
      toast.success("Resume deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete resume.");
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const filteredResumes = useMemo(() => {
    return resumes.filter((resume) => {
      const safeTemplate = (resume.template || "modern").toLowerCase();
      const haystack = `${resume.name || ""} ${resume.email || ""} ${resume.title || ""}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const matchesTemplate = templateFilter === "all" || safeTemplate === templateFilter;
      return matchesQuery && matchesTemplate;
    });
  }, [resumes, query, templateFilter]);

  const formatTemplateLabel = (value) => {
    const label = (value || "modern").toLowerCase();
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  const formatUpdatedAt = (value) => {
    if (!value) return "No sync info";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50/80 text-slate-900 transition-colors duration-300 dark:bg-transparent dark:text-neutral-100">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="mb-8 text-center text-4xl font-semibold tracking-tight text-slate-900 dark:text-neutral-50">
          Your Saved Resumes
        </h1>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or title"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 sm:w-2/3 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
          <select
            value={templateFilter}
            onChange={(e) => setTemplateFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 sm:w-1/3 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {templateOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all"
                  ? "All Templates"
                  : option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <p className="text-center text-lg text-slate-500 dark:text-neutral-500">
            Loading your resumes...
          </p>
        ) : filteredResumes.length === 0 ? (
          <p className="text-center text-lg text-slate-500 dark:text-neutral-500">
            {resumes.length === 0
              ? "You don’t have any saved resumes yet."
              : "No resumes match your filters."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResumes.map((resume) => {
              const safeTemplate = (resume.template || "modern").toLowerCase();
              const badgeClass =
                templateBadgeStyles[safeTemplate] || templateBadgeStyles.modern;

              return (
                <div
                  key={resume.id}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(16,185,129,0.22)] dark:border-neutral-800 dark:bg-neutral-900/80 dark:shadow-[0_0_30px_rgba(15,23,42,0.7)] dark:hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeClass}`}>
                      {formatTemplateLabel(resume.template)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-neutral-500">
                      {formatUpdatedAt(resume.updatedAt)}
                    </span>
                  </div>

                  <h2 className="mb-1 text-xl font-semibold text-slate-900 dark:text-neutral-50">
                    {resume.name || "Unnamed Resume"}
                  </h2>
                  {resume.title && (
                    <p className="mb-1 text-sm text-slate-500 dark:text-neutral-400">
                      {resume.title}
                    </p>
                  )}
                  <p className="mb-1 text-sm text-slate-500 dark:text-neutral-400">
                    📧 {resume.email || "Not provided"}
                  </p>
                  <p className="mb-4 text-sm text-slate-500 dark:text-neutral-400">
                    📞 {resume.phone || "Not provided"}
                  </p>

                  <div className="flex gap-3">
                    <Link
                      to={`/editor/${resume.id}`}
                      className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-neutral-950 shadow-md transition hover:bg-emerald-400"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            to="/editor"
            className="rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 px-8 py-3 font-semibold text-neutral-950 shadow-lg shadow-emerald-500/30 transition-transform hover:-translate-y-0.5 hover:shadow-emerald-500/50"
          >
            ➕ Create New Resume
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SavedResumes;
