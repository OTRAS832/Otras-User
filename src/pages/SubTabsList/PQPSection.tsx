import React from "react";
import { FileText, ChevronRight } from "lucide-react";

interface PQPItem {
  year: string;
  jobTitle: string;
  questions: string;
  pages: string;
  languages: string;
  pdfUrl: string;
}

const PQPSection: React.FC<{ data: PQPItem[] }> = ({ data }) => {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a237e] text-white text-center py-3">
        <h2 className="text-lg font-semibold uppercase tracking-wide">PQP</h2>
      </div>

      {/* Top Filter Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
          <button className="bg-[#1a237e] text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm hover:bg-[#303f9f] transition">
            Download Previous Year Papers
          </button>

          <div className="flex flex-wrap gap-3">
            <button className="bg-[#1a237e] text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm hover:bg-[#303f9f]">
              SSC PQP
            </button>
            <select className="border border-gray-300 text-gray-700 text-sm rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500">
              <option>CBT-I</option>
              <option>CBT-II</option>
            </select>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3">
          {[
            "SSC GD",
            "SSC MTS",
            "SSC CGL",
            "SSC JE",
            "SSC CPO",
            "SSC CHSL",
            "SSC Stenographer",
          ].map((cat, idx) => (
            <button
              key={idx}
              className="px-4 py-1.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 font-medium hover:bg-blue-600 hover:text-white transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Papers Section */}
      <div className="p-6 space-y-6">
        {data.map((paper, index) => (
          <div key={index}>
            {/* Year Label */}
            {index === 0 ||
            data[index - 1].year !== paper.year ? (
              <h3 className="font-semibold text-gray-700 text-base mb-3">
                {paper.year}
              </h3>
            ) : null}

            {/* Paper Card */}
            <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col md:flex-row justify-between items-start md:items-center bg-white">
              {/* Left */}
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-900 text-base mb-1">
                  {paper.jobTitle}
                </h4>

                <div className="text-sm text-gray-600 mb-2">
                  <span>{paper.questions}</span> • <span>{paper.pages}</span>
                </div>

                <p className="text-sm text-gray-700">
                  Available in:{" "}
                  <span className="font-medium text-gray-900">
                    {paper.languages}
                  </span>
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end mt-4 md:mt-0">
                <a
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1a237e] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-[#303f9f] transition"
                >
                  <FileText size={16} />
                  Download PDF
                </a>

                <button className="text-gray-600 text-xs mt-2 flex items-center hover:text-blue-600">
                  View More <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PQPSection;
