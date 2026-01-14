import React from "react";

export default function TemplateElegant({ data }) {
  // Safe handling of arrays and objects
  const safeLanguages = Array.isArray(data.languages)
    ? data.languages
    : data.languages
    ? [data.languages]
    : [];

  const safeSkills = Array.isArray(data.skills)
    ? data.skills
    : typeof data.skills === "object" && data.skills !== null
    ? Object.values(data.skills)
    : data.skills
    ? [data.skills]
    : [];

  const safeExperience = Array.isArray(data.experience)
    ? data.experience
    : [];

  return (
    <div
      className="flex flex-col md:flex-row w-full max-w-[794px] mx-auto bg-white shadow-lg font-sans border border-gray-200"
      style={{
        width: "210mm",
        height: "297mm",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ===== LEFT PANEL ===== */}
      <aside className="bg-[#b8e3ed] w-full md:w-1/3 p-6 flex flex-col justify-start">
        {/* ===== PROFILE IMAGE ===== */}
        <div className="text-center mb-5">
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border-4 border-white shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-sm text-gray-500">
              No Image
            </div>
          )}
          <h2 className="text-lg font-semibold">{data.name || "Your Name"}</h2>
          <p className="text-sm font-medium text-gray-800">
            {data.title || "Professional Title"}
          </p>
        </div>

        {/* ===== CONTACT ===== */}
        {(data.phone ||
          data.email ||
          data.linkedin ||
          data.github ||
          data.website ||
          data.location) && (
          <div className="mb-5 text-sm break-words">
            <h3 className="uppercase text-xs font-semibold border-b border-gray-400 mb-1 pb-1">
              Contact
            </h3>
            <ul className="space-y-1">
              {data.phone && (
                <li>
                  📞{" "}
                  <a
                    href={`tel:${data.phone}`}
                    className="hover:underline text-gray-800"
                  >
                    {data.phone}
                  </a>
                </li>
              )}
              {data.email && (
                <li>
                  ✉️{" "}
                  <a
                    href={`mailto:${data.email}`}
                    className="hover:underline text-gray-800"
                  >
                    {data.email}
                  </a>
                </li>
              )}
              {data.linkedin && (
                <li>
                  🌐 LinkedIn:{" "}
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {data.linkedin}
                  </a>
                </li>
              )}
              {data.github && (
                <li>
                  💻 GitHub:{" "}
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {data.github}
                  </a>
                </li>
              )}
              {data.website && (
                <li>
                  🌐 Website:{" "}
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {data.website}
                  </a>
                </li>
              )}
              {data.location && <li>📍 {data.location}</li>}
            </ul>
          </div>
        )}

        {/* ===== SKILLS ===== */}
        {safeSkills.length > 0 && (
          <div className="mb-5 text-sm">
            <h3 className="uppercase text-xs font-semibold border-b border-gray-400 mb-1 pb-1">
              Skills
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {safeSkills.map(
                (skill, i) =>
                  skill && (
                    <li key={i} className="text-gray-700">
                      {typeof skill === "string" ? skill : JSON.stringify(skill)}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}

        {/* ===== LANGUAGES ===== */}
        {safeLanguages.length > 0 && (
          <div className="mb-5 text-sm">
            <h3 className="uppercase text-xs font-semibold border-b border-gray-400 mb-1 pb-1">
              Languages
            </h3>
            <ul className="list-disc list-inside space-y-1">
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
                      <div className="h-[6px] bg-gray-300 rounded-md overflow-hidden mt-1 w-[80%]">
                        <div
                          className="h-full bg-[#007b83]"
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

        {/* ===== REFERENCES ===== */}
        <div className="text-sm mt-auto">
          <h3 className="uppercase text-xs font-semibold border-b border-gray-400 mb-1 pb-1">
            References
          </h3>
          <p className="text-gray-700">Available upon request</p>
        </div>
      </aside>

      {/* ===== RIGHT PANEL ===== */}
      <main className="flex-1 p-6 md:p-8 bg-white overflow-hidden flex flex-col gap-5">
        {/* ===== PROFESSIONAL SUMMARY ===== */}
        {data.summary && (
          <section>
            <h1 className="text-xl font-bold text-[#007b83] border-b-2 border-[#007b83] mb-2">
              Professional Summary
            </h1>
            {/* 🟢 Preserve newlines */}
            <p className="text-gray-700 text-sm leading-relaxed break-words whitespace-pre-wrap">
              {data.summary}
            </p>
          </section>
        )}

        {/* ===== EDUCATION ===== */}
        {Array.isArray(data.education) && data.education.length > 0 && (
          <section>
            <h1 className="text-xl font-bold text-[#007b83] border-b-2 border-[#007b83] mb-2">
              Education
            </h1>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">
                  {edu.degree || "Degree / Level"}
                </p>
                <p className="text-sm text-gray-600 break-words">
                  {edu.institution || "Institution"} |{" "}
                  {edu.duration || "Duration"} | CGPA: {edu.cgpa || "N/A"}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* ===== WORK EXPERIENCE ===== */}
        {safeExperience.length > 0 && (
          <section>
            <h1 className="text-xl font-bold text-[#007b83] border-b-2 border-[#007b83] mb-2">
              Work Experience
            </h1>
            {safeExperience.map((exp, i) => (
              <div key={i} className="mb-3">
                <h2 className="font-semibold text-[#007b83]">
                  {exp.position || exp.title || "Position"}
                </h2>
                <p className="text-sm text-gray-600">
                  {exp.company || "Company"} | {exp.duration || "Duration"}
                </p>
                {exp.details && (
                  <p className="text-gray-700 text-sm break-words">
                    {exp.details}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* ===== PROJECTS ===== */}
        {Array.isArray(data.projects) && data.projects.length > 0 && (
          <section>
            <h1 className="text-xl font-bold text-[#007b83] border-b-2 border-[#007b83] mb-2">
              Projects
            </h1>
            {data.projects.map((proj, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{proj.name || "Project Name"}</p>
                {proj.stack && (
                  <p className="text-sm text-gray-600">{proj.stack}</p>
                )}
                {proj.description && (
                  <p className="text-gray-700 text-sm break-words">
                    {proj.description}
                  </p>
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
          </section>
        )}

        {/* ===== CERTIFICATIONS ===== */}
        {Array.isArray(data.certifications) &&
          data.certifications.length > 0 && (
            <section>
              <h1 className="text-xl font-bold text-[#007b83] border-b-2 border-[#007b83] mb-2">
                Certifications
              </h1>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {data.certifications.map(
                  (cert, i) => cert && <li key={i}>{cert}</li>
                )}
              </ul>
            </section>
          )}

        {/* ===== ACHIEVEMENTS ===== */}
        {Array.isArray(data.achievements) && data.achievements.length > 0 && (
          <section>
            <h1 className="text-xl font-bold text-[#007b83] border-b-2 border-[#007b83] mb-2">
              Achievements
            </h1>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {data.achievements.map(
                (ach, i) => ach && <li key={i}>{ach}</li>
              )}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
