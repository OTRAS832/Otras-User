import React, { useState } from "react";
import { FaShareAlt, FaHeart, FaDownload } from "react-icons/fa";
import JobViewModal from "./JobViewModal";

interface JobCardProps {
  id: number;
  jobTitle: string;
  description: string;
  qualification: string;
  postDate: string;
  lastDate: string;
  jobCategory: string;
  uploadFile?: string; // PDF link
  additionalDetails?: string;
  importantDates?: string;
  ageLimit?: string;
  fee:number,
  vacancyDetails?: any[];
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  jobTitle,
  description,
  qualification,
  postDate,
  lastDate,
  jobCategory,
  uploadFile,
  additionalDetails,
  importantDates,
  ageLimit,
  vacancyDetails,
  fee,
}) => {
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    if (!uploadFile) {
      alert("No notification file available.");
      return;
    }
    const link = document.createElement("a");
    link.href = uploadFile;
    link.download = jobTitle + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <h3 className="text-lg font-bold text-gray-900 underline underline-offset-2 mb-2">
          {jobCategory}
        </h3>

        <p className="text-blue-700 font-semibold mb-3">{jobTitle}</p>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">{description}</p>

        <p className="text-sm text-gray-800 mb-1">
          <strong>Qualification:</strong> {qualification}
        </p>
        <p className="text-sm text-gray-800 mb-1">
          <strong>Post Date:</strong> {postDate}
        </p>
        <p className="text-sm text-gray-800 mb-3">
          <strong>Last Date:</strong> {lastDate}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex gap-3 text-gray-600">
            <FaShareAlt className="cursor-pointer hover:text-blue-600" />
            <FaHeart className="cursor-pointer hover:text-pink-500" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="bg-pink-500 text-white text-sm px-4 py-2 rounded-md flex items-center gap-1 hover:bg-pink-600"
            >
              <FaDownload /> Notification
            </button>

            <button
              onClick={() => setOpen(true)}
              className="bg-[#001F5C] text-white text-sm px-4 py-2 rounded-md hover:bg-[#003399]"
            >
              View More
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Modal for job details */}
      {open && (
        <JobViewModal
          open={open}
          onClose={() => setOpen(false)}
          job={{
            id,
            jobTitle,
            jobCategory,
            description,
            qualification,
            postDate,
            lastDate,
            uploadFile,
            additionalDetails,
            importantDates,
            ageLimit,
            vacancyDetails,
            fee,
          }}
        />
      )}
    </>
  );
};

export default JobCard;
