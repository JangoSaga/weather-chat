import { createContext, useEffect, useState } from "react";

import { useWeatherAgent } from "../hooks/useWeatherAgent";

const ChatContext = createContext();
function ChatProvider({ children }) {
  const THREAD_ID = import.meta.env.VITE_THREAD_ID;
  const [messages, setMessages] = useState([]);
  const [streamingMessage, setStreamingMessage] = useState("");
  const { sendMessage, loading, error, clearError } = useWeatherAgent();

  useEffect(() => {
    const savedMessages = localStorage.getItem("weather-chat-messages");
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    }
  }, []);

  useEffect(() => {
    let chats = messages.filter((msg) => !msg?.isError);
    if (messages.length > 0) {
      localStorage.setItem("weather-chat-messages", JSON.stringify(chats));
    }
  }, [messages]);

  const handleSendMessage = async (content) => {
    if (!content.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setStreamingMessage("");
    clearError();

    try {
      const apiMessages = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const agentResponse = await sendMessage(
        apiMessages,
        (chunk) => setStreamingMessage(chunk),
        THREAD_ID
      );

      const agentMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: agentResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
      setStreamingMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: `Sorry, I encountered an error: ${err.message}. Please try again.`,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setStreamingMessage("");
    }
  };

  const clearChat = () => {
    setMessages([]);
    setStreamingMessage("");
    localStorage.removeItem("weather-chat-messages");
  };
  return (
    <ChatContext.Provider
      value={{
        messages,
        handleSendMessage,
        clearChat,
        streamingMessage,
        loading,
        error,
        clearError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export { ChatProvider, ChatContext };
