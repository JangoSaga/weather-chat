import { useContext } from "react";
import { DarkContext } from "../context/DarkContext";
export function useDarkMode() {
  const context = useContext(DarkContext);
  if (context === undefined) {
    throw new Error("Darkmode context not available");
  }
  return context;
}
