// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     // console.log(file);
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//     // cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

// config/multer.js

const multer = require("multer");
const path = require("path");

// Configure where files are stored before upload to Cloudinary
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // Temporary storage folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Validate image uploads
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type. Only JPEG and PNG allowed."), false);
};

// Export configured multer middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
