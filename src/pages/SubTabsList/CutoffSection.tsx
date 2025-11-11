import React from "react";

interface CutoffItem {
  jobTitle: string;
  releasedDate: string;
  cutoffUrl: string;
  filePath: string;
}

const CutoffSection: React.FC<{ data: CutoffItem[] }> = ({ data }) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a237e] text-white text-center py-3">
        <h2 className="text-lg font-semibold uppercase tracking-wide">
          Cut-off
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
                Release Date
              </th>
              <th className="border px-4 py-3 text-left w-[160px]">
                Cut-off Marks
              </th>
              <th className="border px-4 py-3 text-center w-[160px]">
                PDF Download
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
                  {item.releasedDate || "Coming Soon"}
                </td>

                <td className="border px-4 py-3 text-red-600 font-semibold">
                  <a
                    href={item.cutoffUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    Click here
                  </a>
                </td>

                <td className="border px-4 py-3 text-center">
                  <a
                    href={item.filePath}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#1a237e] text-white px-4 py-1.5 rounded-md text-xs font-medium hover:bg-[#303f9f] transition"
                  >
                    Download PDF
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

export default CutoffSection;
