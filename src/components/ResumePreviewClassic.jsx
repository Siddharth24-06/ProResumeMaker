function ResumePreviewClassic({ data }) {
  if (!data) return null;

  const { name, email, phone, education, experience, skills } = data;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-200 py-10 px-4">
      <div
        id="resume-preview"
        className="bg-white shadow-md border border-gray-300 max-w-3xl w-full p-8 rounded-md"
      >
        <header className="text-center mb-6 border-b pb-3">
          <h1 className="text-3xl font-bold text-gray-800 uppercase tracking-wider">
            {name || "Your Name"}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {email && <span>{email}</span>} {phone && <span> | {phone}</span>}
          </p>
        </header>

        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-700 uppercase border-b border-gray-300 mb-2">
            Education
          </h2>
          <p className="text-gray-700">{education}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-700 uppercase border-b border-gray-300 mb-2">
            Experience
          </h2>
          <p className="text-gray-700">{experience}</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-700 uppercase border-b border-gray-300 mb-2">
            Skills
          </h2>
          <p className="text-gray-700">{skills}</p>
        </section>
      </div>
    </div>
  );
}

export default ResumePreviewClassic;
