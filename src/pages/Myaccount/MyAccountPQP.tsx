import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // For the back arrow
import { MdDownload } from 'react-icons/md'; // For the PDF icons

// --- Data Structures ---

interface Paper {
  title: string;
  heldOn: string;
  questions: number;
  pages: number;
  languages: string;
}

interface YearGroup {
  year: number;
  papers: Paper[];
}

const pqpData: YearGroup[] = [
  {
    year: 2023,
    papers: [
      {
        title: 'RPF Constable (2023) Official Paper',
        heldOn: '03 Feb, 2019 Shift 2', // Keeping heldOn value as shown in the screenshot
        questions: 120,
        pages: 5,
        languages: 'Telugu, English, Hindi, Tamil',
      },
    ],
  },
  {
    year: 2022,
    papers: [
      {
        title: 'RPF Constable (2023) Official Paper',
        heldOn: '03 Feb, 2019 Shift 2',
        questions: 120,
        pages: 5,
        languages: 'Telugu, English, Hindi, Tamil',
      },
    ],
  },
  {
    year: 2021,
    papers: [
      {
        title: 'RPF Constable (2023) Official Paper',
        heldOn: '03 Feb, 2019 Shift 2',
        questions: 120,
        pages: 5,
        languages: 'Telugu, English, Hindi, Tamil',
      },
    ],
  },
];

// --- Sub-Component: Paper Card ---

const PaperCard: React.FC<{ paper: Paper }> = ({ paper }) => {
  const handleViewPDF = () => {
    console.log(`Viewing PDF for: ${paper.title}`);
    // Logic to open PDF or link
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-semibold text-gray-800">
            {paper.title}
          </h4>
          <p className="text-xs text-gray-600 font-medium">
            (Held On: {paper.heldOn})
          </p>
        </div>
        <button
          onClick={handleViewPDF}
          className="flex items-center bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-semibold py-1.5 px-3 rounded-md transition duration-150 whitespace-nowrap"
        >
          View PDF
        </button>
      </div>

      <div className="mt-3 text-xs text-gray-500 space-y-0.5">
        <p>
          <span className="font-medium text-gray-700">{paper.questions} Questions</span> | <span className="font-medium text-gray-700">{paper.pages} Pages</span>
        </p>
        <p>
          Available in : <span className="font-medium text-gray-700">{paper.languages}</span>
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---

const MyAccountPQP: React.FC = () => {
  const handleGoBack = () => {
    console.log("Navigating back...");
    // navigate(-1) if using react-router-dom
  };

  const handleDownload = () => {
    console.log("Download Previous Year Papers clicked.");
  };

  const handleSSCPQP = () => {
    console.log("SSC PQP dropdown clicked.");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header with Back Arrow and Title */}
      <div className="flex items-center p-4 bg-white border-b sticky top-0 z-10 shadow-sm">
        <button onClick={handleGoBack} className="text-gray-700 hover:text-teal-600 transition mr-3">
          <FaArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">PQP</h1>
      </div>

      <div className="p-4">
        {/* Navigation Buttons */}
        <div className="flex space-x-2 mb-8">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2 rounded-lg shadow-md transition duration-150 text-sm"
          >
            <MdDownload size={20} /> Download Previous Year Papers
          </button>
          
          <button
            onClick={handleSSCPQP}
            className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-150 text-sm"
          >
            SSC PQP 
            <span className="material-symbols-outlined text-base">expand_more</span>
          </button>
        </div>

        {/* Papers List Grouped by Year */}
        <div className="space-y-6">
          {pqpData.map((group) => (
            <div key={group.year}>
              <h2 className="text-xl font-bold text-gray-800 mb-3">{group.year}</h2>
              {group.papers.map((paper, index) => (
                <PaperCard key={index} paper={paper} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAccountPQP;