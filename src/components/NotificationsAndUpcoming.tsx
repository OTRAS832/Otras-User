import React, { useState } from "react";
import NotificationCard from "./NotificationCard";
import { useNavigate } from "react-router-dom";

const NotificationsAndUpcoming: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Normal Notifications
  const notifications = Array.from({ length: 8 }, (_, i) => ({
    category:
      i < 3
        ? "SSC Notifications"
        : i < 6
        ? "UPSC Notifications"
        : "Bank Notifications",
    date: `May ${20 + i}, 2024`,
    description:
      "SSA/ UDC Grade Limited Departmental Competitive Examination, 2023 & 2024: Uploading of Tentative Answer Key(s) along with Candidates' Response Sheet(s).",
  }));

  // ✅ Upcoming Notifications
  const upcoming = [
    {
      category: "SSC",
      date: "September 20th, 2024",
      description:
        "Uploading of SSC CGL Tier 2 Admit Card and detailed exam schedule for 2024 session.",
    },
    {
      category: "UPSC",
      date: "November 28th, 2024",
      description:
        "UPSC Civil Services Main Examination 2024: Tentative Answer Keys and Result Release Notice.",
    },
    {
      category: "Bank",
      date: "November 28th, 2024",
      description:
        "IBPS PO 2024: Preliminary result announcement and Main exam schedule details.",
    },
  ];

  // ✅ Pagination
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = notifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-10 mb-10">
      {/* 🔔 Notifications Section */}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#002366] to-[#00b8d9] px-6 py-4">
        <h2 className="text-white text-lg font-semibold flex items-center gap-2">
          🔔 Notifications
        </h2>
        <button
          onClick={() => navigate("/notifications")}
          className="text-white text-sm hover:underline"
        >
          View All
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-4 px-2 py-4">
        {paginatedData.map((note, index) => (
          <NotificationCard
            key={index}
            category={note.category}
            date={note.date}
            description={note.description}
            onView={() => alert(`Viewing ${note.category}`)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center rounded-b-2xl items-center gap-2 p-4 border-t border-gray-200">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed text-gray-400"
              : "text-[#001F5C] hover:bg-gray-100"
          }`}
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-8 h-8 rounded font-medium ${
              currentPage === index + 1
                ? "bg-[#001F5C] text-white"
                : "text-[#001F5C] hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed text-gray-400"
              : "text-[#001F5C] hover:bg-gray-100"
          }`}
        >
          &gt;
        </button>
      </div>

      {/* ✨ Separator between two sections */}
      <div className="h-10 bg-gray-100 w-full"></div>

      {/* 📅 Upcoming Notifications Section */}
      <div className="flex justify-between items-center rounded-t-3xl bg-gradient-to-r from-[#002366] to-[#00b8d9] px-6 py-4">
        <h2 className="text-white text-lg font-semibold underline underline-offset-4">
          Upcoming Notifications
        </h2>
        <button
          onClick={() => navigate("/upcoming-notifications")}
          className="text-white text-sm hover:underline"
        >
          View All
        </button>
      </div>

      {/* Upcoming Cards with Gap */}
      <div className="space-y-4 px-2 py-4">
        {upcoming.map((note, index) => (
          <NotificationCard
            key={index}
            category={note.category}
            date={note.date}
            description={note.description}
            onView={() =>
              alert(`Viewing ${note.category} Upcoming Notification`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsAndUpcoming;
