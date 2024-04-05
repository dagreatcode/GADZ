// const express = require("express");
// const router = express.Router();
// const cloudinary = require("cloudinary").v2;
// require("dotenv").config();

// // const { config, uploader } = require("cloudinary");
// // const cloudinaryConfig = () =>
// //   config({
// //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //     api_key: process.env.CLOUDINARY_API_KEY,
// //     api_secret: process.env.CLOUDINARY_API_SECRET,
// //   });
// // module.exports = router;

// // export { cloudinaryConfig, uploader };

// utils/cloudinaryConfig.js
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };

// // router.post("/upload", cloudinaryConfig(), (req, res) => {
// //   let image = req.files.image; // the image that was uploaded to Cloudnary
// //   console.log(image);
// //   if (!image) {
// //     return res.status(400).json({ message: "Image is required" });
// //   } else {
// //     // The image has been successfully stored in Cloudnary and we can now store it's URL in our database
// //     // We will send back a JSON object with the secure_url of the saved image so that it can be displayed on the client side
// //     // We will also add some additional data to this object such as who uploaded the image and when
// //     const url = image.secure_url; // secure HTTPS url
// //     const publicId = image.public_id; // The public ID that represents the image on Cloudnary
// //     const userID = req.user._id; // The User ID of the person who uploaded the image

// //     // Create a new Image document in MongoDB with the info from Cloudnary
// //     const newImage = new Image({
// //       url,
// //       publicId,
// //       user: userID,
// //       createdAt: Date.now()
// //     })
// //     // Save the new Image document to the DB
// //     newImage.save((err, savedImage) => {
// //       if (err) {
// //         console.log("Error saving image to db");
// //         return res.status(500).send(err);
// //       }
// //       // Return the saved Image document to the client
// //       return res.status(201).json(savedImage);
// //     });
// //   }
// // })
// // // Get all images for the homepage
// // router.get('/', authMiddleware.isLoggedIn, function(req,res){
// //   Image.find({},function(err,images){
// //     if(err) throw err;
// //     res.render('index',{
// //       title:'Home',
// //       images:images
// //     });
// //   });
// // });

// // module.exports= router;
