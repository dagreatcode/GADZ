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

// FIXME: This works TODO: Delete this once not
// // API endpoints for QR code creation and viewing
// router.post("/api/qr-create", async (req, res) => {
//   const data = req.body;
//   try {
//     const response = await axios.post(
//       "https://hovercode.com/api/v2/hovercode/create/",
//       data,
//       {
//         headers: {
//           Authorization: `Token ${process.env.API_KEY_QR}`,
//         },
//         timeout: 10000,
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error posting QR:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.get("/api/qr-view", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://hovercode.com/api/v2/workspace/82140683-32bd-4422-9ff9-7ecec248c952/hovercodes/",
//       {
//         headers: {
//           Authorization: `Token ${process.env.API_KEY_QR}`,
//         },
//         timeout: 10000,
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching QR codes:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = hovercode;
