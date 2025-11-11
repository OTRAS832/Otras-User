import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationCard from "../../components/NotificationCard";

const UpcomingNotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Dummy upcoming notification data
  const upcomingNotifications = [
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
    {
      category: "Railway",
      date: "December 5th, 2024",
      description:
        "RRB NTPC 2024: Expected schedule for final merit list and document verification dates.",
    },
    {
      category: "State PSC",
      date: "December 20th, 2024",
      description:
        "Odisha PSC 2024: Notification for ASO and other technical recruitment exams.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-start">
      {/* Full-width container */}
      <div className="w-full max-w-7xl bg-white rounded-t-3xl shadow-md flex flex-col h-screen overflow-hidden">
        {/* Fixed Header */}
        <div className="flex justify-between rounded-t-3xl items-center bg-gradient-to-r from-[#002366] to-[#00b8d9] px-8 py-5 sticky top-0 z-10 shadow-sm">
          <h2 className="text-white text-xl font-semibold flex items-center gap-2">
            📅 Upcoming Notifications
          </h2>

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-300 text-[#001F5C] font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 transition duration-200"
          >
            ← Back to Home
          </button>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00b8d9] scrollbar-track-gray-100 px-2">
          {upcomingNotifications.map((note, index) => (
            <NotificationCard
              key={index}
              category={note.category}
              date={note.date}
              description={note.description}
              onView={() => alert(`Viewing ${note.category} Upcoming Notification`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingNotificationsPage;
