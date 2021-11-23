import { useVirtualId } from "../database/database.js";
import Mongoose from "mongoose";

//ODM인 Mongoose에서는 스키마를 사용할 수 있다.
const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema); //가상의 id 추가
const User = Mongoose.model("User", userSchema); //User collection과 schema를 연결해줌

export async function findByUsername(username) {
  const result = User.findOne({ username });
  console.log(result);
  return result;
}

export async function findById(id) {
  return User.findById({ id });
}

//입력받은 유저정보 + 고유한아이다(id)를 만들어서 데이터를 넣고, id를 리턴함-->token생성용
export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

function mapOptionalUser(user) {
  //null이 될수도 있는 user
  return user ? { ...user, id: user._id.toString() } : user;
}
