const db = require("../models");

const handleMessageSocket = (io, socket) => {
  console.log("New client connected for messaging:", socket.id);

  socket.on("sendMessage", async (message) => {
    const { sender, receiver, content } = message;

    if (!sender || !receiver || !content) {
      return socket.emit("error", "Missing required fields");
    }

    try {
      // Save the message to the database
      const newMessage = await db.Message.create({ sender, receiver, content });

      // Emit to the specific receiver
      io.to(receiver).emit("receiveMessage", newMessage);
      // Optionally, emit to the sender
      socket.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", "Internal Server Error");
    }
  });

  socket.on("userJoined", (userId) => {
    console.log("User joined:", userId);
    socket.join(userId); // Join the user room
  });
};

module.exports = handleMessageSocket;
