// messageSocket.js
const db = require("../models");

const handleMessageSocket = (io, socket) => {
  console.log("New client connected for messaging:", socket.id);

  socket.on("sendMessage", async (message) => {
    const { sender, receiver, content } = message;

    if (!sender || !receiver || !content) {
      return socket.emit("error", "Missing required fields");
    }

    try {
      const newMessage = await db.Message.create({ sender, receiver, content });
      io.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", "Internal Server Error");
    }
  });

  socket.on("userJoined", (userId) => {
    console.log("User joined:", userId);
  });
};

module.exports = handleMessageSocket;
