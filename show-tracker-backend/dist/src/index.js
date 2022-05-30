"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8080; // default port to listen
app.use((0, cors_1.default)());
app.set('etag', false);
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("This is something different");
});
app.get("/shows", (req, res) => {
    const resObj = {
        headers: [
            "Title",
            "Started",
            "Watch every",
            "To watch",
            "Eps watched",
            "Total eps",
            "Up to date?",
        ],
        shows: [
            {
                id: 0,
                title: "some title",
                watchEvery: 7,
                catchUp: 0,
                watched: 2,
                upToDate: true,
                totalEps: 25,
                started: "2022-01-02T00:00:00.000Z",
            },
            {
                id: 1,
                title: "some different title",
                watchEvery: 7,
                catchUp: 0,
                watched: 2,
                upToDate: false,
                totalEps: 25,
                started: "2022-01-02T00:00:00.000Z",
            },
        ]
    };
    res.send(resObj);
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map