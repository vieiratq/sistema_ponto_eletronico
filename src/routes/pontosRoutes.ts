const express = require("express");
const router = express.Router();
const db = require("./dataBaseRoutes.ts");
import type { Request, Response } from "express";


router.post("/api/registro-ponto", (req:Request, res:Response) =>{
    res.json({ message: "Registro feito com sucesso!"})
})

module.exports = router
