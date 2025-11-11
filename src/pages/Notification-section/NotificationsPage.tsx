import React from "react";
import { useNavigate } from "react-router-dom";
import NotificationCard from "../../components/NotificationCard";

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  const notifications = Array.from({ length: 15 }, (_, i) => ({
    category: `Notification ${i + 1}`,
    date: `May ${20 + i}, 2024`,
    description: `This is full list view for notification ${i + 1}. It includes complete information for the user.`,
  }));

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-start ">
      {/* Full-width, full-height container */}
      <div className="w-full max-w-7xl bg-white rounded-t-3xl shadow-md flex flex-col h-screen overflow-hidden">
        {/* Fixed Header */}
        <div className="flex justify-between rounded-t-3xl items-center bg-gradient-to-r from-[#002366] to-[#00b8d9] px-8 py-5 sticky top-0 z-10 shadow-sm">
          <h2 className="text-white text-xl font-semibold flex items-center gap-2">
            🔔 All Notifications
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
          {notifications.map((note, index) => (
            <NotificationCard
              key={index}
              category={note.category}
              date={note.date}
              description={note.description}
              onView={() => alert(`Viewing ${note.category}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
