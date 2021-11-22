import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import {initSocket} from './connection/socket.js'
// import {db} from './db/database.js'
import {sequelize} from './db/database.js'

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});


sequelize.sync().then(()=>{
  const server = app.listen(8080);
  initSocket(server);
  logging: false; //데이터베이스 실행에 대한 로그 안남김
});