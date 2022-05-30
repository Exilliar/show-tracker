"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8080; // default port to listen
const Pool = pg_1.default.Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "showtracker",
    password: process.env.POSTGRES_PASS,
    port: 5432,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("This is something different");
});
app.get("/shows", (req, res) => {
    Promise.all([
        new Promise((resolve, reject) => pool.query("SELECT * FROM show ORDER BY id ASC", (error, results) => resolve(results.rows))),
        new Promise((resolve, reject) => pool.query("SELECT * FROM headers", (error, results) => resolve(results.rows))),
    ]).then((results) => {
        const resObj = {
            headers: results[1].map((r) => r.header),
            shows: results[0],
        };
        res.send(resObj);
    });
});
app.delete("/shows/:showid", (req, res) => {
    const id = +req.params.showid;
    if (isNaN(id))
        res.sendStatus(400);
    else {
        pool.query(`DELETE FROM show WHERE id=${id}`, (error, results) => {
            if (!error)
                res.send({ id });
            else {
                console.error(error);
                res.sendStatus(500);
            }
        });
    }
});
// add a new show
app.post("/shows", (req, res) => {
    const body = req.body;
    const query = `
    INSERT INTO show (title, watchevery, catchup, watched, uptodate, totaleps, datestarted)
    VALUES ('${body.title}', ${body.watchEvery}, ${body.catchUp}, ${body.watched}, ${body.upToDate}, ${body.totalEps}, '${body.dateStarted}')
  `;
    pool.query(query, (error, response) => {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        }
        else {
            res.send(response.rows);
        }
    });
});
// update a show
app.patch("/shows/:showid", (req, res) => {
    const id = +req.params.showid;
    if (isNaN(id))
        res.sendStatus(400);
    else {
        const body = req.body;
        if (body.watched) {
            pool.query(`
        UPDATE show
        SET watched=${body.watched}
        WHERE id=${id}
      `, (error, response) => {
                if (error) {
                    console.error(error);
                    res.sendStatus(500);
                }
                else {
                    res.send({ id });
                }
            });
        }
        else {
            res.sendStatus(400);
        }
    }
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map