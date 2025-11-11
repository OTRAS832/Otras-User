import React from "react";
import { NavLink } from "react-router-dom";
import {
  Wallet,
  Heart,
  HelpCircle,
  Share2,
  ClipboardList,
  CreditCard,
  LogOut,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { icon: <Wallet size={20} />, label: "Wallet", path: "/Myaccount/Wallet" },
  { icon: <ClipboardList size={20} />, label: "OTR Form", path: "/Myaccount/otr-form" },
  { icon: <Heart size={20} />, label: "Saved Jobs", path: "/Myaccount/SavedJobs" },
  { icon: <CreditCard size={20} />, label: "PQP", path: "/Myaccount/MyAccountPQP" },
  { icon: <Share2 size={20} />, label: "Refer & Earn", path: "/Myaccount/Refer" },
  { icon: <HelpCircle size={20} />, label: "Help & Support", path: "/Myaccount/Support" },

];

const SidebarItem: React.FC<MenuItem> = ({ icon, label, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) => `
      flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer transition-all duration-300
      ${
        isActive
          ? "bg-white text-[#003366] font-semibold shadow-md"
          : "text-white hover:bg-white/10"
      }
    `}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm">{label}</span>
  </NavLink>
);

const Sidebar: React.FC = () => {
  const handleLogout = () => {
    console.log("Logout clicked");
  localStorage.clear();

  window.location.href = "/";
  };

  return (
    <div
      className="
        fixed left-10px top-[72px] 
        h-[calc(98vh-64px)] 
        w-[270px] 
        bg-linear-to-b from-[#2AB3A9] to-[#045B72] 
        text-white rounded-3xl 
        flex flex-col items-center shadow-2xl overflow-hidden 
      "
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center w-full px-4 py-5 border-b border-white/30">
        <div className="relative">
          <img
            src="https://placehold.co/100x100/ffffff/003366?text=V"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
          <span className="absolute bottom-1 right-2 bg-white text-teal-700 p-1.5 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <CreditCard size={14} />
          </span>
        </div>
        <div className="mt-3 text-left w-full">
          <p className="text-sm font-semibold text-white">Name : Vanshita</p>
          <p className="text-sm font-semibold mt-1 text-white">SPN ID : API25XXXXX</p>
        </div>
      </div>

      {/* Scrollable Menu Section */}
     <div
  className="
    flex-1 w-full px-5 mt-4 space-y-2 overflow-y-auto
    [&::-webkit-scrollbar]:hidden
    [-ms-overflow-style:none]
    [scrollbar-width:none] 
  "
>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}
      </div>

      {/* Logout Button */}
      <div className="w-full px-5 py-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-[#B2F1E5] text-[#003366] font-semibold py-2 rounded-full shadow-md hover:scale-[1.03] transition-transform"
        >
          <LogOut size={18} />
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Sidebar;