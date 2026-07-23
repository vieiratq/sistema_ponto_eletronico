const router = require("express").Router();
const db = require("./dataBaseRoutes");
const validaLogin = require("../functions/validaLogin.js");

router.get("/api/registro-ponto", (req:Request, res:Response) =>{
    console.log(req.body);
})
