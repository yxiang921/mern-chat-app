import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { app, server } from "./socket/socket.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import conn from "./db/conn.js";

dotenv.config();

const port = process.env.PORT || 3001;

app.use(express.json()); // Parse incoming request to JSON
app.use(cookieParser()); // Access cookies

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  conn();
});
