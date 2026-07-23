const express = require("express");
const router = express.Router();
const db = require("./dataBaseRoutes.ts");
const validaLogin = require("../functions/validaLogin.js");
import type { Request, Response } from "express";

router.get("/api/empresa-logada", validaLogin, (req: Request, res: Response) => {
    const empresaId = req.session.empresa?.id;

    if (!empresaId) {
        return res.status(401).json({ success: false, message: "Empresa nao logada." });
    }

    db.query(
        "SELECT id, nome, cnpj, email FROM empresas WHERE id = $1",
        [empresaId],
        (err: any, result: any) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: "Erro ao carregar empresa." });
            }

            const empresa = result.rows[0];

            if (!empresa) {
                return res.json({ success: false, message: "Empresa nao encontrada." });
            }

            return res.json({
                success: true,
                id: empresa.id,
                nome: empresa.nome,
                cnpj: empresa.cnpj,
                email: empresa.email,
            });
        }
    );
});

module.exports = router;
