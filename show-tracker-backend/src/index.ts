interface Show extends ShowAdd {
  id: number;
}

interface ShowAdd extends ShowPatch {
  title: string;
  watchEvery: number; // days between when an episode needs to be watched, eg, weekly=7, daily=1
  catchUp: number; // the number of days behind/ahead
  upToDate: boolean;
  totalEps: number;
  dateStarted: string;
}

interface ShowPatch {
  watched: number;
}

interface DBHeader {
  header: string;
}

interface ShowRes {
  headers: string[];
  shows: Show[];
}

import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 8080; // default port to listen

const Pool = pg.Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "showTracker",
  password: process.env.POSTGRES_PASS,
  port: 5432,
});

app.use(cors());
app.use(express.json());

// define a route handler for the default home page
app.get("/", (req: any, res: any) => {
  res.send("This is something different");
});

app.get("/shows", (req: express.Request, res: express.Response) => {
  Promise.all([
    new Promise<Show[]>((resolve, reject) =>
      pool.query("SELECT * FROM show ORDER BY id ASC", (error, results) =>
        resolve(results.rows)
      )
    ),
    new Promise<DBHeader[]>((resolve, reject) =>
      pool.query("SELECT * FROM headers", (error, results) =>
        resolve(results.rows)
      )
    ),
  ]).then((results) => {
    const resObj: ShowRes = {
      headers: results[1].map((r) => r.header),
      shows: results[0],
    };
    res.send(resObj);
  });
});

app.delete("/shows/:showid", (req: express.Request, res: express.Response) => {
  const id = +req.params.showid;
  if (isNaN(id)) res.sendStatus(400);
  else {
    pool.query(`DELETE FROM show WHERE id=${id}`, (error, results) => {
      if (!error) res.send({ id });
      else {
        console.error(error);
        res.sendStatus(500);
      }
    });
  }
});

// add a new show
app.post("/shows", (req: express.Request, res: express.Response) => {
  const body: ShowAdd = req.body;
  const query = `
    INSERT INTO show (title, watchevery, catchup, watched, uptodate, totaleps, datestarted)
    VALUES ('${body.title}', ${body.watchEvery}, ${body.catchUp}, ${body.watched}, ${body.upToDate}, ${body.totalEps}, '${body.dateStarted}')
  `;
  pool.query(query, (error, response) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.send(response.rows);
    }
  });
});

// update a show
app.patch("/shows/:showid", (req: express.Request, res: express.Response) => {
  const id = +req.params.showid;
  if (isNaN(id)) res.sendStatus(400);
  else {
    const body: ShowPatch = req.body;
    if (body.watched) {
      pool.query(
        `
        UPDATE show
        SET watched=${body.watched}
        WHERE id=${id}
      `,
        (error, response) => {
          if (error) {
            console.error(error);
            res.sendStatus(500);
          } else {
            res.send({ id });
          }
        }
      );
    } else {
      res.sendStatus(400);
    }
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
