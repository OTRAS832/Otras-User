import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// Replacing react-icons/fa imports with lucide-react icons
import { Heart, Trash2, CheckCircle, ArrowLeft } from 'lucide-react';

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

// Initial job data used for state initialization
const initialSavedJobsData: Job[] = [
    {
        id: 1,
        university: 'Osmania University',
        testTitle: 'Telangana State Eligibility Test 2024',
        description: 'Government of Telangana has given an employment notification for Telangana State Eligibility Test, covering various subjects across the state. This is a key opportunity for candidates seeking academic positions in Telangana.',
        qualification: 'Candidates should possess Master Degree (i.e. M.A, M.Sc, M.Com, MBA, MUNG, M.Phil, MPED, MCU, LIM, MCA and M.Tech (CSE & IT only)).',
        postDate: '08-05-2024',
        lastDate: '02-07-2024',
        postedDaysAgo: 12,
    },
    {
        id: 2,
        university: 'Karnataka Public Service Commission (KPSC)',
        testTitle: 'Group C (RPC) 2024-313 POSTS',
        description: 'Karnataka Public Service Commission (KPSC) has given a notification for the recruitment of Group C positions across multiple departments. Check official site for detailed eligibility criteria and application procedure.',
        qualification: 'Diploma (Civil Engg.), Diploma (Mechanical Engg), Diploma (Library Science)',
        postDate: '19-03-2024',
        lastDate: '28-08-2024',
        postedDaysAgo: 12,
    },
    {
        id: 3,
        university: 'HP Board of School Education (HP BOSE)',
        testTitle: 'HP TET June 2024',
        description: 'HP Board of School Education (HP BOSE) has published a notification for conducting the HP Teacher Eligibility Test (TET) for various TGT posts. Ensure all documents are ready before the final submission date.',
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
        <div className="bg-white p-4 mb-6 rounded-xl shadow-xl border border-gray-100 transition duration-300 hover:shadow-2xl">

            {/* Header and Heart Icon */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800">{job.university}</h3>
                {/* The heart icon typically remains solid for saved jobs, but clicking it should unsave */}
                <button
                    onClick={() => onDelete(job.id)}
                    aria-label="Remove from Saved Jobs"
                    className="text-pink-500 hover:text-pink-600 transition duration-150 p-2 rounded-full hover:bg-pink-50"
                >
                    <Heart className="w-5 h-5 fill-pink-500" /> {/* Updated Icon */}
                </button>
            </div>

            {/* Test Title / Highlight */}
            <div className="bg-teal-50 text-center py-2 px-3 rounded-lg mb-4 border border-teal-200">
                <span className="text-base font-semibold text-teal-800">
                    {job.testTitle}
                </span>
            </div>

            {/* Job Details */}
            <div className="text-sm space-y-2">
                <p className="font-semibold text-gray-700">Job Description:</p>
                <p className="text-gray-600 line-clamp-3 leading-relaxed">{job.description}</p>

                <p className="font-semibold text-gray-700 pt-2">Qualification:</p>
                <p className="text-gray-600 line-clamp-2">{job.qualification}</p>
            </div>

            {/* Date and Days Ago */}
            <div className="flex justify-between text-[12px] text-gray-500 mt-4 border-t border-dashed pt-3">
                <div>
                    <span className="font-medium text-gray-700">Post Date:</span> {job.postDate}
                </div>
                <div className="text-center bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">
                    <span className="text-red-600">{`Posted ${job.postedDaysAgo} days ago`}</span>
                </div>
                <div>
                    <span className="font-medium text-gray-700">Last Date:</span> {job.lastDate}
                </div>

            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
                <button
                    onClick={() => onDelete(job.id)}
                    className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-200 transform hover:scale-[1.02]"
                >
                    <Trash2 size={16} /> Delete {/* Updated Icon */}
                </button>
                <button
                    onClick={() => onApply(job.id)}
                    className="flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-200 transform hover:scale-[1.02]"
                >
                    <CheckCircle size={16} /> Apply {/* Updated Icon */}
                </button>
            </div>
        </div>
    );
};


// --- Main Component: SavedJobs ---

const Jobs: React.FC = () => {
    // State to manage the list of saved jobs
    const [jobs, setJobs] = useState<Job[]>(initialSavedJobsData);
    const navigate = useNavigate();

    // Function to handle navigating back using React Router's history
    const handleGoBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    // Function to handle job deletion, updating the local state
    const handleDelete = useCallback((id: number) => {
        console.log(`Deleting job with ID: ${id}`);
        // Filter out the job with the given ID and update state
        setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    }, []);

    // Function to handle the apply action (placeholder for actual navigation)
    const handleApply = useCallback((id: number) => {
        console.log(`Applying for job with ID: ${id}. Redirecting to application page...`);
        // In a real app, this would redirect to /apply/:id
    }, []);

    return (
        <div className="p-4 md:p-8 bg-white min-h-[calc(100vh-64px)] rounded-xl shadow-lg">

            {/* Header with Back Arrow */}
            <div className="flex items-center mb-8 border-b pb-4">
                <button
                    onClick={handleGoBack}
                    className="text-teal-700 hover:text-teal-900 transition mr-4 p-2 rounded-full hover:bg-gray-100"
                    aria-label="Go back"
                >
                    <ArrowLeft size={20} /> {/* Updated Icon */}
                </button>
                <h1 className="text-3xl font-extrabold text-gray-800">Your Saved Jobs ({jobs.length})</h1>
            </div>

            {/* List of Job Cards */}
            <div className="space-y-6">
                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        onDelete={handleDelete}
                        onApply={handleApply}
                    />
                ))}
            </div>

            {/* Message when no jobs are saved */}
            {jobs.length === 0 && (
                <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 mt-10">
                    <Heart size={40} className="mx-auto mb-4 text-gray-400 fill-gray-400" /> {/* Updated Icon */}
                    <p className="text-xl font-medium text-gray-600">No Jobs Saved</p>
                    <p className="text-gray-500 mt-2">Start exploring the job section and hit the heart icon to save jobs for later!</p>
                </div>
            )}
        </div>
    );
};

export default Jobs;