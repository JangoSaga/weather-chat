import { useState } from "react";
export const useWeatherAgent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const sendMessage = async (messages, onMessageChunk, threadId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-mastra-dev-playground": "true",
        },
        body: JSON.stringify({
          messages: messages,
          runId: "weatherAgent",
          maxRetries: 2,
          maxSteps: 5,
          temperature: 0.5,
          topP: 1,
          runtimeContext: {},
          threadId: threadId,
          resourceId: "weatherAgent",
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let agentMessage = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        const lines = chunk.split("\n");

        for (const line of lines) {
          let trimmed = line.trim();

          if (
            trimmed.startsWith("f:") ||
            trimmed.startsWith("e:") ||
            trimmed.startsWith("d:")
          ) {
            continue;
          }

          if (trimmed.startsWith("0:")) {
            const text = trimmed.replace(/^0:/, "").replace(/^"|"$/g, "");
            agentMessage += text;
            onMessageChunk(agentMessage);
          }
        }
      }

      return agentMessage;
    } catch (err) {
      console.error("Weather Agent API Error:", err);
      setError(err.message || "Failed to send message");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    sendMessage,
    loading,
    error,
    clearError,
  };
};
