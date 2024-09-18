// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const router = express.Router();

const server = http.createServer(router);
const io = socketIo(server);

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

module.exports = router;
