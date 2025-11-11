import React from 'react';
import { FaHeart, FaTrash, FaCheckCircle, FaArrowLeft } from 'react-icons/fa'; // Icons for the screen

// --- Data Structures ---
interface Job {
  id: number;
  university: string;
  testTitle: string;
  description: string;
  qualification: string;
  postDate: string;
  lastDate: string;
  postedDaysAgo: number;
}

const savedJobsData: Job[] = [
  {
    id: 1,
    university: 'Osmania University',
    testTitle: 'Telangana State Eligibility Test 2024',
    description: 'Government of Telangana has given an employment notification for Telangana State Eligibility Test...',
    qualification: 'Candidates should possess Master Degree (i.e. M.A, M.Sc, M.Com, MBA, MUNG, M.Phil, MPED, MCU, LIM, MCA and M.Tech (CSE & IT only)).',
    postDate: '08-05-2024',
    lastDate: '02-07-2024',
    postedDaysAgo: 12,
  },
  {
    id: 2,
    university: 'Karnataka Public Service Commission (KPSC)',
    testTitle: 'Group C (RPC) 2024-313 POSTS',
    description: 'Karnataka Public Service Commission (KPSC) has given a notification for the recruitment of Group C...',
    qualification: 'Diploma (Civil Engg.), Diploma (Mechanical Engg), Diploma (Library Science)',
    postDate: '19-03-2024',
    lastDate: '28-08-2024',
    postedDaysAgo: 12,
  },
  {
    id: 3,
    university: 'HP Board of School Education (HP BOSE)',
    testTitle: 'HP TET June 2024',
    description: 'HP Board of School Education (HP BOSE) has published a notification for conducting the HP Teacher Eligibility Test...',
    qualification: 'M.Sc (Botany), M.Sc (Zoology) & M.Sc (Micro Biology) [Relevant Subject].',
    postDate: '08-05-2024',
    lastDate: '18-06-2024',
    postedDaysAgo: 12,
  },
];

// --- Sub-Component: Job Card ---

interface JobCardProps {
  job: Job;
  onDelete: (id: number) => void;
  onApply: (id: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onDelete, onApply }) => {
  return (
    <div className="bg-white p-4 mb-6 rounded-lg shadow-xl border border-gray-100">
      
      {/* Header and Heart Icon */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{job.university}</h3>
        <FaHeart className="text-pink-500 cursor-pointer text-lg" />
      </div>

      {/* Test Title / Highlight */}
      <div className="bg-gray-200 text-center py-2 px-3 rounded-md mb-4">
        <span className="text-base font-semibold text-gray-700">
          {job.testTitle}
        </span>
      </div>

      {/* Job Details */}
      <div className="text-sm space-y-2">
        <p className="font-semibold text-gray-700">Job Description :</p>
        <p className="text-gray-600 line-clamp-3">{job.description}</p>
        
        <p className="font-semibold text-gray-700 pt-2">Qualification :</p>
        <p className="text-gray-600 line-clamp-2">{job.qualification}</p>
      </div>

      {/* Date and Days Ago */}
      <div className="flex justify-between text-[11px] text-gray-500 mt-4 border-t border-dashed pt-3">
        <div>
          <span className="font-medium">Post Date:</span> {job.postDate}
        </div>
        <div className="text-center">
          <span className="font-semibold text-red-500">{`Posted ${job.postedDaysAgo} days ago`}</span>
        </div>
        <div>
          <span className="font-medium">Last Date:</span> {job.lastDate}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={() => onDelete(job.id)}
          className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-200"
        >
          <FaTrash size={14} /> Delete
        </button>
        <button
          onClick={() => onApply(job.id)}
          className="flex items-center justify-center gap-2 bg-teal-800 hover:bg-teal-900 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-200"
        >
          <FaCheckCircle size={14} /> Apply
        </button>
      </div>
    </div>
  );
};


// --- Main Component: SavedJobs ---

const SavedJobs: React.FC = () => {
    // Note: In a real app, you would use useState to manage the jobs data
    // and implement the onDelete/onApply functions to update state or call an API.
    
    // We'll use a placeholder navigation function for the back arrow
    const handleGoBack = () => {
        console.log("Navigating back...");
        // Example if using react-router-dom: navigate(-1); 
    }

    const handleDelete = (id: number) => {
        console.log(`Deleting job with ID: ${id}`);
        // Logic to filter the jobs array and set new state
    }

    const handleApply = (id: number) => {
        console.log(`Applying for job with ID: ${id}`);
        // Logic to redirect the user to the application page
    }

    return (
        // The container here should match the general styles of the main content area 
        // in your MyAccount component (w-full p-2).
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            
            {/* Header with Back Arrow (matches the top left of the screenshot) */}
            <div className="flex items-center mb-6">
                <button onClick={handleGoBack} className="text-teal-800 hover:text-teal-900 transition mr-3">
                    <FaArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Saved Jobs</h1>
            </div>

            {/* List of Job Cards */}
            <div className="space-y-6">
                {savedJobsData.map((job) => (
                    <JobCard 
                        key={job.id} 
                        job={job} 
                        onDelete={handleDelete}
                        onApply={handleApply}
                    />
                ))}
            </div>

            {/* Placeholder for when no jobs are saved */}
            {savedJobsData.length === 0 && (
                <div className="text-center p-10 bg-white rounded-lg shadow-md mt-10">
                    <p className="text-gray-500">You haven't saved any jobs yet.</p>
                </div>
            )}
        </div>
    );
};

export default SavedJobs;