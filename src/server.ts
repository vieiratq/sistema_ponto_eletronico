import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

app.get("/", (_req, res) => {
  res.redirect("/pages/login/login.html");
});

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
