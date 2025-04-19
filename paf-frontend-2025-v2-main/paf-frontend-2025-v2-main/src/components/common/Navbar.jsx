import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import { authState } from "../../store/authState";
import { Link, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";

const Navbar = () => {
  const auth = useSnapshot(authState);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    authState.checkAuth();
  }, []);

  const isActive = (path) => {
    if (path === "/" && currentPath === "/") {
      return true;
    }
    if (path !== "/" && currentPath.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <nav className="bg-blue-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={"/"}>
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-blue-600 text-xl font-bold">
                  Einstine CLUB
                </h1>
              </div>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`${
                  isActive("/")
                    ? "text-blue-700 border-blue-500"
                    : "text-gray-600 border-transparent"
                } hover:text-blue-500 inline-flex items-center px-1 pt-1 border-b-2 hover:border-blue-300 font-medium`}
              >
                Home
              </Link>
              <Link
                to="/plans"
                className={`${
                  isActive("/plans")
                    ? "text-blue-700 border-blue-500"
                    : "text-gray-600 border-transparent"
                } hover:text-blue-500 inline-flex items-center px-1 pt-1 border-b-2 hover:border-blue-300 font-medium`}
              >
                Plans
              </Link>
              <Link
                to="/progresses"
                className={`${
                  isActive("/progresses")
                    ? "text-blue-700 border-blue-500"
                    : "text-gray-600 border-transparent"
                } hover:text-blue-500 inline-flex items-center px-1 pt-1 border-b-2 hover:border-blue-300 font-medium`}
              >
                Prgresses
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {auth.isAuthenticated ? (
              <div className="flex items-center">
                <Link
                  to="/profile"
                  className={`${
                    isActive("/profile") ? "text-blue-700" : "text-gray-600"
                  } hover:text-blue-500 px-3 py-2 rounded-md font-medium`}
                >
                  Profile
                </Link>
                <Link
                  to="/notification"
                  className={`${
                    isActive("/notification")
                      ? "text-blue-700"
                      : "text-gray-600"
                  } hover:text-blue-500 px-3 py-2 rounded-md font-medium`}
                >
                  <Bell />
                </Link>
                <button
                  onClick={() => authState.logout()}
                  className="ml-4 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-md font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  to="/login"
                  className={`${
                    isActive("/login") ? "bg-blue-600" : "bg-blue-500"
                  } hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`ml-4 ${
                    isActive("/signup") ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-100 text-blue-600 border border-blue-500 px-4 py-2 rounded-md font-medium`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
