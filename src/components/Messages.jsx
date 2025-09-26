import React, { useEffect, useRef } from "react";
import Message from "./Message";
import Loading from "./Loading";
import { useChat } from "../hooks/useChat";
import Welcome from "./Welcome";
function Messages() {
  const messagesEndRef = useRef(null);
  const { messages, streamingMessage, loading } = useChat();
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage]);
  return (
    <div className="h-full overflow-y-auto ">
      {messages.length === 0 && !streamingMessage && <Welcome />}

      <div className="px-6 py-6 space-y-6 max-w-4xl mx-auto">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {streamingMessage && (
          <Message
            message={{
              role: "assistant",
              content: streamingMessage,
              timestamp: new Date(),
              isStreaming: true,
            }}
          />
        )}

        {loading && !streamingMessage && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                AI
              </div>
              <Loading />
            </div>
          </div>
        )}
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
