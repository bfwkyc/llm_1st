// [파일 1] routes/health.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
