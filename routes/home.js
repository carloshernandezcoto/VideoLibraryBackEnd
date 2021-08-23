const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello there, this is the vidly backend!");
});

module.exports = router;
