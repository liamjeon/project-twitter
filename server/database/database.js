import Mongoose from 'mongoose';

const url =
  "mongodb+srv://twitter:5ZVNTSBMWEIN1Tlk@cluster0.rqae8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


export async function connectDB() {
  return Mongoose.connect(url);
}

//TODO(Liam): Delete blow
let db; //client에게서 받은 db를 database 안에서만 사용할 수 있는 변수


//사용자에 대한 collection 전달
export function getUsers() {
  return db.collection("users");  
}


//트윗에 대한 collection 전달
export function getTweets() {
  return db.collection("tweets");
}