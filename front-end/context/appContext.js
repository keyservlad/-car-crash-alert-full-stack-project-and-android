import { useSession } from "next-auth/react";
import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const AppConsumer = AppContext.Consumer;

export { AppConsumer, AppContext };
