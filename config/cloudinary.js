const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;

// Example usage of the Cloudinary module in an Express app
/*
app.post("/upload", uploader.single('image'), (req, res) => {
    if (!req.file) return res.send({
        status: false,
        message: 'No file uploaded'
      });
    
    console.log(JSON.stringify(req.file));
    // Returns information about the uploaded image e.g.:
    req.file = {
      fieldname: 'image',
      riginalName: 'Flower.jpg',
      name: 'FLWr12345678901234567890aweasdqw34567890z.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      size: 2269106,
      url: 'http://res.cloudinary.com/demo/image/upload/v1499390778/FLWr12345678901234567890aweasdqw34567890z
    }
    res.send({status: true})
});
*/
