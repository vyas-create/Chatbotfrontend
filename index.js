import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Ensure this imports your CSS file
import App from "./App"; // Import your main App component

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
