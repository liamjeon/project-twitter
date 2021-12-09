import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { initSocket } from "./connection/socket.js";
import { connectDB } from "./database/database.js";
import { config } from 'dotenv';

const app = express();

const corsOption = {
  credentials: true, //header에 Access_Controal-Allow-Credentials을 허락함
}

app.use(express.json());
app.use(cookieParser);
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    console.log("init");
    const server = app.listen(8080);
    initSocket(server);
  })
  .catch(console.error);
