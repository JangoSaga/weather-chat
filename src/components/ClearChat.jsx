import { useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { FaTrash } from "react-icons/fa";
import { useChat } from "../hooks/useChat";

function ClearChat() {
  const { dark } = useDarkMode();
  const [confirm, setConfirm] = useState(false);
  const { clearChat, loading, messages } = useChat();
  const handleClick = () => {
    if (!confirm) {
      setConfirm(true);
      clearChat();
      if (!loading) {
        setConfirm(false);
      }
    } else {
      setConfirm(false);
    }
  };
  if (messages?.length === 0) return null;
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`w-12 h-12 flex items-center justify-center 
        rounded-full border shadow-md transition-all duration-300
        ${
          dark
            ? "bg-gray-800 border-gray-700 hover:bg-red-600 text-red-400 hover:text-white"
            : "bg-gray-100 border-gray-300 hover:bg-red-500 text-gray-700 hover:text-white"
        }`}
      title="Clear chat history"
    >
      <FaTrash
        className={`text-lg transition-transform duration-300 ${
          confirm ? "scale-125 text-red-600 dark:text-red-400" : ""
        }`}
      />
    </button>
  );
}

export default ClearChat;
