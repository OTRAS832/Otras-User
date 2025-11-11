import React, { useEffect, useState } from "react";

interface Application {
  id: number;
  department: string;
  position: string;
  posts: string;
  currentStep: number; // Which step the application is at (0 to 3)
}

const ApplicationStatus: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeApp, setActiveApp] = useState<number | null>(null);

  // ✅ Simulate fetching API data
  useEffect(() => {
    setTimeout(() => {
      const dummyData: Application[] = [
        {
          id: 1,
          department: "Medical & Health Department",
          position: "Arogya Mitras & Team Leaders",
          posts: "19 POSTS",
          currentStep: 2,
        },
        {
          id: 2,
          department: "Staff Selection Commission",
          position: "SSC CGL",
          posts: "2500 POSTS",
          currentStep: 1,
        },
        {
          id: 3,
          department: "Railway Recruitment Board",
          position: "RRB Assistant Loco Pilot",
          posts: "4500 POSTS",
          currentStep: 3,
        },
      ];
      setApplications(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const steps = [
    "Application Success",
    "Admit Card Release",
    "Exam Key / Cutoff",
    "Results",
  ];

  const handleStatusClick = (id: number) => {
    setActiveApp(activeApp === id ? null : id);
  };

  return (
    <section className="bg-gray-100 min-h-screen py-10 px-4 md:px-16">
      {/* ✅ Header */}
      <div className="w-full bg-[#001F5C] text-white py-4 rounded-t-xl text-center shadow-md">
        <h1 className="text-2xl font-semibold">Application Status</h1>
      </div>

      <div className="bg-white rounded-b-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Application History
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading applications...</p>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
              >
                {/* ✅ Application Card Header */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#001F5C]">
                      {app.department}
                    </h3>
                    <p className="text-gray-600">
                      {app.position} –{" "}
                      <span className="font-semibold">{app.posts}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleStatusClick(app.id)}
                    className="bg-[#001F5C] text-white px-4 py-1.5 rounded-md hover:bg-[#0038A8] transition text-sm font-medium"
                  >
                    {activeApp === app.id ? "Hide Status" : "Status"}
                  </button>
                </div>

                {/* ✅ Progress Bar Section */}
                {activeApp === app.id && (
                  <div className="mt-6">
                    {/* Step Labels */}
                    <div className="flex justify-between mb-2">
                      {steps.map((step, index) => (
                        <span
                          key={index}
                          className={`text-xs font-medium ${
                            index <= app.currentStep
                              ? "text-green-700"
                              : "text-gray-500"
                          }`}
                        >
                          {step}
                        </span>
                      ))}
                    </div>

                    {/* Tailwind Progress Bar */}
                    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-700"
                        style={{
                          width: `${(app.currentStep / (steps.length - 1)) * 100}%`,
                        }}
                      ></div>
                    </div>

                    {/* Step Indicators (Circles) */}
                    <div className="flex justify-between mt-2">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
                            index <= app.currentStep
                              ? "bg-green-500 border-green-500 text-white"
                              : "bg-white border-gray-400 text-gray-500"
                          }`}
                        >
                          {index <= app.currentStep ? "✓" : "✕"}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationStatus;
