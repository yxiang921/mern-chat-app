import { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://mern-chat-app-k89m.onrender.com", {
        query: {
          userID: authUser._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (usersID) => {
        setOnlineUsers(usersID);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
