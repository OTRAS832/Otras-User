import React from "react";
import Sidebar from "./Sidebar";
import HomeNavbar from "../../components/HomeNavbar";

const MyAccount: React.FC = () => {
  return (
    <>
    <HomeNavbar/>
      <div className=" flex p-2 ">
        <Sidebar />
      </div>

     
    </>
  );
};

export default MyAccount;
