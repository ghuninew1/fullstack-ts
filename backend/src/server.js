import express from "express";
import { createServer } from "node:https";
import fs from "node:fs";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import createError from "./utils/createError.js";
import corsOptions from "./utils/corsOptions.js";
import {
    rootRoute,
    authRoute,
    comRoute,
    deadlineRoute,
    userRoute,
} from "./routes/index.js";
import wsServer from "./utils/ws/index.js";

const app = express();
app.disable("x-powered-by");

// view engine setup
app.set("views", "./public");
app.set("view engine", "html");
app.set("trust proxy", true);

// middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// logger
app.use(morgan("dev"));

app.use((req, res, next) => {
    res.setHeader("X-Powered-By", "GhuniNew");
    next();
});

// Routes
app.use("/", rootRoute, authRoute, comRoute, deadlineRoute, userRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    const error = createError(err.status, err.message);
    res.status(error.status).json({
        status: error.status || 500,
        message: error.message,
    });
    next();
});

// server
const server = createServer({
        key: fs.readFileSync("../misc/privkey.pem"),
        cert: fs.readFileSync("../misc/fullchain.pem"),
    }, app
);

function onListening() {
    console.log(`Listening on https://gnew.bigbrain-studio.com:6441`);
}

server.listen(process.env.PORT || 6441);
server.on("listening", onListening);

wsServer(server);

export default server;
