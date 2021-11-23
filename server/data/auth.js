import { getUsers } from "../database/database.js";
import MongoDb from "mongodb";

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username })
    .then(mapOptionalUser);
}

const ObjectId = MongoDb.ObjectId;
export async function findById(id) {
  return getUsers()
    .findOne({ _id: new ObjectId(id) }) //mongodb의 _id는 obejctId형식이기 때문에 Objectid로 싸서 찾아줘야함
    .then((data) => {
      return mapOptionalUser(data);
    });
}

//입력받은 유저정보 + 고유한아이다(id)를 만들어서 데이터를 넣고, id를 리턴함-->token생성용
export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
}

function mapOptionalUser(user){ //null이 될수도 있는 user
  return user ? {...user, id:user._id.toString()} : user;
}