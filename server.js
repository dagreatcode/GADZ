// server.js
require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");
const db = require("./models");
const axios = require("axios");
const bodyParser = require("body-parser");
const handleVideoSocket = require("./config/videoSocket");
const handleMessageSocket = require("./config/messageSocket");
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));
app.use(express.static("images"));
app.use(bodyParser.json());

const ServerPort = process.env.SOCKET_IO_SERVER_PORT;

app.use(
  cors({
    origin: ServerPort,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const io = socketIo(server, {
  cors: {
    origin: `${ServerPort}`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  handleVideoSocket(io, socket);
  handleMessageSocket(io, socket);
});

// Other routes...
app.use("/api/agreement", require("./controllers/AgreementController.js"));
app.use("/api/user", require("./controllers/UserAPIRoutes.js"));
app.use("/api/admin", require("./controllers/AdminController.js"));
app.use("/api/it-help", require("./controllers/ITticketController.js"));
app.use(
  "/api/employee-help",
  require("./controllers/EmployeeTicketController.js")
);
app.use("/api/message", require("./controllers/MessageController.js"));
app.use("/api/mail/", require("./config/nodeMailer/nodeMailer.js"));
app.use(require("./routes"));

// API endpoints for QR code creation and viewing
app.post("/api/qr-create", async (req, res) => {
  const data = req.body;
  try {
    const response = await axios.post(
      "https://hovercode.com/api/v2/hovercode/create/",
      data,
      {
        headers: {
          Authorization: `Token ${process.env.API_KEY_QR}`,
        },
        timeout: 10000,
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error posting QR:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/qr-view", async (req, res) => {
  try {
    const response = await axios.get(
      "https://hovercode.com/api/v2/workspace/82140683-32bd-4422-9ff9-7ecec248c952/hovercodes/",
      {
        headers: {
          Authorization: `Token ${process.env.API_KEY_QR}`,
        },
        timeout: 10000,
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching QR codes:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Test routes
app.get("/api/config", (req, res) => {
  res.json({ success: true });
});

app.get("/apiFun", (req, res) => {
  res.send("API FUN");
});

// Used as a wildcard if something goes wrong
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to SQL Database
db.sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err.message);
  });
