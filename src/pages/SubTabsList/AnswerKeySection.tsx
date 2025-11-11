import React from "react";

interface AnswerKeyItem {
  jobTitle: string;
  releaseDate: string;
  pdfUrl: string;
}

const AnswerKeySection: React.FC<{ data: AnswerKeyItem[] }> = ({ data }) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a237e] text-white text-center py-3">
        <h2 className="text-lg font-semibold uppercase tracking-wide">
          Answer Key
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr className="text-gray-800">
              <th className="border px-4 py-3 text-left w-[60px]">S.No</th>
              <th className="border px-4 py-3 text-left">Name of Exam</th>
              <th className="border px-4 py-3 text-left w-[180px]">
                Answer Key Release Date
              </th>
              <th className="border px-4 py-3 text-center w-[140px]">
                Answer Key
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition text-gray-700"
              >
                <td className="border px-4 py-3 text-center font-medium">
                  {index + 1}.
                </td>
                <td className="border px-4 py-3">{item.jobTitle}</td>
                <td className="border px-4 py-3 text-center">
                  {item.releaseDate || "Coming Soon"}
                </td>
                <td className="border px-4 py-3 text-center">
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Click here
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnswerKeySection;
