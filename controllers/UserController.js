const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary");
const db = require("../models");

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword, ...rest } = req.body;

    const user = await db.User.findByPk(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Handle password change
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      rest.password = hashedPassword;
    }

    // Handle image upload if present
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "user_profiles",
          public_id: `user_${id}_${Date.now()}`,
          transformation: [{ width: 500, height: 500, crop: "fill" }],
        });
        rest.profileImage = result.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr);
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
          error: uploadErr.message,
        });
      }
    }

    await db.User.update(rest, { where: { id } });
    const updatedUser = await db.User.findByPk(id);
    return res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
