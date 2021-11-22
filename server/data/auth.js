import SQ from "sequelize";
import { db, sequelize } from "../db/database.js";
const DataTypes = SQ.DataTypes;

const User = sequelize.define(
  "user",
  {
    //define으로 연결,
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: DataTypes.TEXT, //
  },
  { timestamps: false } //기본 옵션인 createAt, updateAt을 생성하지 않도록함
);

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
