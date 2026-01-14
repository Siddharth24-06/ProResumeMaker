function ResumePreviewAlt({ data }) {
  if (!data) return null;

  const { name, email, phone, education, experience, skills } = data;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 py-10 px-4">
      <div
        id="resume-preview"
        className="bg-white border-l-8 border-blue-600 rounded-xl max-w-3xl w-full p-10 shadow-xl"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{name || "Your Name"}</h1>
        <p className="text-gray-600 mb-4">
          {email && <span>{email} </span>}
          {phone && <span>• {phone}</span>}
        </p>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-blue-600 border-b pb-1 mb-1">
            Education
          </h2>
          <p className="text-gray-700">{education}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold text-blue-600 border-b pb-1 mb-1">
            Experience
          </h2>
          <p className="text-gray-700">{experience}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 border-b pb-1 mb-1">
            Skills
          </h2>
          <p className="text-gray-700">{skills}</p>
        </section>
      </div>
    </div>
  );
}

export default ResumePreviewAlt;
