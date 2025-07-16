import React from "react";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const scrollToSection = (sectionId) => {
    const element =
      document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="home"
      className="page-section text-center px-6 bg-gradient-to-br from-white via-purple-50 to-pink-50 py-24 sm:py-32 md:py-40 flex flex-col items-center justify-center min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold font-display text-gray-900 leading-tight mb-6">
          CA is hard,{" "}
          <span className="text-indigo-600">
            But I'm your friend. Here's my gift.
          </span>
        </h1>
        <p className="text-xl text-gray-700 mb-10">
          I'm Chat CA — Get instant answers, study
          help, and motivation — anytime,
          anywhere.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6"> {/* Added flex-col sm:flex-row for responsiveness */}
          <button
            onClick={() =>
              scrollToSection("chatbot")
            }
            className="cta-button bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl flex items-center space-x-2"
          >
            <span>Start Chatting</span>
            <ArrowRight size={20} />
          </button>
          <button
            onClick={() =>
              scrollToSection("pricing")
            }
            className="cta-button bg-white hover:bg-gray-100 text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-indigo-600"
          >
            See Pricing
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
