const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const QRCode = require("qrcode");
const db = require("../models");

// ⚙️ Configure multer for profile image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/profile_images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 🧠 Update user info
router.put("/update/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await db.User.findByPk(userId);

    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 🧩 Prepare update data
    const updateData = { ...req.body };

    // ✅ Handle new password if provided
    if (updateData.newPassword) {
      const hashedPassword = await bcrypt.hash(updateData.newPassword, 10);
      updateData.password = hashedPassword;
      delete updateData.newPassword;
    }

    // ✅ Handle uploaded profile image
    if (req.file) {
      // Remove old image if exists
      if (existingUser.profileImage && fs.existsSync(path.join(__dirname, "../uploads/profile_images", existingUser.profileImage))) {
        fs.unlinkSync(path.join(__dirname, "../uploads/profile_images", existingUser.profileImage));
      }

      updateData.profileImage = req.file.filename;
    }

    // ✅ Determine if QR code needs to be updated
    const shouldRegenerateQR =
      updateData.username ||
      updateData.email ||
      updateData.companyName ||
      !existingUser.qrCode;

    if (shouldRegenerateQR) {
      const qrData = `User: ${updateData.username || existingUser.username}\nEmail: ${
        updateData.email || existingUser.email
      }\nCompany: ${updateData.companyName || existingUser.companyName}`;
      const qrImagePath = path.join(__dirname, "../uploads/qrcodes", `${userId}-qrcode.png`);

      // Ensure folder exists
      const qrDir = path.dirname(qrImagePath);
      if (!fs.existsSync(qrDir)) {
        fs.mkdirSync(qrDir, { recursive: true });
      }

      // Generate and save QR code
      await QRCode.toFile(qrImagePath, qrData);
      updateData.qrCode = `${userId}-qrcode.png`;
    }

    // ✅ Perform the update
    await db.User.update(updateData, { where: { id: userId } });

    // ✅ Fetch and return the updated user
    const updatedUser = await db.User.findByPk(userId);

    // ✅ Clean sensitive fields
    const safeUser = { ...updatedUser.get(), password: undefined };

    return res.status(200).json({
      success: true,
      message: "✅ User updated successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
