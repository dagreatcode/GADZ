// messageSocket.js
const db = require("../models"); // Adjust according to your project structure

const handleMessageSocket = (io, socket) => {
  console.log("New client connected for messaging:", socket.id);

  // Messaging feature
  socket.on("sendMessage", async (message) => {
    console.log("MESSAGE", message);
    const { sender, receiver, content } = message;

    try {
      // Basic validation
      if (!sender || !receiver || !content) {
        return socket.emit("error", "Missing required fields");
      }

      // Save the new message to the database
      const newMessage = await db.Message.create({ sender, receiver, content });
      io.emit("receiveMessage", newMessage); // Emit the saved message to all clients
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", "Internal Server Error");
    }
  });

  // Handle user joining
  socket.on("userJoined", (userId) => {
    console.log("User joined:", userId);
  });
};

module.exports = handleMessageSocket;
