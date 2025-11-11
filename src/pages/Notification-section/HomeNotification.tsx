// import React, { useState } from "react";
// import { Bell, Download } from "lucide-react";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { generateAdmitCardPDF } from "../../Utils/generateAdmitCardPDF";


// const NotificationSection: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("Admit Card Release");
//   const location = useLocation();

//   // ✅ Real API Data
//   const AdminCard = location.state?.data || [];

//   console.log("📩 Received Admit Card Data:", AdminCard);

//   // ✅ PDF Download Handler
//   const handleDownloadPDF = async (card: any) => {
//     try {
//       await generateAdmitCardPDF(card);
//       toast.success(`✅ Admit Card for ${card.candidateName} downloaded!`);
//     } catch (error) {
//       console.error("❌ PDF generation failed:", error);
//       toast.error("❌ Failed to generate Admit Card PDF!");
//     }
//   };

//   // ✅ Header titles
//   const headerTitleMap: Record<string, string> = {
//     "Applied History": "All Notifications",
//     "Admit Card Release": "Admit Card Released List",
//     Results: "Result",
//   };
//   const headerTitle = headerTitleMap[activeTab] || "Notifications";

//   return (
//     <section className="px-3 md:px-16 py-5 bg-white min-h-screen">
//       {/* ✅ Header */}
//       <div className="w-full bg-[#0B0B79] flex justify-center items-center py-4 mb-4 rounded-3xl shadow-md">
//         <div className="flex items-center gap-3 text-white">
//           <Bell size={24} />
//           <h2 className="text-2xl font-semibold underline underline-offset-4">
//             {headerTitle}
//           </h2>
//         </div>
//       </div>

//       {/* ✅ Tabs */}
//       <div className="flex gap-4 mb-8 flex-wrap justify-center">
//         {["Applied History", "Admit Card Release", "Results"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-6 py-2 rounded-md border text-sm font-semibold transition ${
//               activeTab === tab
//                 ? "bg-[#001F5C] text-white border-[#001F5C]"
//                 : "bg-white border-gray-400 text-[#001F5C] hover:bg-gray-100"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* ✅ Admit Card Section */}
//       {activeTab === "Admit Card Release" ? (
//         <div className="space-y-6">
//           {AdminCard.length > 0 ? (
//             AdminCard.map((card: any, index: number) => (
//               <div
//                 key={index}
//                 className="flex flex-col md:flex-row justify-between items-center border border-gray-300 rounded-2xl p-5 shadow-sm bg-gray-50 hover:shadow-md transition"
//               >
//                 <div className="w-full md:w-2/3">
//                   <h3 className="text-lg md:text-xl font-semibold text-[#001F5C] mb-2">
//                     {card.candidateName || "Candidate"}
//                   </h3>

//                   <div className="text-sm text-gray-700 space-y-1">
//                     <p>
//                       <span className="font-semibold">Exam Roll No:</span>{" "}
//                       {card.examRollNo}
//                     </p>
//                     <p>
//                       <span className="font-semibold">Father’s Name:</span>{" "}
//                       {card.fatherName}
//                     </p>
//                     <p>
//                       <span className="font-semibold">Gender:</span>{" "}
//                       {card.gender === "M" ? "Male" : "Female"}
//                     </p>
//                     <p>
//                       <span className="font-semibold">Date of Birth:</span>{" "}
//                       {card.dateOfBirth}
//                     </p>
//                     <p>
//                       <span className="font-semibold">Exam Center:</span>{" "}
//                       {card.examCenter}
//                     </p>
//                     <p>
//                       <span className="font-semibold">College Name:</span>{" "}
//                       {card.collegeName}
//                     </p>
//                     <p>
//                       <span className="font-semibold">University:</span>{" "}
//                       {card.universityName}
//                     </p>
//                     <p>
//                       <span className="font-semibold">Job Post:</span>{" "}
//                       {card.jobPostName}
//                     </p>
//                     <p>
//                       <span className="font-semibold">Vacancy:</span>{" "}
//                       {card.vacancyName}
//                     </p>
//                     <p>
//                       <span className="font-semibold">OTR ID:</span>{" "}
//                       {card.otrasId}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="hidden md:block h-12 w-[2px] bg-gray-300 mx-4"></div>

//                 {/* ✅ Download Button */}
//                 <div className="w-full md:w-auto mt-4 md:mt-0">
//                   <button
//                     onClick={() => handleDownloadPDF(card)}
//                     className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#001F5C] to-[#0038A8] text-white px-6 py-2 rounded-md font-medium shadow hover:opacity-90 transition w-full md:w-auto"
//                   >
//                     <Download size={18} /> Download Admit Card
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 py-10">
//               No Admit Cards found for this candidate.
//             </p>
//           )}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-10">
//           Select “Admit Card Release” to view admit card details.
//         </p>
//       )}

//        {/* ✅ Result Section */}
//     </section>
//   );
// };

// export default NotificationSection;

