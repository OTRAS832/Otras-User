import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Settings from "./Settings";
import MyAccountPQP from "./MyAccountPQP";
import Refer from "./Refer";
import Support from "./Support";
import Wallet from "./Wallet";
import HomeNavbar from "../../components/HomeNavbar";
import Jobs from "./Jobs";
import OtrForm from "./OtrForm";

const ApplicationLayout: React.FC = () => {
  return (
    <>
      {/* 🔝 Top Navbar */}
      <HomeNavbar />

      {/* ⚙️ Main Layout */}
      <div className="flex pt-16 bg-gray-100 min-h-screen">
        {/* 📂 Sidebar Section */}
        <div className="w-[270px] fixed top-[72px] p-2 left-0 h-[calc(100vh-72px)] z-20">
          <Sidebar />
        </div>

        {/* 📄 Content Area */}
        <div className="flex-1 ml-[290px] bg-gray-50 p-6 rounded-tl-3xl transition-all">
          <main>
            <Routes>
              {/* ✅ Default route – Redirect to Wallet */}
<Route path="Myaccount/Wallet" element={<Navigate to="/" replace />} />

              {/* 🧾 Pages */}
              <Route path="Wallet" element={<Wallet />} />
              <Route path="otr-form" element={<OtrForm />} />
              <Route path="MyAccountPQP" element={<MyAccountPQP />} />
              <Route path="SavedJobs" element={<Jobs />} />
              <Route path="Refer" element={<Refer />} />
              <Route path="Support" element={<Support />} />
              <Route path="Settings" element={<Settings />} />

              {/* 🚫 404 Fallback */}
              <Route
                path="*"
                element={
                  <div className="text-center p-10 text-gray-500 text-lg font-medium">
                    404 – Page Not Found
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default ApplicationLayout;
