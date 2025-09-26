import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("ChatContext was used outside of DarkModeProvider");
  }
  return context;
}