import React, { useState, useEffect } from "react";
import { Bell, Download } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { generateAdmitCardPDF } from "../../Utils/generateAdmitCardPDF";
import { GetResults } from "../../services/apiHelpers";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const NotificationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Admit Card Release");
  const [resultData, setResultData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
const navigate = useNavigate();
    const candidateId = useSelector((state: RootState) => state.user.candidateId);

  // ✅ Real Admit Card data
  const AdminCard = location.state?.data || [];
  console.log(AdminCard?.examRollNo)

  // ✅ Download PDF
  const handleDownloadPDF = async (card: any) => {
    try {
      await generateAdmitCardPDF(card);
      toast.success(`✅ Admit Card for ${card.candidateName} downloaded!`);
    } catch (error) {
      console.error("❌ PDF generation failed:", error);
      toast.error("❌ Failed to generate Admit Card PDF!");
    }
  };

  // ✅ Header titles
  const headerTitleMap: Record<string, string> = {
    "Applied History": "All Notifications",
    "Admit Card Release": "Admit Card Released List",
    Results: "Result",
  };
  const headerTitle = headerTitleMap[activeTab] || "Notifications";

  // ✅ Fetch results when Results tab is opened
  useEffect(() => {
    if (activeTab === "Results") {
      fetchResults();
    }
  }, [activeTab]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      // Replace with your actual backend API endpoint
      const response = await GetResults(candidateId)
      if (response.data) {
        setResultData(Array.isArray(response.data) ? response.data : [response.data]);
      }
    } catch (error) {
      console.error("❌ Failed to fetch results:", error);
      toast.error("⚠️ Failed to load results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-3 md:px-16 py-5 bg-white min-h-screen">
      {/* ✅ Header */}
      <div className="w-full bg-[#0B0B79] flex justify-center items-center py-4 mb-4 rounded-3xl shadow-md">
        <div className="flex items-center gap-3 text-white">
          <Bell size={24} />
          <h2 className="text-2xl font-semibold underline underline-offset-4">
            {headerTitle}
          </h2>
        </div>
      </div>

      {/* ✅ Tabs */}
      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        {["Applied History", "Admit Card Release", "Results"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-md border text-sm font-semibold transition ${
              activeTab === tab
                ? "bg-[#001F5C] text-white border-[#001F5C]"
                : "bg-white border-gray-400 text-[#001F5C] hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ✅ Admit Card Section */}
      {activeTab === "Admit Card Release" && (
        <div className="space-y-6">
          {AdminCard.length > 0 ? (
            AdminCard.map((card: any, index: number) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between items-center border border-gray-300 rounded-2xl p-5 shadow-sm bg-gray-50 hover:shadow-md transition"
              >
                <div className="w-full md:w-2/3">
                  <h3 className="text-lg md:text-xl font-semibold text-[#001F5C] mb-2">
                    {card.candidateName || "Candidate"}
                  </h3>

                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-semibold">Exam Roll No:</span>{" "}
                      {card.examRollNo}
                    </p>
                    <p>
                      <span className="font-semibold">Father’s Name:</span>{" "}
                      {card.fatherName}
                    </p>
                    <p>
                      <span className="font-semibold">Gender:</span>{" "}
                      {card.gender === "M" ? "Male" : "Female"}
                    </p>
                    <p>
                      <span className="font-semibold">Date of Birth:</span>{" "}
                      {card.dateOfBirth}
                    </p>
                    <p>
                      <span className="font-semibold">Exam Center:</span>{" "}
                      {card.examCenter}
                    </p>
                    <p>
                      <span className="font-semibold">College Name:</span>{" "}
                      {card.collegeName}
                    </p>
                    <p>
                      <span className="font-semibold">University:</span>{" "}
                      {card.universityName}
                    </p>
                    <p>
                      <span className="font-semibold">Job Post:</span>{" "}
                      {card.jobPostName}
                    </p>
                    <p>
                      <span className="font-semibold">Vacancy:</span>{" "}
                      {card.vacancyName}
                    </p>
                    <p>
                      <span className="font-semibold">OTR ID:</span>{" "}
                      {card.otrasId}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block h-12 w-[2px] bg-gray-300 mx-4"></div>

                {/* ✅ Download Button */}
                <div className="w-full md:w-auto mt-4 md:mt-0">
                  <button
                    onClick={() => handleDownloadPDF(card)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#001F5C] to-[#0038A8] text-white px-6 py-2 rounded-md font-medium shadow hover:opacity-90 transition w-full md:w-auto"
                  >
                    <Download size={18} /> Download Admit Card
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">
              No Admit Cards found for this candidate.
            </p>
          )}
        </div>
      )}

      {/* ✅ Result Section */}
      {activeTab === "Results" && (
        <div className="mt-8">
          {loading ? (
            <p className="text-center text-gray-500">Loading results...</p>
          ) : resultData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-[#0B0B79] text-white">
                  <tr>
                    <th className="px-4 py-3 border">S.No</th>
                    <th className="px-4 py-3 border">Candidate Name</th>
                    <th className="px-4 py-3 border">Exam Roll No</th>
                    <th className="px-4 py-3 border">Status</th>
                  </tr>
                </thead>
                <tbody className="text-center text-gray-700 bg-white">
                  {resultData.map((res: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-3 py-2">{index + 1}</td>
                      <td className="border px-3 py-2">{res.candidateName}</td>
                      <td className="border px-3 py-2">{res.examRollNo}</td>
                    <td
                        className="border px-3 py-2 text-green-600 font-semibold cursor-pointer hover:text-blue-700"
                        onClick={() => navigate("/student-results", { state: { data: resultData } })}
                      >
                        {res.status || "View Result"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              No results available.
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default NotificationSection;

