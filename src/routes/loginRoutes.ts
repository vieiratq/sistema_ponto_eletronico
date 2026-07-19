const express = require("express");
const router = express.Router();
const db = require("./dataBaseRoutes.ts");
const validaLogin = require("../functions/validaLogin.js");
const path = require("path");

router.get("/login", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../public/pages/login/login.html"));
});

module.exports = router;