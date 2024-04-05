const express = require("express");
const router = express.Router();
const db = require("../models");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = require("../config/multer");

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

// // const image = "../images/0605.jpeg";
// router.post("/uploadTest", upload.single("signature"), async (req, res) => {
//   try {
//     const up = await cloudinary.uploader.upload(req.file.path);
//     console.log("cloud location", up.secure_url);
//     const down = await db.Agreement.create({
//       email: req.body.email,
//       date: req.body.date,
//       description: req.body.description,
//       numberMC: req.body.numberMC,
//       freightRate: req.body.freightRate,
//       invoiceRate: req.body.invoiceRate,
//       company: req.body.company,
//       signature: up.secure_url,
//     });
//     console.log("Good Data", down);
//     // console.log(cloudinary.uploader.upload(req.file.path).api_secret);
//     // const b64 = Buffer.from(req.file.buffer).toString("base64");
//     // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//     // const cldRes = await handleUpload(dataURI);
//     // console.log(dataUri);
//     // res.json(cldRes);
//     res.status(200).json({
//       message: `Image uploaded successfully!`,
//       data: {
//         path: req.file.path,
//         filename: req.file.filename,
//         fieldname: req.file.fieldname,
//         originalname: req.file.originalname,
//         mimetype: req.file.mimetype,
//         destination: req.file.destination,
//         size: req.file.size,
//       },
//     });
//     // res.json({ down });
//   } catch (err) {
//     return res.status(500).json({ err });
//     console.error(err);
//   }
// });

router.post("/need2work", upload.single("signature"), async (req, res) => {
  try {
    const data = await req.body.data;
    const signature = await req.body.signature;
    // console.log("req.data:", data);
    // console.log("req.signature:", signature);
    if (!data || !signature) throw new Error("Missing required fields.");
    const up = await cloudinary.uploader.upload(signature);
    console.log(up);
    const down = await db.Agreement.create({
      email: data.email,
      date: data.date,
      description: data.description,
      numberMC: data.numberMC,
      freightRate: data.freightRate,
      invoiceRate: data.invoiceRate,
      company: data.company,
      signature: up.secure_url,
    });
    res.status(200).json({
      message: `Image uploaded successfully!`,
      data: req.file,
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
