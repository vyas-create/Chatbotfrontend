// src/utils/api.js

/**
 * This file can be used to centralize API calls for your frontend.
 * Currently, direct fetch calls are made in Chatbot.js.
 * You can expand this file to include functions for each backend endpoint.
 */

// Example:
// export const chatbotAPI = {
//   askBot: async (payload) => {
//     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ask_bot`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });
//     return response.json();
//   },
//   // Add other API functions here (e.g., for auth, payments)
// };

// Export an empty object for now, as it's imported but not directly used for fetch calls in Chatbot.js
// The import is kept for consistency with previous code.
export const chatbotAPI = {};
