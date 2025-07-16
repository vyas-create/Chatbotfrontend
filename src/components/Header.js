import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// Receive openAuthModal as a prop
const Header = ({ openAuthModal }) => {
  const { user, logout, isAuthenticated } =
    useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#chatbot", label: "Chatbot" },
    { href: "#pricing", label: "Pricing" },
    { href: "#about", label: "About Us" },
  ];

  const scrollToSection = (sectionId) => {
    const element =
      document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    // FIXED: Uncommented actual logout call
    await logout();
    console.log("Logout initiated.");
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-display text-2xl font-bold tracking-wide">
          <span className="bg-white text-indigo-600 px-2 py-1 rounded-xl shadow-sm">
            Chat
          </span>{" "}
          CA
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() =>
                scrollToSection(
                  item.href.substring(1)
                )
              }
              className="nav-link text-white hover:text-gray-200 transition-colors font-semibold"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Menu / Auth */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <div className="text-white text-sm">
                <div className="font-semibold">
                  {user?.name || "User"}
                </div>
                <div className="text-xs opacity-80">
                  {user?.isPremium
                    ? "Premium"
                    : "Free"}{" "}
                  User
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            // FIXED: Added onClick to trigger AuthModal
            <button
              onClick={openAuthModal}
              className="text-white hover:text-gray-200 transition-colors"
              title="Sign In / Sign Up"
            >
              <User size={20} />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setIsMobileMenuOpen(
                !isMobileMenuOpen
              )
            }
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() =>
                  scrollToSection(
                    item.href.substring(1)
                  )
                }
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
