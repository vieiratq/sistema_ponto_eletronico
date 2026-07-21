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
  const { cnpj, password } = req.body;
  const passHash = bcrypt.hashSync(password, saltRounds);
  db.query("SELECT email,password,nome,usuarios FROM empresas WHERE cnpj = $1 ", [cnpj], (err: Error, result: any) => {
    if (err) {
      console.log(err);
      return res.json({ message: "erro ao conectar ao banco de dados" });
    }
    const user = result.rows[0];
    if (user.password == passHash) {
      req.session.user = user;
      req.session.empresa = user.nome;

    }
  })
});

module.exports = router;
export { };