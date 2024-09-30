const axios = require("axios");
// const express = require("express");
// const router = express.Router();
require("dotenv").config();

router.post("/qr-create", async (req, res) => {
  console.log(req.body);
  const data = {
    workspace: "82140683-32bd-4422-9ff9-7ecec248c952",
    qr_data: "https://twitter.com/hovercodeHQ",
    primary_color: "#3b81f6",
    background_color: "#FFFFFF",
    dynamic: true,
    display_name: "QR code for Twitter",
    frame: "circle-viewfinder",
    pattern: "Diamonds",
    has_border: true,
    logo_url: "https://hovercode.com/static/website/images/logo.png",
    generate_png: true,
  };

  axios
    .post("https://hovercode.com/api/v2/hovercode/create/", data, {
      headers: {
        Authorization: "Token 89e69c1ca220f79caacf708ad120eedfd2795f41",
      },
      timeout: 10000,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});
module.exports = hovercode;
