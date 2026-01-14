import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ResumePreview from "../components/ResumePreview";
import API from "../api/api";

const skillDefaults = {
  programming: "",
  frameworks: "",
  databases: "",
  tools: "",
  softskills: "",
};

const experienceTemplate = {
  title: "",
  company: "",
  location: "",
  duration: "",
  details: "",
};

const projectTemplate = {
  name: "",
  stack: "",
  description: "",
  link: "",
};

const educationTemplate = {
  degree: "",
  institution: "",
  duration: "",
  cgpa: "",
};

const templateOptions = ["modern", "elegant", "creative", "professional", "minimal"];

const createInitialFormState = () => ({
  name: "",
  title: "",
  phone: "",
  email: "",
  linkedin: "",
  github: "",
  website: "",
  location: "",
  summary: "",
  skills: { ...skillDefaults },
  experience: [],
  projects: [],
  education: [],
  certifications: [],
  achievements: [],
  volunteer: [],
  languages: "",
  updatedAt: "",
});

const normalizeStringArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry ?? ""));
  }
  return [String(value)];
};

const normalizeList = (value, template) => {
  if (!value) return [];
  const firstKey = Object.keys(template)[0];

  if (Array.isArray(value)) {
    return value.map((item) =>
      typeof item === "string"
        ? { ...template, [firstKey]: item }
        : { ...template, ...item }
    );
  }

  if (typeof value === "object") {
    return [{ ...template, ...value }];
  }

  if (typeof value === "string") {
    return [{ ...template, [firstKey]: value }];
  }

  return [];
};

const normalizeFormData = (payload) => {
  const base = createInitialFormState();
  if (!payload) return base;

  const incomingSkills = payload.skills;
  let normalizedSkills = { ...base.skills };

  if (incomingSkills && typeof incomingSkills === "object" && !Array.isArray(incomingSkills)) {
    normalizedSkills = { ...base.skills, ...incomingSkills };
  } else if (typeof incomingSkills === "string") {
    normalizedSkills = { ...base.skills, programming: incomingSkills };
  }

  const normalized = {
    ...base,
    ...payload,
    skills: normalizedSkills,
    experience: normalizeList(payload.experience, experienceTemplate),
    projects: normalizeList(payload.projects, projectTemplate),
    education: normalizeList(payload.education, educationTemplate),
    certifications: normalizeStringArray(payload.certifications),
    achievements: normalizeStringArray(payload.achievements),
    languages: Array.isArray(payload.languages)
      ? payload.languages.join(", ")
      : payload.languages || "",
    updatedAt: payload.updatedAt || "",
  };

  return normalized;
};

const clone = (template) => ({ ...template });

