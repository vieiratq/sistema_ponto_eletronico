require("dotenv").config();
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./routes/dataBaseRoutes");
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));
app.use(express.json());
app.use(session({
    store: new pgSession({
        tableName: "sessions",
        createTableIfMissing: true,
        pool: db
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.get("/", (req: any, res: any) => {
    res.sendFile("./pages/login/login.html", { root: publicPath });
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
export { };
