import ChatBox from "./components/ChatBox";
import { ChatProvider } from "./context/ChatContext";
import { DarkProvider } from "./context/DarkContext";
function App() {
  return (
    <ChatProvider>
      <DarkProvider>
        <div className={`h-full bg-white `}>
          <div className="h-full flex flex-col scroll">
            <main className="flex-1 overflow-hidden">
              <ChatBox />
            </main>
          </div>
        </div>
      </DarkProvider>
    </ChatProvider>
  );
}

export default App;