function ResumeEditor() {
  const [formData, setFormData] = useState(() => createInitialFormState());
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setEditingId(null);
      return;
    }

    const fetchResume = async () => {
      setIsLoading(true);
      try {
        const { data } = await API.get(`/resumes/${id}`);
        const normalized = normalizeFormData(data);
        setFormData(normalized);
        setSelectedTemplate(data.template || "modern");
        setEditingId(data.id);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load resume. Redirecting to saved list.");
        navigate("/saved");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, [id, navigate]);

  const handleChange = (section, key, value, index = null) => {
    if (section === "skills") {
      setFormData((prev) => ({
        ...prev,
        skills: { ...prev.skills, [key]: value },
      }));
      return;
    }

    if (Array.isArray(formData[section])) {
      setFormData((prev) => {
        const updated = prev[section].map((item, idx) =>
          idx === index ? { ...item, [key]: value } : item
        );
        return { ...prev, [section]: updated };
      });
      return;
    }

    setFormData((prev) => ({ ...prev, [section]: value }));
  };

  const addNewItem = (section, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem],
    }));
  };

  const handleSaveResume = async () => {
    setIsSaving(true);
    const timestamp = new Date().toISOString();
    const payload = {
      ...formData,
      template: selectedTemplate,
      updatedAt: timestamp,
    };

    try {
      if (editingId) {
        await API.put(`/resumes/${editingId}`, payload);
        toast.success("Resume updated successfully.");
      } else {
        const { data } = await API.post("/resumes", payload);
        setEditingId(data.id);
        navigate(`/editor/${data.id}`, { replace: true });
        toast.success("Resume saved successfully.");
      }

      setFormData((prev) => ({ ...prev, updatedAt: timestamp }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to sync resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${formData.name || "My_Resume"}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    `,
    onAfterPrint: () => toast.success("Resume downloaded successfully!"),
  });

  const lastSyncedLabel = formData.updatedAt
    ? `Last synced ${new Date(formData.updatedAt).toLocaleString()}`
    : editingId
    ? "Unsaved changes"
    : "Not saved yet";

  return (
    <div className="flex min-h-screen flex-col gap-10 bg-slate-50/80 px-4 py-6 text-slate-900 transition-colors duration-300 md:flex-row md:px-6 dark:bg-transparent dark:text-neutral-100">
      {/* ===== LEFT PANEL (Form Inputs) ===== */}
      <div className="flex-1 h-screen overflow-y-auto rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-900/70 dark:shadow-[0_0_40px_rgba(15,23,42,0.6)]">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-neutral-50">
          Resume Builder
        </h2>

        {isLoading && (
          <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            Loading resume data...
          </div>
        )}

        {/* ===== Header Info ===== */}
        <h3 className="mt-6 mb-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
          Header / Contact Info
        </h3>
        {["name", "title", "phone", "email", "linkedin", "github", "website", "location"].map(
          (field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={(e) => handleChange(field, null, e.target.value)}
              className="w-full mb-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
            />
          )
        )}

        {/* ===== Summary ===== */}
        <h3 className="mt-6 mb-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
          Professional Summary
        </h3>
        <textarea
          rows="3"
          placeholder="Write 2–3 lines about your background, expertise, and goals"
          value={formData.summary}
          onChange={(e) => handleChange("summary", null, e.target.value)}
          className="w-full mb-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />

        {/* ===== Skills ===== */}
        <h3 className="mt-6 mb-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
          Skills
        </h3>
        {Object.keys(formData.skills).map((key) => (
          <input
            key={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={formData.skills[key]}
            onChange={(e) => handleChange("skills", key, e.target.value)}
            className="w-full mb-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
        ))}

        {/* ===== Experience ===== */}
        <h3 className="mt-6 mb-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
          Experience
        </h3>
        {formData.experience.map((exp, i) => (
          <div
            key={`experience-${i}`}
            className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/80"
          >
            {["title", "company", "location", "duration", "details"].map((key) => (
              <input
                key={`${key}-${i}`}
                placeholder={key}
                value={exp[key]}
                onChange={(e) => handleChange("experience", key, e.target.value, i)}
                className="w-full mb-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
            ))}
          </div>
        ))}
        <button
          onClick={() => addNewItem("experience", clone(experienceTemplate))}
          className="mt-1 rounded-md bg-emerald-500 px-4 py-1 text-sm font-medium text-neutral-950 transition-colors hover:bg-emerald-400"
        >
          + Add Experience
        </button>

        {/* ===== Projects ===== */}
        <h3 className="mt-6 mb-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
          Projects
        </h3>
        {formData.projects.map((proj, i) => (
          <div
            key={`project-${i}`}
            className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/80"
          >
            {["name", "stack", "description", "link"].map((key) => (
              <input
                key={`${key}-${i}`}
                placeholder={key}
                value={proj[key]}
                onChange={(e) => handleChange("projects", key, e.target.value, i)}
                className="w-full mb-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
            ))}
          </div>
        ))}
        <button
          onClick={() => addNewItem("projects", clone(projectTemplate))}
          className="mt-1 rounded-md bg-emerald-500 px-4 py-1 text-sm font-medium text-neutral-950 transition-colors hover:bg-emerald-400"
        >
          + Add Project
        </button>

        {/* ===== Education ===== */}
        <h3 className="mt-6 mb-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
          Education
        </h3>
        {formData.education.map((edu, i) => (
          <div
            key={`education-${i}`}
            className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-neutral-800 dark:bg-neutral-900/80"
          >
            {["degree", "institution", "duration", "cgpa"].map((key) => (
              <input
                key={`${key}-${i}`}
                placeholder={key}
                value={edu[key]}
                onChange={(e) => handleChange("education", key, e.target.value, i)}
                className="w-full mb-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
              />
            ))}
          </div>
        ))}
        <button
          onClick={() => addNewItem("education", clone(educationTemplate))}
          className="mt-1 rounded-md bg-emerald-500 px-4 py-1 text-sm font-medium text-neutral-950 transition-colors hover:bg-emerald-400"
        >
          + Add Education
        </button>

        {/* ===== Certifications ===== */}
        <h3 className="mt-6 mb-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
          Certifications
        </h3>
        {formData.certifications.map((cert, i) => (
          <input
            key={`cert-${i}`}
            placeholder="Certification"
            value={cert}
            onChange={(e) => {
              const updated = [...formData.certifications];
              updated[i] = e.target.value;
              setFormData((prev) => ({ ...prev, certifications: updated }));
            }}
            className="w-full mb-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
        ))}
        <button
          onClick={() => addNewItem("certifications", "")}
          className="mt-1 rounded-md bg-emerald-500 px-4 py-1 text-sm font-medium text-neutral-950 transition-colors hover:bg-emerald-400"
        >
          + Add Certification
        </button>

        {/* ===== Achievements ===== */}
        <h3 className="mt-6 mb-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
          Achievements
        </h3>
        {formData.achievements.map((ach, i) => (
          <input
            key={`achievement-${i}`}
            placeholder="Achievement"
            value={ach}
            onChange={(e) => {
              const updated = [...formData.achievements];
              updated[i] = e.target.value;
              setFormData((prev) => ({ ...prev, achievements: updated }));
            }}
            className="w-full mb-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
        ))}
        <button
          onClick={() => addNewItem("achievements", "")}
          className="mt-1 rounded-md bg-emerald-500 px-4 py-1 text-sm font-medium text-neutral-950 transition-colors hover:bg-emerald-400"
        >
          + Add Achievement
        </button>

        {/* ===== Languages ===== */}
        <h3 className="mt-6 mb-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
          Languages
        </h3>
        <input
          placeholder="e.g., English, Hindi, Telugu"
          value={formData.languages}
          onChange={(e) => handleChange("languages", null, e.target.value)}
          className="w-full mb-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />

        {/* ===== Template Selector ===== */}
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="w-full mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        >
          {templateOptions.map((template) => (
            <option key={template} value={template}>
              {template.charAt(0).toUpperCase() + template.slice(1)}
            </option>
          ))}
        </select>

        {/* ===== Save & Download Actions ===== */}
        <button
          onClick={handleSaveResume}
          disabled={isSaving || isLoading}
          className="w-full mt-6 rounded-md bg-emerald-500 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSaving ? "Syncing..." : editingId ? "Update Resume" : "Save Resume"}
        </button>
        <p className="mt-2 text-center text-xs text-slate-500 dark:text-neutral-500">
          {lastSyncedLabel}
        </p>

        <button
          onClick={handlePrint}
          className="w-full mt-4 rounded-md bg-slate-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/90 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white"
        >
          📄 Download Resume
        </button>
      </div>

      {/* ===== RIGHT PANEL (Preview Section) ===== */}
      <div className="flex-1 h-screen overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-900/60 dark:shadow-[0_0_40px_rgba(15,23,42,0.8)]">
        <ResumePreview
          ref={componentRef}
          formData={formData}
          selectedTemplate={selectedTemplate}
        />
      </div>
    </div>
  );
}

export default ResumeEditor;
