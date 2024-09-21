// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const router = express.Router();
const cors = require("cors");
const db = require("../models");
"  "
const server = http.createServer(router);
// const io = socketIo(server);
console.log("Here I am");
router.use(cors());

const io = socketIo(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://gadzconnect.com",
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
// const socket = io("https://your-domain.com", {
//   secure: true,
//   rejectUnauthorized: false // Only for self-signed certificates
// });
io.on("connection", (socket) => {
  console.log("New client connected");
  // console.log(socket);
  socket.on("sendMessage", async (message) => {
    console.log("MESSAGE", message);
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

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("sendMessage", (message) => {
//     io.emit("receiveMessage", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

router.get("/test", (req, res) => {
  // console.log("Thanks for hitting the get info");
  db.Message.findAll()
    .then((messages) => {
      res.json(messages);
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
      res.status(500).send("Internal Server Error");
    });
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Application specific logging, throwing an error, or other logic here
});

server.listen(3002, () => {
  console.log("Server is running on port 3002");
});

module.exports = router;
