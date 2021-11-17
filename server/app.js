import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import tweetsRouter from "./router/tweets.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use(
  cors({
    origin: ["http://localhost/3000"], //해당하는 도메인에서만 데이터 접근 가능!
    optionsSuccessStatus: 200,
    credentials: true, //Access-Control-Allow-Credentials:true 와 동일
  })
);

app.use((req, res, next)=>{
    res.sendStatus(404);
})

app.use((req,res,next)=>{
    console.error(error);
    res.sendStatus(500);
})
app.listen(8080);
