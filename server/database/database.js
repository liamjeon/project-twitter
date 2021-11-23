import MongoDb from "mongodb";

const url = 'mongodb+srv://twitter:5ZVNTSBMWEIN1Tlk@cluster0.rqae8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

export async function connectDB() {
  return MongoDb.MongoClient.connect(url) //mongodb연결
    .then((client) => client.db()); //연결이되면, 연결된 client를 받아서 클라이언트에 있는 db 자체를 리턴함.
    //promise가 리턴됨
}

