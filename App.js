import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast"; // This import is here because Toaster is used here, but toast() is called in children.
// eslint-disable-next-line no-unused-vars
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // useAuth is not directly used here, but AuthProvider is.

import Header from "./components/Header";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

const AppContent = () => {
  // isAuthenticated and user are not directly used in AppContent's JSX,
  // they are passed to or used within child components.
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    // The main container for the entire application, ensuring no horizontal overflow
    <div className="overflow-x-hidden">
      {/* Pass openAuthModal to Header so it can trigger the modal */}
      <Header openAuthModal={openAuthModal} />

      <Home />

      {/* Chatbot Section - Made responsive with Tailwind classes and custom CSS */}
      <section
        id="chatbot"
        // Use responsive padding: py-16 (default), sm:py-24 (small screens and up)
        // px-4 (default), md:px-8 (medium screens and up), lg:px-16 (large screens and up)
        className="page-section py-16 sm:py-24 px-4 md:px-8 lg:px-16 bg-white text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
          Your CA Companion 🚀
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-10 px-2">
          Made by Students, for Students. Get instant answers, study help, and
          motivation for your CA journey.
        </p>
        {/* Chatbot container - utilizes the 'glass' effect and responsive width */}
        {/* max-w-sm (small screens), max-w-md (medium), max-w-lg (large), max-w-3xl (xl) */}
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto glass p-4 sm:p-6 w-full">
          {/* Chatbot component will handle its own internal responsiveness */}
          <Chatbot />
        </div>
      </section>

      <Pricing />
      <About />
      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
      />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
};

// Main App component that wraps AppContent with AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
