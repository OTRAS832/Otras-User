import React from "react";
import Sidebar from "./Sidebar";
import HomeNavbar from "../../components/HomeNavbar";

const MyAccount: React.FC = () => {
  return (
    <>
    <HomeNavbar/>
    <div className="   ">
      
      {/* Sidebar on left */}
      <div className=" flex ">
        <Sidebar />
      </div>

     
    </div>
    </>
  );
};

export default MyAccount;
