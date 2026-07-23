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
  db.query("SELECT nome,cnpj,password,id,email FROM empresas WHERE cnpj = $1", [cnpj], async (err: any, result: any) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "login invalido!" });
    }
    const empresa = result.rows[0];
    const senhaValida = await bcrypt.compare(password, empresa.password);

    if (empresa == undefined) {
      return res.json({ success: false, message: "login invalido!" });
    }
    if (!(senhaValida)) {
      return res.json({ success: false, message: "login invalido!" });
    }
    req.session.logado = true;
    req.session.empresa = {
      id: empresa.id,
      email: empresa.email,
      cnpj: empresa.cnpj,
      nome: empresa.nome
    }
    return res.json({ success: true, message: "logado com sucesso!", nome: empresa.nome, cnpj: empresa.cnpj,  email: empresa.email, id: empresa.id });
  })


});

router.get("/dashboard", validaLogin, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/pages/dashboard/dash.html"));
});

router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/dashboard");
    }

    res.clearCookie("connect.sid");
    return res.redirect("/login");
  });
});

module.exports = router;
