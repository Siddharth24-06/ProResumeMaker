import React, { useLayoutEffect, useRef } from "react";
import ResumeA4Wrapper from "./ResumeA4Wrapper";

const TemplateModern = ({ data }) => {
  const containerRef = useRef(null);
  // 🧠 Automatically shrink content to fit A4 (297mm)
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (el) {
      const A4HeightPx = 1122; // A4 height ≈ 297mm @96dpi
      const contentHeight = el.scrollHeight;
      const nextScale = contentHeight > A4HeightPx ? A4HeightPx / contentHeight : 1;
      el.style.transform = `scale(${nextScale})`;
    }
  }, [data]);

  return (
    <ResumeA4Wrapper>
      <div
        ref={containerRef}
        className="flex bg-white shadow-lg rounded-lg overflow-hidden font-sans origin-top-left"
        style={{
          width: "210mm",
          height: "297mm",
          boxSizing: "border-box",
          transform: "scale(1)",
          transformOrigin: "top left",
          overflow: "hidden",
        }}
      >
        {/* LEFT SIDEBAR */}
        <div className="bg-[#1d2b36] text-white w-1/3 p-6 flex flex-col items-center overflow-hidden">
          {/* Profile Section */}
          <div className="text-center mb-6">
            {data.profileImage ? (
              <img
                src={data.profileImage}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover mx-auto mb-2 border-4 border-gray-700"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-500 flex items-center justify-center text-sm text-gray-200 mb-2">
                No Image
              </div>
            )}
            <h2 className="text-xl font-semibold break-words">
              {data.name || "Your Name"}
            </h2>
            <p className="text-sm text-gray-300 break-words">
              {data.title || "Your Professional Title"}
            </p>
          </div>

          {/* Contact */}
          {(data.phone ||
            data.email ||
            data.location ||
            data.linkedin ||
            data.github ||
            data.website) && (
            <div className="w-full mb-4 text-sm break-words">
              <h3 className="text-xs uppercase border-b border-gray-600 mb-2 pb-1">
                Contact
              </h3>
              {data.phone && <p>📞 {data.phone}</p>}
              {data.email && <p>✉️ {data.email}</p>}
              {data.location && <p>📍 {data.location}</p>}
              {data.linkedin && (
                <p>
                  🔗{" "}
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    {data.linkedin}
                  </a>
                </p>
              )}
              {data.github && (
                <p>
                  💻{" "}
                  <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    {data.github}
                  </a>
                </p>
              )}
              {data.website && (
                <p>
                  🌐{" "}
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400"
                  >
                    {data.website}
                  </a>
                </p>
              )}
            </div>
          )}

          {/* Skills */}
          {data.skills &&
            Object.values(data.skills).some((v) => v) && (
              <div className="w-full mb-4">
                <h3 className="text-xs uppercase border-b border-gray-600 mb-2 pb-1">
                  Skills
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-200 break-words space-y-1">
                  {Object.entries(data.skills).map(
                    ([key, value]) =>
                      value && (
                        <li key={key}>
                          <strong>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </strong>{" "}
                          {value}
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}

          {/* Languages */}
          {data.languages && (
            <div className="w-full">
              <h3 className="text-xs uppercase border-b border-gray-600 mb-2 pb-1">
                Languages
              </h3>
              <p className="text-gray-200 text-sm break-words">
                {Array.isArray(data.languages)
                  ? data.languages.join(", ")
                  : data.languages}
              </p>
            </div>
          )}
        </div>

        {/* MAIN SECTION */}
        <div className="flex-1 p-8 bg-white overflow-hidden">
          {/* Professional Summary */}
          {data.summary && (
            <section className="mb-6">
              <h1 className="text-2xl font-bold border-b-2 border-[#1d2b36] mb-2 inline-block">
                Professional Summary
              </h1>
              {/* 🟢 Preserve line breaks with whitespace-pre-wrap */}
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
                {data.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {Array.isArray(data.experience) && data.experience.length > 0 && (
            <section className="mb-6">
              <h1 className="text-2xl font-bold border-b-2 border-[#1d2b36] mb-2 inline-block">
                Experience
              </h1>
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-3">
                  {exp.title && (
                    <h2 className="font-semibold text-[#1d2b36]">
                      {exp.title}
                    </h2>
                  )}
                  <p className="text-sm text-gray-600">
                    {exp.company && <strong>{exp.company}</strong>}{" "}
                    {exp.location && `| ${exp.location}`}{" "}
                    {exp.duration && `| ${exp.duration}`}
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

          {/* Projects */}
          {Array.isArray(data.projects) && data.projects.length > 0 && (
            <section className="mb-6">
              <h1 className="text-2xl font-bold border-b-2 border-[#1d2b36] mb-2 inline-block">
                Projects
              </h1>
              {data.projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold text-[#1d2b36]">{proj.name}</p>
                  <p className="text-sm text-gray-600">{proj.stack}</p>
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

          {/* Education */}
          {Array.isArray(data.education) && data.education.length > 0 && (
            <section className="mb-6">
              <h1 className="text-2xl font-bold border-b-2 border-[#1d2b36] mb-2 inline-block">
                Education
              </h1>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-2">
                  {edu.degree && (
                    <p className="font-semibold">{edu.degree}</p>
                  )}
                  <p className="text-sm text-gray-600 break-words">
                    {edu.institution} {edu.duration && `| ${edu.duration}`}
                  </p>
                  {edu.cgpa && (
                    <p className="text-sm text-gray-600">CGPA: {edu.cgpa}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {Array.isArray(data.certifications) &&
            data.certifications.filter((c) => c).length > 0 && (
              <section className="mb-6">
                <h1 className="text-2xl font-bold border-b-2 border-[#1d2b36] mb-2 inline-block">
                  Certifications
                </h1>
                {data.certifications.map(
                  (cert, i) =>
                    cert && (
                      <p key={i} className="text-sm text-gray-700 break-words">
                        {cert}
                      </p>
                    )
                )}
              </section>
            )}

          {/* Achievements */}
          {Array.isArray(data.achievements) &&
            data.achievements.filter((a) => a).length > 0 && (
              <section className="mb-6">
                <h1 className="text-2xl font-bold border-b-2 border-[#1d2b36] mb-2 inline-block">
                  Achievements
                </h1>
                {data.achievements.map(
                  (a, i) =>
                    a && (
                      <p key={i} className="text-sm text-gray-700 break-words">
                        {a}
                      </p>
                    )
                )}
              </section>
            )}

          {/* Volunteer */}
          {Array.isArray(data.volunteer) && data.volunteer.length > 0 && (
            <section>
              <h1 className="text-2xl font-bold border-b-2 border-[#1d2b36] mb-2 inline-block">
                Volunteer Work
              </h1>
              {data.volunteer.map((vol, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold">{vol.role}</p>
                  <p className="text-sm text-gray-600 break-words">
                    {vol.organization}{" "}
                    {vol.description && `| ${vol.description}`}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </ResumeA4Wrapper>
  );
};

export default TemplateModern;
