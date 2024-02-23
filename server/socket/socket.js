import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

export const getReceiverSocketID = (receiverID) => {
  return userSocketMap[receiverID];
};

io.on("connection", (socket) => {
  console.log("A user connect to socket", socket.id);

  const userID = socket.handshake.query.userID;
  if (userID != "undefined") {
    userSocketMap[userID] = socket.id;
    console.log("user socket map", Object.keys(userSocketMap));
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnect");
    delete userSocketMap[userID];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
