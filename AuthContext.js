import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To indicate if auth is ready

  useEffect(() => {
    const mockAuth = async () => {
      setLoading(true);
      // Simulate an async auth check
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsAuthenticated(true); // Assume authenticated for now
      setUser({
        uid: "mock-user-123",
        email: "mock@example.com",
        name: "Mock User", // Added for Header component
        isPremium: true, // Added for Header component
        mobileNumber: "9876543210", // Added for UserProfile
        questionsUsed: 5, // Added for Chatbot status display
      });
      setLoading(false);
    };

    mockAuth();

    // If you re-enable Firebase, your actual auth logic would go here:
    /*
    const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
      } else {
        // Attempt anonymous sign-in if no user and no initial token
        if (typeof __initial_auth_token === 'undefined') {
          await signInAnonymously(auth);
        }
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    });

    // Sign in with custom token if provided (for Canvas environment)
    if (typeof __initial_auth_token !== 'undefined') {
      signInWithCustomToken(auth, __initial_auth_token)
        .catch((error) => {
          console.error("Firebase custom token sign-in failed:", error);
          setLoading(false);
        });
    }

    return () => unsubscribe(); // Cleanup subscription on unmount
    */
  }, []);

  // Mocked signup and signin functions for frontend testing
  const signup = async (formData) => {
    console.log("Mock signup API call with:", formData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate success
    setIsAuthenticated(true);
    setUser({ uid: `mock-user-${Date.now()}`, email: formData.email || "mock@example.com", name: formData.name, mobileNumber: formData.mobile_number, isPremium: false, questionsUsed: 0 });
    console.log("Mock signup successful!");
  };

  const signin = async ({ mobile_number, passkey }) => {
    console.log("Mock signin API call with:", mobile_number, passkey);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate success
    setIsAuthenticated(true);
    setUser({ uid: `mock-user-${Date.now()}`, email: "mock@example.com", name: "Mock User", mobileNumber: mobile_number, isPremium: true, questionsUsed: 5 });
    console.log("Mock signin successful!");
  };

  // Mocked logout function
  const logout = async () => {
    console.log("Mock logout initiated.");
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAuthenticated(false);
    setUser(null);
  };

  // Mocked updateUserStatus for frontend testing
  const updateUserStatus = async () => {
    console.log("Mock updateUserStatus called.");
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simulate fetching updated user data
    setUser(prevUser => ({ ...prevUser, isPremium: true, questionsUsed: prevUser.questionsUsed + 1 })); // Example: User becomes premium or questions increment
  };


  const value = {
    isAuthenticated,
    user,
    loading,
    signup, // Expose mock signup
    signin, // Expose mock signin
    logout, // Expose mock logout
    updateUserStatus, // Expose mock update status
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
