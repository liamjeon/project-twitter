import Mongoose from "mongoose";

const url =
  "mongodb+srv://twitter:9uRPydSaahjBap8I@cluster0.rqae8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export async function connectDB() {
  return Mongoose.connect(url);
}

//_id<database> --> id<server>로 변환
export function useVirtualId(schema) {
  //id라는 가상아이디를 추가할건데, schema의 _id(obejctID) 값을 toString변환하여 반환.
  //collection에 들어가는 것은 아님.
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  //JSON으로 변환할 때 가상요소들도 포함될 수 있도록 함.
  schema.set("toJSON", { virtuals: true });
  schema.set("toOject", { virtuals: true }); //console.log에도 출력할 때 보고싶어서 Obejct에도 포함되도록 함
}

//TODO(Liam): Delete blow
let db; //client에게서 받은 db를 database 안에서만 사용할 수 있는 변수

//트윗에 대한 collection 전달
export function getTweets() {
  return db.collection("tweets");
}
