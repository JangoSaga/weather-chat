import { useState, useRef } from "react";
import { useChat } from "../hooks/useChat";
import { useDarkMode } from "../hooks/useDarkMode";
import { IoIosSend } from "react-icons/io";
import ClearChat from "./ClearChat";
function ChatInput() {
  const { handleSendMessage, loading } = useChat();
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const { dark } = useDarkMode();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      handleSendMessage(message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`relative flex items-end bg-gray-50 border border-gray-200 rounded-2xl transition-all shadow-sm 
          focus-within:ring-1 focus-within:ring-gray-700 focus-within:bg-white 
          ${
            dark &&
            "dark:bg-gray-900 dark:border-gray-800 dark:focus-within:ring-gray-300 dark:focus-within:bg-gray-900"
          }`}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={
            loading ? "Generating response..." : "Type your message..."
          }
          disabled={loading}
          className={`w-full px-4 py-3 bg-transparent border-0 focus:ring-0 focus:outline-none 
            resize-none overflow-hidden min-h-[50px] max-h-[120px] text-gray-900 placeholder-gray-500 
            ${loading ? "opacity-50 cursor-not-allowed" : ""} 
            ${dark && "dark:text-gray-50 dark:placeholder-gray-400"}`}
          rows="1"
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className={`m-2 p-2 rounded-xl flex items-center justify-center text-xl transition-colors duration-200 
            ${
              loading || !message.trim()
                ? `bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed 
                   ${
                     dark &&
                     "dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700"
                   }`
                : `bg-black text-white hover:bg-gray-800 
                   ${
                     dark &&
                     "dark:bg-white dark:text-gray-900 hover:dark:bg-gray-200"
                   }`
            }`}
          title={loading ? "Generating..." : "Send message (Enter)"}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <IoIosSend className="translate-x-[1px]" />
          )}
        </button>
      </div>
    </form>
  );
}

export default ChatInput;
