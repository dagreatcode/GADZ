// const express = require("express");
// const router = express.Router();

// const multer = require("multer");
// const storage = multer.memoryStorage();
// const multerUploads = multer({ storage }).single("image");
// module.exports = router;
// // export { multerUploads };

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    // cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: "images/" });

module.exports = upload;

// module.exports = multer;
