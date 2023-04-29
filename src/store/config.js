import { createContext, useState, useContext } from "react";

const configContext = createContext();

export function useConfigContext() {
  return useContext(configContext);
}

export function CountProvider({ children }) {
  const [count, setCount] = useState(100);

  const value = {
    count,
    setCount,
  };

  return (
    <configContext.Provider value={value}>{children}</configContext.Provider>
  );
}
