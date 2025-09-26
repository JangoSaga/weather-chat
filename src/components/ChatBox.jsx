import Messages from "./Messages";
import ChatInput from "./ChatInput";
import ErrorMsg from "./ErrorMsg";
import { useChat } from "../hooks/useChat";
import { useDarkMode } from "../hooks/useDarkMode";
import DarkModeButton from "../components/DarkModeButton";
import ClearChat from "./ClearChat";
function ChatBox() {
  const { error } = useChat();
  const { dark } = useDarkMode();
  return (
    <div
      className={`h-full flex flex-col ${dark && "dark:bg-gray-900"} bg-white`}
    >
      <DarkModeButton />

      <div className="flex-1 overflow-hidden">
        <Messages />
      </div>

      {error && <ErrorMsg />}

      <div
        className={`border-t border-gray-100 bg-white ${
          dark && "dark:border-gray-700 dark:bg-gray-800"
        } px-6 py-6`}
      >
        <div className="max-w-4xl gap-x-2 mx-auto flex flex-2">
          <ChatInput />
          <ClearChat />
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
