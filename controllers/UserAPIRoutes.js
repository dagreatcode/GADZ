require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const myPort = process.env.SOCKET_IO_SERVER_PORT || "http://localhost:3001"; // Default to a port if not set
const APIKeyQR = process.env.API_KEY_QR;
const axios = require("axios");
const cloudinary = require("../config/cloudinary");
const upload = require("../config/multer");

// Enable CORS for all routes in this router
router.use(
  cors({
    origin: myPort, // Use the port for the socket server as the origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

router.get("/view", (req, res) => {
  db.User.findAll().then((allUsers) => {
    res.send(allUsers);
    // console.log(allUsers);
  });
});

router.get("/view/:id", (req, res) => {
  // console.log(`Fetching user with ID: ${req.params.id}`);

  db.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).send("User not found");
      }
      // console.log("Found User", foundUser);
      res.send(foundUser);
    })
    .catch((error) => {
      // console.error("Error fetching user:", error);
      res.status(500).send("Internal Server Error");
    });
});

router.put("/update/:id", async (req, res) => {
  try {
    // 1️⃣ Find user
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let updateData = { ...req.body };

    // 2️⃣ Handle password update
    if (updateData.newPassword) {
      const hashedPassword = await bcrypt.hash(updateData.newPassword, 10);
      updateData.password = hashedPassword;
      delete updateData.newPassword;
    }

    // 3️⃣ Cloudinary image upload (base64)
    if (updateData.profileImage) {
      try {
        let imageBase64 = updateData.profileImage.trim();

        // If it's raw base64, add data URI prefix
        if (!imageBase64.startsWith("data:") && !imageBase64.startsWith("http")) {
          imageBase64 = `data:image/jpeg;base64,${imageBase64}`;
        }

        const uploadResult = await cloudinary.uploader.upload(imageBase64, {
          folder: "users",
          public_id: `user_${user.id}_${Date.now()}`,
          transformation: [{ width: 500, height: 500, crop: "fill" }],
        });

        updateData.profileImage = uploadResult.secure_url;
      } catch (err) {
        console.error("Cloudinary Upload Error:", err);
        return res.status(400).json({
          success: false,
          message: "Image upload failed",
        });
      }
    }

    // 4️⃣ Update user
    await db.User.update(updateData, { where: { id: req.params.id } });

    // 5️⃣ Fetch updated user
    const updatedUser = await db.User.findByPk(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/signUp", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Email and password are required." });
  }

  try {
    // Generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare QR code data
    const qrCodeData = {
      workspace: "82140683-32bd-4422-9ff9-7ecec248c952",
      qr_data: "https://gadzconnect.com", // Modify this to your desired link
      primary_color: "#3b81f6",
      background_color: "#FFFFFF",
      dynamic: true,
      display_name: email, // Use the user's email or display name here
      frame: "swirl",
      pattern: "Diamonds",
      has_border: true,
      logo_url:
        "https://res.cloudinary.com/fashion-commit/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1726274331/GADZCo_ndr2y6.jpg",
      generate_png: true,
      eye_style: "Drop",
      text: "GADZ",
      gps_tracking: true,
      logo_round: true,
    };

    // Create QR code
    const qrResponse = await axios.post(
      "https://hovercode.com/api/v2/hovercode/create/",
      qrCodeData,
      {
        headers: {
          Authorization: `Token ${APIKeyQR}`,
        },
        timeout: 10000,
      }
    );

    // Create user in the database with the QR code info
    const newUser = await db.User.create({
      email,
      password: hashedPassword,
      qrCodeId: qrResponse.data.id, // Assuming the QR code ID is returned
      qrCode: qrResponse.data.svg_file, // Assuming the SVG file URL is returned
      qrPNG: qrResponse.data.png, // Assuming the PNG file URL is returned
    });

    // Create token
    const token = jwt.sign({ email: newUser.email }, process.env.SECRET);

    res.status(201).json({
      error: false,
      data: token,
      message: "Successfully signed up.",
    });
  } catch (error) {
    // console.error("Error during signup:", error);

    // Handle specific error cases
    if (error.response) {
      // Error from QR code API
      return res
        .status(500)
        .json({ error: true, message: "Failed to create QR code." });
    } else {
      // General database or other error
      return res
        .status(500)
        .json({ error: true, message: "Unable to sign up." });
    }
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // console.log("Req.Body", req.body);
  if (!email || !password) {
    return res.status(422).json({
      error: true,
      data: null,
      message: "Email and Password are required fields!",
    });
  }

  db.User.findOne({ where: { email } })
    .then((foundUser) => {
      // console.log("foundUser Data", foundUser);
      if (!foundUser) {
        return res.status(401).json({
          error: true,
          data: null,
          message: "User not found.",
        });
      }

      return bcrypt.compare(password, foundUser.password).then((result) => {
        if (!result) {
          return res.status(401).json({
            error: true,
            data: null,
            message: "Invalid Email or Password.",
          });
        }

        // Create token
        const token = jwt.sign({ id: foundUser.id }, process.env.SECRET, {
          expiresIn: "7d",
        });

        // Remove password from output
        foundUser.password = undefined;

        res.status(200).json({
          error: false,
          data: { token, user: foundUser }, // Ensure user object is included
          message: null,
        });
      });
    })
    .catch((error) => {
      // console.error("Error during login:", error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    });
});

module.exports = router;
