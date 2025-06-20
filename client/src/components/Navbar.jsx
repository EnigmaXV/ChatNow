import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageCircleHeart } from "lucide-react";
import img from "../assets/small-user-pic.png";
import ThemeController from "./ThemeController";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const avatar = user?.profilePicture || img;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <MessageCircleHeart />
          ChatNow
        </Link>
      </div>

      {/* Right: ThemeController, Avatar, Logout */}
      <div className="navbar-end flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <ThemeController />
            <div className="dropdown dropdown-end">
              <Link to="/profile">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={avatar} alt="User avatar" />
                  </div>
                </label>
              </Link>
            </div>
            <LogOut
              onClick={handleLogout}
              size={28}
              className="cursor-pointer"
            />
          </>
        ) : (
          <>
            <ThemeController />
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
