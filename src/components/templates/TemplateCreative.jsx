import React from "react";

export default function TemplateCreative({ data }) {
  // 🛡️ Ensure languages is always an array
  const safeLanguages = Array.isArray(data.languages)
    ? data.languages
    : data.languages
    ? [data.languages]
    : [];

  return (
    <div className="font-[Open_Sans] bg-[#ffffff] text-[#222] max-w-[794px] mx-auto shadow-xl md:grid md:grid-cols-[250px_1fr] h-auto min-h-screen">
      
      {/* ===== Sidebar ===== */}
      <aside className="bg-[#333436] text-white p-6 flex flex-col justify-start overflow-y-auto max-h-[100vh]">
        
        {/* Photo */}
        <div className="w-[100px] h-[100px] rounded-full border-4 border-white overflow-hidden shadow-lg mx-auto mb-4">
          {data.photo ? (
            <img src={data.photo} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* Contact */}
        <section className="mb-5">
          <h2 className="font-[Montserrat] font-bold text-[14px] uppercase tracking-wide mb-2">
            Contact
          </h2>
          <ul className="space-y-1 text-sm text-gray-100 break-words">
            <li>📞 {data.phone || "Not provided"}</li>
            <li>✉️ {data.email || "Not provided"}</li>
            <li>
              🌐 LinkedIn:{" "}
              {data.linkedin ? (
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="underline text-gray-100">
                  {data.linkedin}
                </a>
              ) : (
                "Not provided"
              )}
            </li>
            <li>
              💻 GitHub:{" "}
              {data.github ? (
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="underline text-gray-100">
                  {data.github}
                </a>
              ) : (
                "Not provided"
              )}
            </li>
            <li>
              🌐 Website:{" "}
              {data.website ? (
                <a href={data.website} target="_blank" rel="noopener noreferrer" className="underline text-gray-100">
                  {data.website}
                </a>
              ) : (
                "Not provided"
              )}
            </li>
            <li>📍 {data.location || "Not provided"}</li>
          </ul>
        </section>

        {/* Skills */}
        {data.skills && Object.keys(data.skills).length > 0 && (
          <section className="mb-5">
            <h2 className="font-[Montserrat] font-bold text-[14px] uppercase tracking-wide mb-2">
              Skills
            </h2>
            {Object.entries(data.skills).map(([skill, value], i) => (
              <div key={i} className="mb-2">
                <p className="text-xs text-gray-100 font-semibold mb-1">{skill}</p>
                {typeof value === "number" ? (
                  <div className="h-[6px] bg-gray-700 rounded-md overflow-hidden">
                    <div className="bg-[#f4a35c] h-full" style={{ width: `${value}%` }}></div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-300">{value}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="mb-5">
            <h2 className="font-[Montserrat] font-bold text-[14px] uppercase tracking-wide mb-2">
              Education
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2 text-gray-100 break-words text-xs">
                <p className="text-[#f4a35c] font-semibold">{edu.duration}</p>
                <p className="font-bold">{edu.degree}</p>
                <p className="opacity-80">{edu.institution}</p>
                {edu.cgpa && <p className="text-xs mt-0.5">CGPA: {edu.cgpa}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="mb-5">
            <h2 className="font-[Montserrat] font-bold text-[14px] uppercase tracking-wide mb-2">
              Certifications
            </h2>
            {data.certifications.map((cert, i) => (
              <p key={i} className="text-gray-100 text-xs mb-1 break-words">
                • {cert}
              </p>
            ))}
          </section>
        )}

        {/* Achievements */}
        {data.achievements && data.achievements.length > 0 && (
          <section className="mb-5">
            <h2 className="font-[Montserrat] font-bold text-[14px] uppercase tracking-wide mb-2">
              Achievements
            </h2>
            {data.achievements.map((ach, i) => (
              <p key={i} className="text-gray-100 text-xs mb-1 break-words">
                • {ach}
              </p>
            ))}
          </section>
        )}
      </aside>

      {/* ===== Main Section ===== */}
      <main className="relative overflow-y-auto p-6 max-h-[100vh]">
        
        {/* Header */}
        <header className="mb-6">
          <h1 className="font-[Montserrat] text-[28px] font-extrabold uppercase text-[#333] break-words">
            {data.name || "Your Name"}
          </h1>
          <p className="text-[#6b6b6b] font-semibold text-sm break-words">
            {data.title || "Your Professional Title"}
          </p>
        </header>

        {/* Summary */}
        {data.summary && (
          <section className="mb-6">
            <h2 className="text-[16px] font-[Montserrat] font-bold border-b-2 border-gray-200 pb-1 mb-2 flex items-center gap-1">
              <span className="inline-block w-[24px] h-[4px] bg-[#f4a35c] rounded-md"></span>
              About Me
            </h2>
            <p className="text-[13px] text-gray-600 leading-relaxed break-words">
              {data.summary}
            </p>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-[16px] font-[Montserrat] font-bold border-b-2 border-gray-200 pb-1 mb-2 flex items-center gap-1">
              <span className="inline-block w-[24px] h-[4px] bg-[#f4a35c] rounded-md"></span>
              Projects
            </h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-gray-800 text-[13px]">{proj.name}</p>
                <p className="text-xs text-gray-500">{proj.stack}</p>
                <p className="text-xs text-gray-600">{proj.description}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs hover:underline break-words"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-[16px] font-[Montserrat] font-bold border-b-2 border-gray-200 pb-1 mb-2 flex items-center gap-1">
              <span className="inline-block w-[24px] h-[4px] bg-[#f4a35c] rounded-md"></span>
              Work Experience
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-2">
                <p className="text-xs text-gray-500">{exp.duration || "N/A"}</p>
                <p className="font-bold text-gray-800 text-[13px]">{exp.title || "Job Title"}</p>
                <p className="text-xs text-gray-500">{exp.company || "Company Name"}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{exp.details || "No details"}</p>
              </div>
            ))}
          </section>
        )}

        {/* 🛠 Languages - Completely Safe */}
        {safeLanguages.length > 0 && (
          <section className="mb-6">
            <h2 className="text-[16px] font-[Montserrat] font-bold border-b-2 border-gray-200 pb-1 mb-2 flex items-center gap-1">
              <span className="inline-block w-[24px] h-[4px] bg-[#f4a35c] rounded-md"></span>
              Languages
            </h2>
            <div className="flex flex-col gap-2">
              {safeLanguages.map((lang, i) => {
                const name =
                  typeof lang === "object" && lang !== null
                    ? lang.name || "Unnamed"
                    : String(lang);
                const level =
                  typeof lang === "object" && lang !== null ? lang.level : null;

                return (
                  <div key={i} className="text-xs">
                    <p className="font-semibold text-gray-800">{name}</p>
                    {typeof level === "number" ? (
                      <div className="h-[6px] bg-gray-200 rounded-md overflow-hidden mt-1">
                        <div
                          className="bg-[#f4a35c] h-full"
                          style={{ width: `${level}%` }}
                        ></div>
                      </div>
                    ) : level ? (
                      <p className="text-gray-600 mt-0.5">{level}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
