import MongoDb from "mongodb";

const url =
  "mongodb+srv://twitter:5ZVNTSBMWEIN1Tlk@cluster0.rqae8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let db; //client에게서 받은 db를 database 안에서만 사용할 수 있는 변수
export async function connectDB() {
  return MongoDb.MongoClient.connect(url) //mongodb연결
    .then((client) => {
      db = client.db(); //연결이되면, 연결된 client를 받아서 클라이언트에 있는 db 자체를 리턴함.//promise가 리턴됨
    });
}

//사용자에 대한 collection 전달
export function getUsers() {
  return db.collection("users");  
}


//트윗에 대한 collection 전달
export function getTweets() {
  return db.collection("tweets");
}
