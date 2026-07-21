const express = require("express");
const router = express.Router();
const db = require("./dataBaseRoutes.ts");
const validaLogin = require("../functions/validaLogin.js");
const path = require("path");
const saltRounds = process.env.SALTROUNDS;
const bcrypt = require("bcrypt");
import type { Request, Response } from "express";
router.get("/login", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/pages/login/login.html"));
});

router.post("/login", async (req: Request, res: Response) => {
  console.log(req.body)
  const { cnpj, password } = req.body;
  const passHash = bcrypt.hashSync(password, saltRounds);
  
});

module.exports = router;