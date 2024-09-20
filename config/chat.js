// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const router = express.Router();
const cors = require("cors");
const db = require("../models");

const server = http.createServer(router);
// const io = socketIo(server);
console.log("Here I am");
router.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("sendMessage", async (message) => {
    const { sender, receiver, content } = message;
    try {
      // Basic validation
      if (!sender || !receiver || !content) {
        return socket.emit("error", "Missing required fields");
      }

      const newMessage = await db.Message.create({ sender, receiver, content });
      io.emit("receiveMessage", newMessage); // Emit the saved message
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", "Internal Server Error");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3002, () => {
  console.log("Server is running on port 3002");
});

module.exports = router;
