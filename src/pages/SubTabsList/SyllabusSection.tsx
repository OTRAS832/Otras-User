import React from "react";

interface SyllabusData {
  part?: string;
  subject: string;
  maxMarks: string | number;
  duration: string;
  durationVH?: string;
  pdfUrl?: string;
}

const SyllabusSection: React.FC<{ data: SyllabusData[] }> = ({ data }) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a237e] text-white text-center py-3">
        <h2 className="text-lg font-semibold uppercase tracking-wide">
          Syllabus
        </h2>
      </div>

      {/* Top Section */}
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <h3 className="text-gray-800 font-semibold text-base">
            Complete Syllabus
          </h3>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
            📄 Download PDF
          </button>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {["SSC", "Bank", "UPSC", "RRB", "Railways", "Other"].map((cat) => (
            <button
              key={cat}
              className="bg-gray-100 border border-gray-300 px-4 py-1.5 rounded-md text-sm text-gray-700 font-medium hover:bg-blue-600 hover:text-white transition"
            >
              {cat} ⌄
            </button>
          ))}
        </div>

        {/* Exam Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 text-sm text-gray-800 leading-relaxed">
          <p className="font-medium text-gray-900 mb-2">
            Combined Graduate Level (Tier-I) Examination
          </p>
          <p>
            Tier-I of the Combined Graduate Level Examination would be common
            for all categories of posts and will be held in one session.
          </p>
        </div>

        {/* Table 1 */}
        <h4 className="text-base font-semibold text-gray-800 mb-2">
          Examination Pattern:
        </h4>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Part</th>
                <th className="border px-3 py-2 text-left">Subject</th>
                <th className="border px-3 py-2 text-left">Max. Marks / Questions</th>
                <th className="border px-3 py-2 text-left">
                  Duration (General Candidates)
                </th>
                <th className="border px-3 py-2 text-left">
                  Duration (VH Candidates)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 text-center">{item.part}</td>
                  <td className="border px-3 py-2">{item.subject}</td>
                  <td className="border px-3 py-2">{item.maxMarks}</td>
                  <td className="border px-3 py-2">{item.duration}</td>
                  <td className="border px-3 py-2">
                    {item.durationVH || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tier-II Scheme */}
        <h4 className="text-base font-semibold text-gray-800 mb-2">
          Scheme of Examination for Tier-II:
        </h4>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">Paper No.</th>
                <th className="border px-3 py-2">Subject / Paper</th>
                <th className="border px-3 py-2">Max. Marks / Questions</th>
                <th className="border px-3 py-2">Duration (General)</th>
                <th className="border px-3 py-2">Duration (VH Candidates)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border px-3 py-2 text-center">I</td>
                <td className="border px-3 py-2">Arithmetical Ability</td>
                <td className="border px-3 py-2">200 (100 Questions)</td>
                <td className="border px-3 py-2">2 Hours (10:00 AM to 12:00 PM)</td>
                <td className="border px-3 py-2">2 Hours 40 Min (10:00 AM to 12:40 PM)</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border px-3 py-2 text-center">II</td>
                <td className="border px-3 py-2">English Language & Comprehension</td>
                <td className="border px-3 py-2">200</td>
                <td className="border px-3 py-2">2 Hours (2:00 PM to 4:00 PM)</td>
                <td className="border px-3 py-2">2 Hours 40 Min (2:00 PM to 4:40 PM)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Download Full Syllabus Button */}
        <div className="text-center mt-10">
          <button className="bg-[#7b1fa2] hover:bg-[#6a1b9a] text-white font-semibold px-6 py-3 rounded-md shadow-md transition">
            📘 Download Complete Syllabus
          </button>
        </div>
      </div>
    </div>
  );
};

export default SyllabusSection;
