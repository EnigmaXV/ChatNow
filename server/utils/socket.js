const { Server } = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const getReceiverSocketId = (userId) => {
  return onlineUsers[userId] || null;
};
//{userId:socket.id}
const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("New client connected " + socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) onlineUsers[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(onlineUsers));
  socket.on("disconnect", () => {
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
    console.log("Client disconnected " + socket.id);
  });
});

module.exports = { app, server, io, getReceiverSocketId };
