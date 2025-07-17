import React from "react";
import { Check, X } from "lucide-react";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="page-section py-24 px-4 bg-gradient-to-br from-pink-50 to-purple-100 text-center"
    >
      <h2 className="text-4xl font-bold font-display mb-4 text-gray-900">
        We are poor, But with a Big Heart
      </h2>
      <p className="text-lg text-gray-600 mb-10">
        "Life is simple. So is our pricing."
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl p-8 shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">
            Free Plan
          </h3>
          <p className="text-5xl font-extrabold text-gray-900 mb-2">
            ₹0
          </p>
          <p className="text-sm text-gray-500 mb-6">
            lifetime
          </p>
          <ul className="text-gray-700 mb-6 space-y-2 text-left w-full max-w-xs">
            <li className="flex items-center">
              <Check
                className="text-green-500 mr-2"
                size={16}
              />
              10 Questions (lifetime)
            </li>
            <li className="flex items-center">
              <X
                className="text-red-500 mr-2"
                size={16}
              />
            </li>
          </ul>
          <button className="bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-full mt-auto">
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-indigo-600 text-white rounded-2xl p-8 shadow-xl relative flex flex-col items-center">
          <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
            Popular
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Premium Plan
          </h3>
          <p className="text-5xl font-extrabold mb-2">
            ₹50
          </p>
          <p className="text-sm mb-6">
            per 500 questions
          </p>
          <ul className="mb-6 space-y-2 text-left w-full max-w-xs">
            <li className="flex items-center">
              <Check
                className="text-green-300 mr-2"
                size={16}
              />
              500 Questions
            </li>
            <li className="flex items-center">
              <Check
                className="text-green-300 mr-2"
                size={16}
              />
            </li>
          </ul>
          <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 mt-auto hidden">
            Upgrade Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
