import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("caht-user")) || null);
  const testFunc = () => {
    console.log("testing")
  }

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, testFunc }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
