import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface FilterProps {
  selectedState: string;
  selectedQualification: string;
  setSelectedState: (state: string) => void;
  setSelectedQualification: (qual: string) => void;
}

const StateGovtJobsHeader: React.FC<FilterProps> = ({
  selectedState,
  selectedQualification,
  setSelectedState,
  setSelectedQualification,
}) => {
  const states = ["All", "Andhra Pradesh", "Odisha", "Bihar", "Maharashtra"];
  const qualifications = ["All", "B.Sc (Nursing)", "B.Ed", "B.Tech", "MBA"];

  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showQualificationDropdown, setShowQualificationDropdown] =
    useState(false);

  return (
    <div className="w-full rounded-xl max-w-6xl mx-auto flex flex-wrap justify-between items-center bg-white py-4 px-6 relative">
      {/* Title */}
      <h2 className="text-2xl font-bold text-[#001F5C] underline underline-offset-4">
        Jobs List
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mt-3 md:mt-0 relative">
        {/* All Button */}
        <button
          onClick={() => {
            setSelectedState("All");
            setSelectedQualification("All");
          }}
          className="bg-gray-200 text-[#001F5C] font-semibold px-5 py-2 rounded-full hover:bg-gray-300 transition"
        >
          All
        </button>

        {/* State Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowStateDropdown(!showStateDropdown)}
            className="bg-gray-200 text-[#001F5C] font-semibold px-5 py-2 rounded-full flex items-center gap-2 hover:bg-gray-300 transition"
          >
            {selectedState} <FaChevronDown size={14} />
          </button>
          {showStateDropdown && (
            <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 animate-fade-in">
              {states.map((state) => (
                <div
                  key={state}
                  onClick={() => {
                    setSelectedState(state);
                    setShowStateDropdown(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {state}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Qualification Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowQualificationDropdown(!showQualificationDropdown)}
            className="bg-gray-200 text-[#001F5C] font-semibold px-5 py-2 rounded-full flex items-center gap-2 hover:bg-gray-300 transition"
          >
            {selectedQualification} <FaChevronDown size={14} />
          </button>
          {showQualificationDropdown && (
            <div className="absolute mt-2 w-56 bg-white border rounded-lg shadow-lg z-10 animate-fade-in">
              {qualifications.map((qual) => (
                <div
                  key={qual}
                  onClick={() => {
                    setSelectedQualification(qual);
                    setShowQualificationDropdown(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {qual}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StateGovtJobsHeader;
