// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
require("dotenv").config();
const express = require("express");
const path = require("path");
const AgreementController = require("./controllers/AgreementController.js");
const UserController = require("./controllers/UserAPIRoutes.js");
const AdminController = require("./controllers/AdminController.js");
const ITticketController = require("./controllers/ITticketController.js");
const EmployeeTicketController = require("./controllers/EmployeeTicketController.js");
const Message = require("./controllers/MessageController.js");
// const Chat = require("./config/chat.js");
// const inquirer = require("inquirer"); // Create Console App
const routes = require("./routes");

const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
// const io = socketIo(server);

// Set server PORT
// =============================================================
const PORT = process.env.PORT || 3001;

// Sets up the Express App Middleware
// =============================================================
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Serve up static assets (usually on heroku/render)
// =============================================================
app.use(express.static("client/build"));

app.use(express.static("images"));

// Connect to SQL Database
// =============================================================
var db = require("./models");

// const server = require("http").createServer(app);
// const io = require("socket.io")(http);

// const http = require("http");
// const socketIo = require("socket.io");
// const cors = require("cors");
// const server = http.createServer(app);

// const io = socketIo(server, {
//   cors: {
//     origin: [
//       "*",
//       // "http://another-allowed-domain.com",
//     ],
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true,
//   },
// });

// app.use(cors());

// // Outside Routes
// =============================================================
app.use("/api/agreement", AgreementController);
app.use("/api/user", UserController);
app.use("/api/admin", AdminController);
app.use("/api/it-help", ITticketController);
app.use("/api/employee-help", EmployeeTicketController);
app.use(routes);
app.use("/api/message", Message);
app.use("/api/mail/", require("./config/nodeMailer/nodeMailer.js"));
// app.use("/messages", require("./config/chat.js"));

// app.use(AuthController);
// require("./routes/post-api-routes.js")(app);

// const messages = [];

app.use(express.json());

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("sendMessage", async (message) => {
//     const { sender, receiver, content } = message;
//     try {
//       // Basic validation
//       if (!sender || !receiver || !content) {
//         return socket.emit("error", "Missing required fields");
//       }

//       const newMessage = await db.Message.create({ sender, receiver, content });
//       io.emit("receiveMessage", newMessage); // Emit the saved message
//     } catch (error) {
//       console.error("Error saving message:", error);
//       socket.emit("error", "Internal Server Error");
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// app.post("/messages", (req, res) => {
//   const { user, text } = req.body;
//   if (!user || !text) {
//     return res.status(400).send("Bad Request: user and text are required.");
//   }
//   db.Message.create({ user, text })
//     .then((newMessage) => {
//       res.json(newMessage);
//     })
//     .catch((error) => {
//       console.error("Error creating message:", error);
//       res.status(500).send("Internal Server Error");
//     });
// });

// app.get("/messages", (req, res) => {
//   // console.log("Thanks for hitting the get info");
//   db.Message.findAll()
//     .then((messages) => {
//       res.json(messages);
//     })
//     .catch((error) => {
//       console.error("Error fetching messages:", error);
//       res.status(500).send("Internal Server Error");
//     });
// });

// app.post("/messages", (req, res) => {
//   console.log("The Body", req.body);
//   // const { sender, receiver, content } = req.body;
//   db.Message.create(req.body).then((newMessage) => {
//     console.log(newMessage);
//     res.json(newMessage);
//   });
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// TODO: Add console app.
const io = socketIo(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://gadzconnect.com",
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

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

router.get("/messages", (req, res) => {
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

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

// Test routes to see if their server is talking to the client
// =============================================================
app.get("/api/config", (req, res) => {
  res.json({ success: true });
});
app.get("/apiFun", (req, res) => {
  res.send("API FUN");
  console.log("Have Fun");
  res.end();
});

// Used as a wildcard if something goes wrong
// =============================================================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Starts the server to begin listening
// =============================================================
// { force: true }
db.sequelize.sync().then(function () {
// Sync Sequelize models
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`🌎 App and Socket.IO server are running on http://localhost:${PORT}`);
  });
});
});
