import React from "react";
import { Mail } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="page-section py-24 px-4 bg-gradient-to-br from-white via-purple-50 to-pink-50 text-center"
    >
      <div className="max-w-3xl mx-auto glass p-8">
        <h2 className="text-4xl font-bold font-display mb-6 text-gray-900">
          About Us
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Chat CA was founded with a simple
          mission: to make the challenging journey
          of Chartered Accountancy a little easier
          and a lot more supportive for students.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Our goal is to provide an intelligent,
          friendly AI companion that offers
          instant answers, guidance, and
          motivation, helping you navigate your
          studies with confidence.
        </p>
        <p className="text-xl font-semibold text-gray-800 mb-2">
          Founder: Sanjay Avyukth Vyas
        </p>
        <p className="text-lg text-gray-700 flex items-center justify-center">
          <Mail className="mr-2" size={20} />
          <a
            href="mailto:vyasavyukthacquisition@gmail.com"
            className="text-indigo-600 hover:underline"
          >
            vyasavyukthacquisition@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default About;
