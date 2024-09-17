// server.js
const express = require("express");
const twilio = require("twilio");
require("dotenv").config();
const router = express.Router();

const accountSid = "your_account_sid";
const authToken = "your_auth_token";
const client = twilio(accountSid, authToken);

router.post("/token", (req, res) => {
  const identity = "user_identity";
  const token = new twilio.jwt.AccessToken(
    accountSid,
    "your_api_key",
    "your_api_secret"
  );
  token.identity = identity;

  const voiceGrant = new twilio.jwt.AccessToken.VoiceGrant({
    outgoingApplicationSid: "your_twiml_app_sid",
    incomingAllow: true,
  });

  token.addGrant(voiceGrant);
  res.send({ token: token.toJwt() });
});

module.exports = router;
