import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { X } from "lucide-react";

const AuthModal = ({ isOpen, onClose }) => {
  const { signup, signin } = useAuth(); // signup and signin are now used
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile_number: "",
    passkey: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage({ text: "", type: "" });
  };

  const validateForm = () => {
    if (
      !formData.mobile_number ||
      !formData.passkey
    ) {
      setMessage({
        text: "Please fill in all required fields.",
        type: "error",
      });
      return false;
    }
    if (
      !/^\d{10}$/.test(formData.mobile_number)
    ) {
      setMessage({
        text: "Mobile number must be 10 digits.",
        type: "error",
      });
      return false;
    }
    if (!/^\d{4}$/.test(formData.passkey)) {
      setMessage({
        text: "Passkey must be 4 digits.",
        type: "error",
      });
      return false;
    }
    if (isSignUp && !formData.name.trim()) {
      setMessage({
        text: "Name is required for sign up.",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      if (isSignUp) {
        // FIXED: Uncommented actual signup call
        await signup(formData); // Assuming signup is an async function from AuthContext
        setMessage({
          text: "Account created successfully!",
          type: "success",
        });
      } else {
        // FIXED: Uncommented actual signin call
        await signin({ mobile_number: formData.mobile_number, passkey: formData.passkey }); // Assuming signin is an async function
        setMessage({
          text: "Signed in successfully!",
          type: "success",
        });
      }

      setTimeout(() => {
        onClose();
        setFormData({
          name: "",
          mobile_number: "",
          passkey: "",
        });
        setMessage({ text: "", type: "" });
      }, 1500);
    } catch (error) {
      setMessage({
        text:
          error.response?.data?.error ||
          "Authentication failed.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: "",
      mobile_number: "",
      passkey: "",
    });
    setMessage({ text: "", type: "" });
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-button"
          onClick={onClose}
          type="button"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {isSignUp
            ? "Create Account"
            : "Sign In"}
        </h3>

        {message.text && (
          <div
            className={`modal-message ${message.type === 'error' ? 'text-red-500' : 'text-green-500'} text-sm mb-4`}
            style={{ display: "block" }}
          >
            {message.text}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="modal-input"
              disabled={loading}
            />
          )}

          <input
            type="tel"
            name="mobile_number"
            placeholder="Mobile Number (e.g., 9876543210)"
            value={formData.mobile_number}
            onChange={handleInputChange}
            className="modal-input"
            pattern="[0-9]{10}"
            maxLength="10"
            disabled={loading}
          />

          <input
            type="password"
            name="passkey"
            placeholder="4-Digit Passkey"
            value={formData.passkey}
            onChange={handleInputChange}
            className="modal-input"
            pattern="[0-9]{4}"
            maxLength="4"
            disabled={loading}
          />

          <button
            type="submit"
            className="modal-button primary"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </button>

          <button
            type="button"
            onClick={toggleMode}
            className="modal-button secondary bg-gray-200 text-gray-800 hover:bg-gray-300"
            disabled={loading}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Need an account? Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
