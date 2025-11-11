import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaDownload,
  FaHome,
  FaBell,
  FaRocket,
  FaCalendarAlt,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { DownloadAdminCard, GetuserDataOtr } from "../services/apiHelpers";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const HomeNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userdata, setUserData] = useState([]);
  const candidateId = useSelector((state: RootState) => state.user.candidateId);
  const otrCondidateId = useSelector((state: RootState) => state.otr.otrCondidateId);
  const otrId = localStorage.getItem("otrNumber");
  console.log(otrId)

 useEffect(() => {
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const success = await GetuserDataOtr(candidateId);
      if (success) {
        setUserData(success?.data)
        console.log(success?.data)
        // if(success?.data[0].otrasId){
        //   localStorage.setItem("otrNumber", success?.data[0].otrasId);
        // }
      } 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (candidateId) {
    fetchUserData();
  }
}, [candidateId]);


  const isActive = (path: string) => location.pathname === path;

const handleAdmitCardDownload = async () => {
  if (!otrId) {
    toast.warn("❌ No OTR ID found. Please log in or register first.");
    return;
  }

  try {
    setLoading(true);
    const response = await DownloadAdminCard(otrCondidateId);

    if (response.status === 200 && response.data) {
      navigate("/home-notifications", { state: { data: response.data } });
      toast.success("✅ Admit Card fetched successfully!");
    } else {
      toast.error("❌ Failed to download Admit Card.");
    }
  } catch (error) {
    console.error(error);
    toast.error("❌ Something went wrong while downloading.");
  } finally {
    setLoading(false);
  }
};


  return (
    <nav className="w-full bg-gradient-to-r from-[#002366] to-[#00b8d9] shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 md:py-4">
        {/* LEFT — Logo + Admit Card */}
        <div className="flex items-center gap-3">
          <div
            className="text-white text-xl font-bold cursor-pointer tracking-wide"
            onClick={() => navigate("/")}
          >
            LOGO
          </div>

          <button
            onClick={handleAdmitCardDownload}
            disabled={loading}
            className={`hidden sm:flex items-center gap-2 ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-teal-300 hover:bg-teal-400"
            } text-black font-semibold px-4 py-1.5 rounded-md transition duration-200`}
          >
            <FaDownload className="text-black" />
            {loading ? "Downloading..." : "Admit Card"}
          </button>
        </div>

        {/* RIGHT — Menu Toggle (Mobile) */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* RIGHT — Menu Links */}
        <div
          className={`${
            menuOpen
              ? "top-16 opacity-100 visible"
              : "-top-96 opacity-0 invisible"
          } absolute md:static left-0 w-full md:w-auto bg-[#002366] md:bg-transparent flex flex-col md:flex-row md:items-center gap-6 text-white font-medium transition-all duration-300 ease-in-out md:opacity-100 md:visible md:top-auto`}
        >
          <a
            href="/home"
            className={`flex items-center gap-2 px-6 md:px-0 py-3 md:py-0 border-b md:border-none transition ${
              isActive("/home")
                ? "text-yellow-300 border-b-2 border-yellow-300"
                : "hover:text-yellow-300"
            }`}
          >
            <FaHome size={18} />
            <span>Home</span>
          </a>

          <a
            href="/home-notifications"
            className={`flex items-center gap-2 px-6 md:px-0 py-3 md:py-0 border-b md:border-none transition ${
              isActive("/home-notifications")
                ? "text-yellow-300 border-b-2 border-yellow-300"
                : "hover:text-yellow-300"
            }`}
          >
            <FaBell size={18} />
            <span>Notifications</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-2 px-6 md:px-0 py-3 md:py-0 hover:text-yellow-300 transition"
          >
            <FaRocket size={18} />
            <span>Tracking</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-2 px-6 md:px-0 py-3 md:py-0 hover:text-yellow-300 transition"
          >
            <FaCalendarAlt size={18} />
            <span>Upcoming Jobs</span>
          </a>

          {/* OTR Button */}
          <button
            onClick={() => navigate("/otr")}
            className="mx-6 md:mx-0 my-3 md:my-0 bg-gradient-to-r from-yellow-200 to-yellow-300 px-6 py-1.5 rounded-full font-bold text-[#0a0a23] hover:opacity-90 transition duration-200"
          >
            {otrId ? otrId :'Creat OTR'}
          </button>

          {/* Profile */}
          <FaUserCircle
            size={28}
            onClick={() => navigate("/Myaccount/Wallet")}
            className="cursor-pointer mx-6 md:mx-0 mb-3 md:mb-0 hover:text-yellow-300 transition"
            title="Profile"
          />
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
