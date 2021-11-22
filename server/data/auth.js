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
  return User.findOne({ where: { username } });
}

export async function findById(id) {
  return User.findByPk(id);
}

//입력받은 유저정보 + 고유한아이다(id)를 만들어서 데이터를 넣고, id를 리턴함-->token생성용
export async function createUser(user) {
  return User.create(user).then((data)=> data.dataValues.id);
}
