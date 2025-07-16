import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-center py-8 text-sm text-gray-500">
      Built with{" "}
      <Heart
        className="inline-block text-red-500"
        size={14}
      />{" "}
      for CA Students by Chat CA. All rights
      reserved © 2025
    </footer>
  );
};

export default Footer;
