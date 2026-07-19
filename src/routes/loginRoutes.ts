const express = require("express");
const router = express.Router();
const db = require("./dataBaseRoutes.ts");
const validaLogin = require("../functions/validaLogin.js");
const path = require("path");
import type { Request, Response } from "express";

router.get("/login", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/pages/login/login.html"));
});

router.post("/login", async (req: Request, res: Response) => {
  const { cnpj, password } = req.body;
  db.query("SELECT email FROM users WHERE cnpj = $1 ", [cnpj, password], (err: Error, result:unknown) => {
  if(err){
    console.log(err); 
    return res.json({message: "Email ou senha incorreta."});  
  }
  })
});

module.exports = router;