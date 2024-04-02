const express = require("express");
const router = express.Router();
const db = require("../models");
// const cloudinary = require("../config/cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = require("../config/multer");
// const path = require("path");

// const multer = require("../config/multer");

// const cloudinary = require("cloudinary").v2;
// require("dotenv").config();
// const upload = require("./multer-config");
// multer-config.js

// const multer = require("multer");
// const storage = multer.memoryStorage(); // store image in memory
// const upload = multer({ storage: storage });

// const multerUploads = multer({ storage }).single("image");
// module.exports = upload;

// Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

router.post("/create2", (req, res) => {
  db.Agreement.create(req.body).then((newAgreement) => {
    res.json(newAgreement);
  });
});

router.post("/create", (req, res) => {
  // console.log("req.body :", req.body);
  console.log("req.file : ", req.file);
  db.Agreement.create(req.body).then((newAgreement) => {
    res.json(newAgreement);
  });
});

// Express route for image upload
// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "folder_name",
//     });
//     console.log(result);
//     // Send the Cloudinary URL in the response
//     res.json({ imageUrl: result.secure_url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error uploading image to Cloudinary" });
//   }
// });

// const image = "../images/0605.jpeg";
router.post("/uploadTest", upload.single("signature"), (req, res) => {
  try {
    // FIXME: cloudinary.uploader.(upload) TODO:Cannot read properties of undefined (reading upload)
    cloudinary.uploader.upload(req.file.path);
    console.log("Hit");
    res.status(200).json({
      message: `Image uploaded successfully!`,
      data: req.file.path,
    });
  } catch (err) {
    return res.status(500).json({ err });
    console.error(err);
  }
});

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.sendStatus(400); // If there's no image, respond with bad request error

  try {
    // Base 64 encode the file to create a data URI for the uploader
    const base64EncodedImage = Buffer.from(req.file.buffer).toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64EncodedImage}`;
    // Use the cloudinary uploader to upload the image
    const response = cloudinary.uploader.upload(dataUri);
    // const thePic = cloudinary.uploader.upload(req.file.path);

    // Return the public_id (or whatever else you want)
    // const createA = db.Agreement.create(req.body).then((newAgreement) => {
    //   res.json(newAgreement);
    // });
    // console.log("Response:", thePic);
    // console.log(req.file);
    // console.log("uri", dataUri);

    return res.status(201).json({ publicId: response.public_id });
    // .then((dat) => console.log(dat));
  } catch (err) {
    return res.status(500).json({ err });
    console.error(error);
  }
});

router.post("/test", upload.single("image"), async (req, res) => {
  try {
    const thePic = await cloudinary.uploader.upload(req.file.path);
    console.log(thePic.secure_url);
    // const theBase = await db.Agreement.create({
    //   email: req.body.email,
    //   date: req.body.date,
    //   image: `${thePic.secure_url}`,
    // });
    // res.json({ theBase });
    console.log("Hit");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/view", (req, res) => {
  db.Agreement.findAll().then((allAgreements) => {
    res.send(allAgreements);
    console.log(allAgreements);
  });
});

router.get("/agreed/:id", (req, res) => {
  db.Agreement.findOne({
    where: {
      id: req.params.id,
    },
  }).then((foundAgreement) => {
    console.log(foundAgreement);
    res.send(foundAgreement);
    // res.render("single-thing", {
    //   id: foundThing.id,
    //   // email: foundThing.email,
    //   // date: foundThing.date,
    // });
  });
});

module.exports = router;
