import React, { useEffect, useState } from "react";

const ResultPage: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    // Dummy API simulation
    setTimeout(() => {
      setResults([
        {
          id: 1,
          examName: "SSC Constable GD 2023 Tentative Answer Key",
          releaseDate: "10-04-2024",
          link: "#",
        },
        {
          id: 2,
          examName: "Assistant Foreman 2024 CBT Revised Final Answer Key",
          releaseDate: "24-05-2024",
          link: "#",
        },
        {
          id: 3,
          examName: "Group I Services 2023 Screening Test Final Key",
          releaseDate: "Coming Soon",
          link: "#",
        },
      ]);
    }, 500);
  }, []);

  return (
    <section className="bg-white min-h-screen py-10 px-4 md:px-16">
      <div className="w-full bg-[#0B0B79] text-white py-4 rounded-t-xl text-center shadow-md mb-6">
        <h1 className="text-2xl font-semibold">Result</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-[#0B0B79] text-white text-sm md:text-base">
              <th className="border border-gray-300 py-2 px-3 text-left">S.No</th>
              <th className="border border-gray-300 py-2 px-3 text-left">
                Name of Exam
              </th>
              <th className="border border-gray-300 py-2 px-3 text-left">
                Exam Release Date
              </th>
              <th className="border border-gray-300 py-2 px-3 text-center">
                Get Result
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, index) => (
              <tr
                key={res.id}
                className="text-sm md:text-base bg-white hover:bg-gray-100 transition"
              >
                <td className="border border-gray-300 py-2 px-3 text-center font-medium">
                  {index + 1}.
                </td>
                <td className="border border-gray-300 py-2 px-3 text-gray-800">
                  {res.examName}
                </td>
                <td className="border border-gray-300 py-2 px-3 text-gray-600">
                  {res.releaseDate}
                </td>
                <td className="border border-gray-300 py-2 px-3 text-center">
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
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
    </section>
  );
};

export default ResultPage;
