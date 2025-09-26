import { useDarkMode } from "../hooks/useDarkMode";
import SuggestionList from "./SuggestionList";
function Welcome() {
  const { dark } = useDarkMode();

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-gray-500">
      <div className="max-w-2xl text-center space-y-6">
        <div className="space-y-2">
          <div className="text-6xl animate-bounce">🌤️</div>
          <h2
            className={`text-2xl font-semibold ${
              dark ? "text-white" : "text-gray-800"
            }`}
          >
            Hello! I’m your Weather Assistant 🌎
          </h2>
          <p
            className={`text-base ${dark ? "text-gray-400" : "text-gray-600"}`}
          >
            Ask me about today’s forecast, weekly predictions, or travel
            weather. Try one of the suggestions below 👇
          </p>
        </div>

        <SuggestionList />
      </div>
    </div>
  );
}

export default Welcome;
