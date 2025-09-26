import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useDarkMode } from "../hooks/useDarkMode";
import { FaRobot } from "react-icons/fa";
function Message({ message }) {
  const { role, content, timestamp, isError, isStreaming } = message;
  const isUser = role === "user";

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const { dark } = useDarkMode();
  return (
    <div className="w-full">
      <div
        className={`flex items-start space-x-3 ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        {!isUser && (
          <div
            className={`w-8 h-8 rounded-full bg-black text-white ${
              dark && "dark:bg-white dark:text-gray-900"
            } flex items-center justify-center text-xs font-medium flex-shrink-0`}
          >
            AI
          </div>
        )}

        <div
          className={`flex flex-col max-w-3xl ${
            isUser ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`rounded-lg px-4 py-3 shadow-xs ${
              isUser
                ? `bg-gray-900 ${
                    dark && "dark:bg-gray-50 dark:text-gray-900"
                  } text-white `
                : isError
                ? `bg-red-50 text-red-700 border border-red-200`
                : `bg-gray-50 text-gray-900 ${
                    dark &&
                    "dark:text-white dark:bg-gray-800 dark:border-gray-800"
                  } border border-gray-100 `
            }`}
          >
            <div className="prose whitespace-pre-wrap break-words leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {content}
              </ReactMarkdown>
            </div>

            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse" />
            )}
          </div>

          <div
            className={`text-xs text-gray-400 ${dark && "text-gray-50"} mt-1 ${
              isUser ? "text-right" : "text-left"
            }`}
          >
            {formatTime(timestamp)}
            {isStreaming && <span className="ml-2 text-green-500">●</span>}
          </div>
        </div>

        {isUser && (
          <div
            className={`w-8 h-8 rounded-full bg-gray-200 text-gray-600 ${
              dark && "dark:bg-gray-800 dark:text-white"
            } flex items-center justify-center text-xs font-medium flex-shrink-0`}
          >
            You
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
