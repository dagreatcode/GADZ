const express = require("express");
const router = express.Router();
const db = require("../models");
const cloudinary = require("../config/cloudinary");
const upload = require("../config/multer");

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
  });
});

router.post("/create", (req, res) => {
  // console.log("req.body :", req.body);
  console.log("req.file : ", req.file);
  db.Agreement.create(req.body).then((newAgreement) => {
    res.json(newAgreement);
  });
});

router.post("/need2work", upload.single("signature"), async (req, res) => {
  if (!req.body) return res.sendStatus(400); // If there's no image, respond with bad request error
  try {
    const data = await req.body.data;
    const signature = await req.body.signature;
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
      cloudinary: up,
      database: down,
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
    return res.status(201).json({ publicId: response.public_id });
  } catch (err) {
    return res.status(500).json({ err });
    console.error(error);
  }
});

module.exports = router;
