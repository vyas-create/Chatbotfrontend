import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import { useAuth } from "../contexts/AuthContext";
import { Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'; // Import remarkGfm for table support
// eslint-disable-next-line no-unused-vars
import toast from "react-hot-toast"; // toast is used via toast.error, but ESLint might not catch it directly.

const Chatbot = () => {
  const {
    isAuthenticated,
    userId,
    isPremium,
    questionsUsed,
    updateUserStatus, // This is now used indirectly via checkUserStatus
  } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const [selectedLevel, setSelectedLevel] =
    useState("Unspecified");
  const [userStatus, setUserStatus] =
    useState(null); // This state isn't directly used but kept for context

  const messagesEndRef = useRef(null);
  const chatHistoryRef = useRef([]); // To maintain chat history for API calls

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  // FIXED: Commented out this useEffect to prevent automatic scrolling on send.
  // If you later want controlled scrolling (e.g., only for bot messages, or a scroll button),
  // you can re-implement this with more specific conditions.
  /*
  useEffect(() => {
    // Only scroll to bottom when new messages are added, not on every render
    if (messages.length > 0) {
      // Use setTimeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages.length]); // Only depend on messages length, not the entire messages array
  */

  // FIXED: checkUserStatus is now called in useEffect and sendMessage
  const checkUserStatus = async () => {
    // This function is currently mocked as Firestore is removed.
    // In a real scenario, it would fetch actual user status from your backend.
    console.log("Mock checkUserStatus called. Assuming premium for testing.");
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    setUserStatus({
      isPremium: true,
      questionsUsedFreeTier: 0,
      questionsRemainingPremium: 500
    });
    // If updateUserStatus is a context function to update global state, call it here
    // updateUserStatus(); // This would be called if checkUserStatus actually fetched new user data
  };

  useEffect(() => {
    // Always show welcome message for testing
    setMessages([
      {
        id: Date.now(),
        type: "bot",
        content:
          "Hello! Ask me anything about CA studies. Select a CA Level above to tailor my responses.",
        timestamp: new Date(),
      },
    ]);
    // In a real app, you might fetch initial chat history here
    checkUserStatus(); // FIXED: Call checkUserStatus on mount
  }, []); // Empty dependency array means this runs once on mount


  const addMessage = (content, type = "user") => {
    const newMessage = {
      id: Date.now(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage("");
    addMessage(message, "user");

    // Add to chat history for API
    chatHistoryRef.current.push({
      role: "user",
      parts: [{ text: message }],
    });

    setIsLoading(true);

    // Add typing message with a unique ID
    const typingMessageId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: typingMessageId,
        type: "bot",
        content: "Typing...",
        timestamp: new Date(),
      },
    ]);

    try {
      // FIXED: Updated API_BASE_URL to the provided Render URL
      const API_BASE_URL = "https://cachatbot-python.onrender.com";
      
      const response = await fetch(
        `${API_BASE_URL}/ask_bot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: message,
            chat_history: chatHistoryRef.current,
            user_id: userId || "anonymous", // Pass user ID (mocked if not authenticated)
            ca_level: selectedLevel,
          }),
        }
      );

      const data = await response.json();

      // Remove typing message and add real response
      setMessages((prev) => {
        const filtered = prev.filter(
          (msg) => msg.id !== typingMessageId
        );
        return [
          ...filtered,
          {
            id: Date.now(),
            type: "bot",
            content:
              response.status === 403 ||
              response.status === 401
                ? data.answer ||
                  "You have reached your question limit. Please upgrade for unlimited access."
                : !response.ok
                ? `Error: Could not get a response. ${
                    data.error ||
                    response.statusText
                  }. Please try again.`
                : data.answer,
            timestamp: new Date(),
          },
        ];
      });

      if (response.ok) {
        chatHistoryRef.current.push({
          role: "model",
          parts: [{ text: data.answer }],
        });
      }

      await checkUserStatus(); // FIXED: Call checkUserStatus after message is sent
    } catch (error) {
      console.error(
        "Error sending message:",
        error
      );

      // Remove typing message and add error message
      setMessages((prev) => {
        const filtered = prev.filter(
          (msg) => msg.id !== typingMessageId
        );
        return [
          ...filtered,
          {
            id: Date.now(),
            type: "bot",
            content: `Error: Could not get a response: ${
              error.message || "Please try again."
            } Ensure backend is running and reachable.`,
            timestamp: new Date(),
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLevelChange = (newLevel) => {
    const oldLevel = selectedLevel;
    setSelectedLevel(newLevel);

    if (oldLevel !== newLevel) {
      const oldLevelText =
        oldLevel === "Unspecified"
          ? "All Levels"
          : `CA ${oldLevel.replace("_", " ")}`;
      const newLevelText =
        newLevel === "Unspecified"
          ? "All Levels"
          : `CA ${newLevel.replace("_", " ")}`;
      addMessage(
        `You've changed the selected CA Level from **${oldLevelText}** to **${newLevelText}**. My answers will now be tailored accordingly. ✨`,
        "bot"
      );
    }
  };

  const getStatusText = () => {
    // FIXED: Logic using isAuthenticated, isPremium, questionsUsed is active
    if (!isAuthenticated) {
      return "Please sign in to view your chat limits.";
    }

    if (isPremium) {
      return `Premium User! Questions remaining: ${
        userStatus?.questionsRemainingPremium || 0
      }/500. 🎉`;
    } else {
      const remaining = 10 - questionsUsed;
      if (remaining <= 0) {
        return "You have used all your free questions. Please upgrade for unlimited access! ✨ (Feature coming soon)";
      }
         }
  };

  const isInputDisabled = () => {
    // FIXED: Logic using isAuthenticated, isPremium, questionsUsed is active
    if (!isAuthenticated) return true;
    if (isPremium) return false;
    return questionsUsed >= 10;
  };

  // FIXED: Authentication check for rendering prompt is active
  if (!isAuthenticated) {
    return (
      <div className="signin-prompt flex flex-col items-center justify-center h-full">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Sign In to Start Chatting
        </h3>
        <p className="text-gray-600 mb-6">
          Access our intelligent chatbot by
          signing in. It's quick and easy!
        </p>
        {/* This button should ideally trigger the AuthModal */}
        <button
          onClick={() => { /* You might want to pass openAuthModal prop here */ }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="chatbot-container flex flex-col h-[60vh] sm:h-[70vh] md:h-[75vh] bg-white rounded-xl shadow-lg border border-gray-200">
      {/* CA Level Selector */}
      <div className="form-group p-4 bg-gray-50 rounded-t-lg border-b border-gray-200">
        <label
          htmlFor="caLevelSelect"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Tailor answers to CA Level:
        </label>
        <select
          id="caLevelSelect"
          value={selectedLevel}
          onChange={(e) =>
            handleLevelChange(e.target.value)
          }
          className="block w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Unspecified">
            All CA Levels (General)
          </option>
          <option value="Foundation">
            CA Foundation
          </option>
          <option value="Intermediate">
            CA Intermediate
          </option>
          <option value="Final">CA Final</option>
        </select>
      </div>

      {/* Chat History */}
      {/* Added flex-grow to make chat history fill available space */}
      <div className="chat-history flex-grow overflow-y-auto p-4 bg-gray-50 custom-scrollbar">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message max-w-[85%] p-3 rounded-lg mb-3 ${
              message.type === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-blue-100 text-blue-900"
            }`}
          >
            {message.type === "bot" ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            ) : (
              <span>{message.content}</span>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Status Display */}
      <div className="p-4 bg-gray-100 border-t border-gray-200">
        <div className="text-sm text-gray-600 font-semibold">
          {getStatusText()}
        </div>
      </div>

      {/* Chat Input */}
      <div className="chat-input-area p-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) =>
            setInputMessage(e.target.value)
          }
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={
            isInputDisabled() || isLoading
          }
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <button
          onClick={sendMessage}
          disabled={
            !inputMessage.trim() ||
            isLoading ||
            isInputDisabled()
          }
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
