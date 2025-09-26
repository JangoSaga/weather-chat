import { createContext, useState } from "react";

const DarkContext = createContext();
function DarkProvider({ children }) {
  const [dark, setDark] = useState(false);
  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      {children}
    </DarkContext.Provider>
  );
}

export { DarkProvider, DarkContext };
