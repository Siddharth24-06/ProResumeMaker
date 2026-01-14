import React from 'react';

export default function TemplateProfessional({ data }) {
  return (
    <div
      className="font-sans bg-white text-[#222] p-10 shadow-lg"
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "auto",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ===== Header ===== */}
      <header className="flex justify-between flex-wrap gap-4 border-b-4 border-[#2f8b6f] pb-3 mb-6">
        <div>
          <h1 className="text-4xl font-serif font-bold break-words">
            {data.name || "Your Name"}
          </h1>
          <p className="text-[#2f8b6f] font-semibold">
            {data.title || "Your Job Title"}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-2">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>• {data.phone}</span>}
            {data.linkedin && <span>• {data.linkedin}</span>}
            {data.github && <span>• {data.github}</span>}
            {data.website && <span>• {data.website}</span>}
            {data.location && <span>• {data.location}</span>}
          </div>
        </div>
      </header>

      {/* ===== Main Grid ===== */}
      <main
        className="grid md:grid-cols-3 gap-6 flex-1"
        style={{ overflow: "hidden" }}
      >
        {/* LEFT COLUMN */}
        <section className="col-span-2">
          {/* Professional Summary */}
          {data.summary && (
            <div className="mb-6 break-words">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                {data.summary}
              </p>
            </div>
          )}

          {/* Skills */}
          {data.skills && Object.keys(data.skills).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {Object.entries(data.skills).map(([key, value], i) => (
                  <div key={i} className="mb-1">
                    {typeof value === "number" ? (
                      <div className="w-full">
                        <p className="text-xs font-semibold mb-1">{key}</p>
                        <div className="h-3 bg-gray-200 rounded-md overflow-hidden">
                          <div
                            className="bg-[#2f8b6f] h-full"
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <span className="bg-[#e8f3ef] border-b-4 border-[#2f8b6f] text-xs font-semibold px-3 py-1">
                        {key}: {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {Array.isArray(data.experience) && data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
                Experience
              </h2>
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-3">
                  <h3 className="font-bold text-[#2f8b6f]">
                    {exp.title || "Job Title"}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {exp.company || "Company Name"}{" "}
                    {exp.duration && `| ${exp.duration}`}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {exp.details}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {Array.isArray(data.projects) && data.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
                Projects
              </h2>
              {data.projects.map((proj, i) => (
                <div key={i} className="mb-3">
                  <h3 className="font-bold text-[#2f8b6f]">
                    {proj.name || "Project Name"}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {proj.stack || "Tech Stack"}
                  </p>
                  {proj.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs hover:underline"
                    >
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RIGHT COLUMN */}
        <aside>
          {/* Education */}
          {Array.isArray(data.education) && data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} className="border p-3 mb-2 rounded-md">
                  <p className="font-bold">{edu.degree}</p>
                  <p className="text-sm text-gray-700">
                    {edu.institution} — {edu.duration}
                  </p>
                  {edu.cgpa && <p className="text-sm text-gray-700">CGPA: {edu.cgpa}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {Array.isArray(data.certifications) && data.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
                Certifications
              </h2>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {data.certifications.map((cert, i) => cert && <li key={i}>{cert}</li>)}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {Array.isArray(data.achievements) && data.achievements.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
                Achievements
              </h2>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {data.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}
              </ul>
            </div>
          )}

          {/* Languages */}
          {Array.isArray(data.languages) && data.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-2">
                Languages
              </h2>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {data.languages.map((lang, i) => lang && <li key={i}>{lang}</li>)}
              </ul>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
