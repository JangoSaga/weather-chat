import { useChat } from "../hooks/useChat";

function ErrorMsg() {
  const { error, clearError } = useChat();
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mx-4 rounded-lg">
      <div className="flex justify-between items-center">
        <span>⚠️ {error}</span>
        <button
          onClick={clearError}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default ErrorMsg;
