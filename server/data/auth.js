import { db } from "../db/database.js";

export async function findByUsername(username) {
  return db
    .execute("SELECT * FROM users WHERE username=?", [username]) //
    .then((result) => result[0][0]);
}

export async function findById(id) {
  return db
    .execute("SELECT * FROM users WHERE id=?", [id]) //
    .then((result) => result[0][0]);
}

//입력받은 유저정보 + 고유한아이다(id)를 만들어서 데이터를 넣고, id를 리턴함-->token생성용
export async function createUser(user) {
  const { username, password, name, email, url } = user; //오브젝트 디 컨스트럭션?
  return db
    .execute(
      "INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)",
      [username, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}
