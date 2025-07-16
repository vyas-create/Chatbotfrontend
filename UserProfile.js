import React, {
  useState,
  useEffect,
} from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Lock,
  Settings,
  Save,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const UserProfile = ({ isOpen, onClose }) => {
  const { user, userId, updateUserStatus } = // updateUserStatus is now used by checkUserStatus in Chatbot
    useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });
  const [showPasskeyForm, setShowPasskeyForm] =
    useState(false);
  const [formData, setFormData] = useState({
    currentPasskey: "",
    newPasskey: "",
    confirmPasskey: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        currentPasskey: "",
        newPasskey: "",
        confirmPasskey: "",
      });
      setMessage({ text: "", type: "" });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage({ text: "", type: "" });
  };

  const validatePasskeyForm = () => {
    if (
      !formData.currentPasskey ||
      !formData.newPasskey ||
      !formData.confirmPasskey
    ) {
      setMessage({
        text: "Please fill in all fields.",
        type: "error",
      });
      return false;
    }
    if (
      !/^\d{4}$/.test(formData.currentPasskey) ||
      !/^\d{4}$/.test(formData.newPasskey)
    ) {
      setMessage({
        text: "Passkey must be exactly 4 digits.",
        type: "error",
      });
      return false;
    }
    if (
      formData.newPasskey !==
      formData.confirmPasskey
    ) {
      setMessage({
        text: "New passkey and confirm passkey do not match.",
        type: "error",
      });
      return false;
    }
    if (
      formData.currentPasskey ===
      formData.newPasskey
    ) {
      setMessage({
        text: "New passkey must be different from current passkey.",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleChangePasskey = async (e) => {
    e.preventDefault();
    if (!validatePasskeyForm()) return;

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Replace with actual API call to change passkey
      // const response = await fetch(
      //   `${process.env.REACT_APP_API_URL || "https://educational-chatbot-backend.onrender.com"}/api/auth/passkey`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       currentPasskey: formData.currentPasskey,
      //       newPasskey: formData.newPasskey,
      //     }),
      //   }
      // );
      // const data = await response.json();

      // Mock response
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = { ok: true }; // Simulate success
      const data = { message: "Passkey changed successfully!" };

      if (response.ok) {
        setMessage({
          text: data.message || "Passkey changed successfully! (Mock)",
          type: "success",
        });
        setFormData({
          currentPasskey: "",
          newPasskey: "",
          confirmPasskey: "",
        });
        // updateUserStatus(); // Call this if your AuthContext has a way to refresh user data
        setTimeout(() => {
          setShowPasskeyForm(false);
          setMessage({ text: "", type: "" });
        }, 2000);
      } else {
        setMessage({
          text:
            data.error ||
            "Failed to change passkey. (Mock Error)",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Network error. Please try again. (Mock Error)",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-button"
          onClick={onClose}
          type="button"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User
              size={32}
              className="text-blue-600"
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            User Profile
          </h3>
          <p className="text-gray-600">
            Manage your account settings
          </p>
        </div>

        {/* User Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Name:
              </span>
              <span className="font-semibold">
                {user?.name || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Mobile:
              </span>
              <span className="font-semibold">
                {user?.mobileNumber || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Status:
              </span>
              <span
                className={`font-semibold ${
                  user?.isPremium
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {user?.isPremium
                  ? "Premium"
                  : "Free"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                User ID:
              </span>
              <span className="font-mono text-xs">
                {userId || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() =>
              setShowPasskeyForm(!showPasskeyForm)
            }
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Lock size={20} />
            <span>Change Passkey</span>
          </button>

          <button
            onClick={() => {
              // TODO: Implement account deletion
              toast.error(
                "Account deletion not implemented yet"
              );
            }}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Settings size={20} />
            <span>Delete Account</span>
          </button>
        </div>

        {/* Passkey Change Form */}
        {showPasskeyForm && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg">
            <h4 className="text-lg font-semibold mb-4">
              Change Passkey
            </h4>

            {message.text && (
              <div
                className={`modal-message ${message.type === 'error' ? 'text-red-500' : 'text-green-500'} mb-4`}
                style={{ display: "block" }}
              >
                {message.text}
              </div>
            )}

            <form
              onSubmit={handleChangePasskey}
              className="space-y-4"
            >
              <input
                type="password"
                name="currentPasskey"
                placeholder="Current 4-digit Passkey"
                value={formData.currentPasskey}
                onChange={handleInputChange}
                className="modal-input"
                pattern="[0-9]{4}"
                maxLength="4"
                disabled={loading}
              />

              <input
                type="password"
                name="newPasskey"
                placeholder="New 4-digit Passkey"
                value={formData.newPasskey}
                onChange={handleInputChange}
                className="modal-input"
                pattern="[0-9]{4}"
                maxLength="4"
                disabled={loading}
              />

              <input
                type="password"
                name="confirmPasskey"
                placeholder="Confirm New Passkey"
                value={formData.confirmPasskey}
                onChange={handleInputChange}
                className="modal-input"
                pattern="[0-9]{4}"
                maxLength="4"
                disabled={loading}
              />

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center space-x-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  <span>
                    {loading
                      ? "Updating..."
                      : "Update Passkey"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowPasskeyForm(false);
                    setFormData({
                      currentPasskey: "",
                      newPasskey: "",
                      confirmPasskey: "",
                    });
                    setMessage({
                      text: "",
                      type: "",
                    });
                  }}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
