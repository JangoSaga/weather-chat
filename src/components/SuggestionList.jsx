import { useChat } from "../hooks/useChat";
import { useDarkMode } from "../hooks/useDarkMode";

function SuggestionList() {
  const suggestions = [
    "🌦️ What's the weather like today?",
    "🌍 Weather in Mumbai",
    "⏰ Will it rain tomorrow in Ludhiana.",
    "☀️ 7-day forecast for Mumbai",
  ];
  const { handleSendMessage } = useChat();
  const { dark } = useDarkMode();
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      {suggestions.map((s, idx) => (
        <button
          key={idx}
          onClick={() => handleSendMessage?.(s)}
          className={`px-4 py-2 rounded-xl text-sm font-medium shadow-sm
            bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors
            ${
              dark &&
              "dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
export default SuggestionList;
