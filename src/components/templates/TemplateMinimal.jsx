import React, { useLayoutEffect, useRef } from "react";

export default function TemplateMinimal({ data }) {
  const containerRef = useRef(null);
  // 🧩 Auto-scale content to fit A4 height
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (el) {
      const A4HeightPx = 1122; // ~297mm at 96dpi
      const contentHeight = el.scrollHeight;
      const nextScale = contentHeight > A4HeightPx ? A4HeightPx / contentHeight : 1;
      el.style.transform = `scale(${nextScale})`;
    }
  }, [data]);

  const safeLanguages = Array.isArray(data.languages)
    ? data.languages
    : data.languages
    ? [data.languages]
    : [];

  return (
    <div
      ref={containerRef}
      className="font-[Open_Sans] bg-[#fffaf9] text-[#222] mx-auto shadow-lg border border-gray-200 flex flex-col origin-top-left"
      style={{
        width: "210mm",
        height: "297mm",
        transform: "scale(1)",
        transformOrigin: "top left",
        overflow: "hidden",
      }}
    >
      {/* ===== Header Banner ===== */}
      <div className="relative bg-gradient-to-b from-[#646517] to-[#50500f] text-white py-8 px-6 sm:py-10 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="absolute -bottom-3 left-0 w-full h-3 bg-white transform skew-y-3"></div>
        <div className="sm:ml-auto sm:text-right text-center w-full">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-[Montserrat] tracking-wider uppercase break-words">
            {data.name?.split(" ")[0] || "First"}{" "}
            <span className="font-semibold opacity-90">
              {data.name?.split(" ")[1] || "Last"}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-100">
            {data.title || "Professional Title"}
          </p>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="flex flex-col md:flex-row flex-1 w-full">
        {/* ===== Left Sidebar ===== */}
        <aside className="w-full md:w-[35%] p-6 sm:p-8 flex flex-col gap-6 bg-[#f5f5f5] overflow-hidden">
          {/* Contact */}
          {(data.phone || data.email || data.linkedin || data.location) && (
            <div>
              <h2 className="font-semibold uppercase text-sm text-[#50500f] mb-2 border-b border-gray-300 pb-1">
                Contact
              </h2>
              <ul className="text-sm text-gray-700 space-y-1 break-words">
                {data.phone && <li>📞 {data.phone}</li>}
                {data.email && <li>✉️ {data.email}</li>}
                {data.linkedin && (
                  <li>
                    🔗{" "}
                    <a
                      href={data.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {data.linkedin}
                    </a>
                  </li>
                )}
                {data.location && <li>📍 {data.location}</li>}
              </ul>
            </div>
          )}

          {/* Skills */}
          {data.skills && Object.values(data.skills).some((v) => v) && (
            <div>
              <h2 className="font-semibold uppercase text-sm text-[#50500f] mb-2 border-b border-gray-300 pb-1">
                Key Skills
              </h2>
              <ul className="list-disc pl-5 text-gray-700 text-sm break-words space-y-1">
                {Object.entries(data.skills).map(
                  ([key, value]) => value && <li key={key}>{value}</li>
                )}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {Array.isArray(data.certifications) && data.certifications.length > 0 && (
            <div>
              <h2 className="font-semibold uppercase text-sm text-[#50500f] mb-2 border-b border-gray-300 pb-1">
                Certifications
              </h2>
              <ul className="list-disc pl-5 text-gray-700 text-sm break-words space-y-1">
                {data.certifications.map((c, i) => c && <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}

          {/* Languages */}
          {safeLanguages.length > 0 && (
            <div>
              <h2 className="font-semibold uppercase text-sm text-[#50500f] mb-2 border-b border-gray-300 pb-1">
                Languages
              </h2>
              <ul className="list-disc pl-5 text-gray-700 text-sm break-words space-y-1">
                {safeLanguages.map((lang, i) => {
                  const name =
                    typeof lang === "object" && lang !== null
                      ? lang.name || "Unnamed"
                      : String(lang);
                  const level =
                    typeof lang === "object" && lang !== null ? lang.level : null;

                  return (
                    <li key={i}>
                      {name}
                      {typeof level === "number" ? (
                        <div className="h-[6px] bg-gray-300 rounded-md overflow-hidden mt-1 w-[90%] max-w-[160px]">
                          <div
                            className="h-full bg-[#50500f]"
                            style={{ width: `${level}%` }}
                          ></div>
                        </div>
                      ) : level ? (
                        <span className="text-gray-600 text-xs ml-1">
                          ({level})
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>

        {/* ===== Right Main Section ===== */}
        <main className="flex-1 p-6 sm:p-8 flex flex-col gap-5 overflow-hidden">
          {/* About Me */}
          {data.summary && (
            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-[#50500f] mb-2 border-b border-gray-300 pb-1">
                About Me
              </h3>
              {/* 🟢 Preserve line breaks */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
                {data.summary}
              </p>
            </section>
          )}

          {/* Professional Experience */}
          {Array.isArray(data.experience) && data.experience.length > 0 && (
            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-[#50500f] mb-2 border-b border-gray-300 pb-1">
                Professional Experience
              </h3>
              <div className="flex flex-col gap-3">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-gray-800">
                      {exp.title || "Job Title"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {exp.company || "Company"} | {exp.duration || "Duration"}
                    </p>
                    {exp.details && (
                      <p className="text-sm text-gray-700 mt-1 break-words">
                        {exp.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {Array.isArray(data.projects) && data.projects.length > 0 && (
            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-[#50500f] mb-2 border-b border-gray-300 pb-1">
                Projects
              </h3>
              <div className="flex flex-col gap-3">
                {data.projects.map((proj, i) => (
                  <div key={i}>
                    <p className="font-semibold text-gray-800">
                      {proj.name || "Project Name"}
                    </p>
                    {proj.stack && (
                      <p className="text-sm text-gray-600">{proj.stack}</p>
                    )}
                    {proj.description && (
                      <p className="text-sm text-gray-700">{proj.description}</p>
                    )}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline break-words"
                      >
                        {proj.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {Array.isArray(data.education) && data.education.length > 0 && (
            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-[#50500f] mb-2 border-b border-gray-300 pb-1">
                Education
              </h3>
              <div className="flex flex-col gap-2">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <p className="font-semibold">{edu.degree || "Degree"}</p>
                    <p className="text-sm text-gray-600 break-words">
                      {edu.institution || "Institution"} —{" "}
                      {edu.duration || "Year"}
                    </p>
                    {edu.cgpa && (
                      <p className="text-sm text-gray-700">
                        CGPA: {edu.cgpa}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {Array.isArray(data.achievements) && data.achievements.length > 0 && (
            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-[#50500f] mb-2 border-b border-gray-300 pb-1">
                Achievements
              </h3>
              <ul className="list-disc pl-5 text-gray-700 text-sm break-words space-y-1">
                {data.achievements.map((a, i) => a && <li key={i}>{a}</li>)}
              </ul>
            </section>
          )}

          {/* Volunteer Work */}
          {Array.isArray(data.volunteer) && data.volunteer.length > 0 && (
            <section>
              <h3 className="text-lg sm:text-xl font-semibold text-[#50500f] mb-2 border-b border-gray-300 pb-1">
                Volunteer Work
              </h3>
              <ul className="list-disc pl-5 text-gray-700 text-sm break-words space-y-1">
                {data.volunteer.map((v, i) => (
                  <li key={i}>
                    {v.role ? `${v.role} — ${v.organization}` : v.organization}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
