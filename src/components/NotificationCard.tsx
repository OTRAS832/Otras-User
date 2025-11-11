import React from "react";

export interface NotificationCardProps {
  category: string;
  date: string;
  status?: string;
  description: string;
  onView: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  category,
  date,
  status = "New",
  description,
  onView,
}) => {
  return (
    <div className="w-full bg-white border-b border-gray-200 py-6 px-6">
      {/* Category Title */}
      <h3 className="text-lg font-semibold text-[#001F5C] underline underline-offset-4 mb-4">
        {category}
      </h3>

      {/* Main Row Section */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        {/* Left Section - Date + New Badge */}
        <div className="flex flex-col items-start w-full sm:w-[20%]">
          <span className="text-[#001F5C] font-medium text-sm mb-2">
            {date}
          </span>
          <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-0.5 rounded-full w-fit">
            {status}
          </span>
        </div>

        {/* Middle Section - Description */}
        <div className="w-full sm:w-[65%] text-gray-600 text-sm leading-relaxed">
          {description}
        </div>

        {/* Right Section - View Button */}
        <div className="w-full sm:w-[10%] flex sm:justify-end">
          <button
            onClick={onView}
            className="bg-[#001F5C] text-white text-sm font-semibold px-6 py-2 rounded-md hover:bg-[#003399] transition duration-200"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
