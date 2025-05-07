import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LoginPage from "./pages/LoginPage";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import ProfilePage from "./pages/ProfilePage";
import CookingPostsPage from "./pages/CookingPostsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import UserProfilePage from "./pages/UserProfilePage";

import SingleGroupPage from "./pages/SingleGroupPage";
import NotificationsPage from "./pages/NotificationsPage";
import RegisterPage from "./pages/RegisterPage";
import PlansPage from "./pages/PlansPage";
import ProgressPage from "./pages/ProgressPage";
import PlanDetailPage from "./pages/PlanDetailsPage";
import CreateProgressPage from "./components/progress/CreateProgressModal";
import UpdateProgressModal from "./components/progress/UpdateProgressModal";

// Layout component with Navbar
const DefaultLayout = () => (
  <>
    <Navbar />
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  </>
);

const Home = () => <CookingPostsPage />;
const Profile = () => <ProfilePage />;
const Login = () => <LoginPage />;
const SignUp = () => <RegisterPage />;
const AdminDashboard = () => <AdminDashboardPage />;

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/plans/:id" element={<PlanDetailPage />} />
            <Route path="/create-progresses" element={<CreateProgressPage />} />
            <Route
              path="/edit-progress/:id"
              element={<UpdateProgressModal />}
            />
            <Route path="/progresses" element={<ProgressPage />} />
            <Route path="/notification" element={<NotificationsPage />} />
            <Route
              path="/login/oauth2/code/google"
              element={<OAuth2RedirectHandler />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user-profile/:id" element={<UserProfilePage />} />
            <Route path="/group/:id" element={<SingleGroupPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
