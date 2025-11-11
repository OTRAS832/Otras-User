import React from "react";
import Navbar from "../components/LandingNavbar";
import HeroCarousel from "../components/HeroCarousel";
import NotificationsAndUpcoming from "../components/NotificationsAndUpcoming";
import Footer from "../components/Footer";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HeroCarousel />
      <NotificationsAndUpcoming />
      <Footer />
    </div>
  );
};

export default Landing;
