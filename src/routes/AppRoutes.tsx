import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
 
// 🌍 Public Pages
import Landing from "../pages/Landing";
import UserLoginForm from "../pages/auth/LoginForm";
import SignUpForm from "../pages/auth/SignUpForm";
 
// 🏠 Dashboard & Layout
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import HomeNotification from "../pages/Notification-section/HomeNotification";
import NotificationsPage from "../pages/Notification-section/NotificationsPage";
import UpcomingNotificationsPage from "../pages/Notification-section/UpcomingNotificationsPage";
import ApplicationStatus from "../pages/Notification-section/ApplicationStatus";
 
 
// 🧍 My Account
import MyAccount from "../pages/Myaccount/MyAccount";
import ApplicationLayout from "../pages/Myaccount/ApplicationLayout";
 
// 🧩 Newly Added Pages
import AdmitCardReleasedPage from "../pages/AdmitCardReleasedPage";
import ResultPage from "../pages/ResultPage";
import JobApplication from "../pages/OtrRegistrationSteps/JobApplication";
import JobApplicationForm from "../pages/JobApplicationForm";
import PaymentPage from "../pages/Payment";
import PaymentSuccess from "../pages/PaymentSucess";
import PaymentFailed from "../pages/PaymentFailed";
import ResultViewPage from "../components/ResultViewPage";
 
const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/upcoming-notifications" element={<UpcomingNotificationsPage />} />
 
        {/* 🧍 My Account Section (separate layout) */}
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/Myaccount/*" element={<ApplicationLayout />} />
        <Route path="/Myaccount/*" element={<ApplicationLayout />} />
 
        {/* 🔒 Protected Routes under AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/otr" element={<JobApplication />} />
          <Route path="/jobApplicationForm" element={<JobApplicationForm/>} />
          <Route path="/paymentPage" element={<PaymentPage/>} />
          <Route path="/paymentSucess" element={<PaymentSuccess/>} />
          <Route path="/paymentfaild" element={<PaymentFailed/>} />
      

          <Route path="/home-notifications" element={<HomeNotification />} />
          <Route path="/student-results" element={<ResultViewPage />} />
          <Route path="/application-status" element={<ApplicationStatus />} />
 
          {/* 🆕 Additional Pages */}
          <Route path="/admit-card-released" element={<AdmitCardReleasedPage />} />
          <Route path="/result-list" element={<ResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
 
export default AppRoutes;
 
 