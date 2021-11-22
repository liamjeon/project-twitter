import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

//모델 정의
const Tweet = sequelize.define("tweet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
Tweet.belongsTo(User); //관계 정의. tweet은 user에 종속된다.

const INCLUDE_USER = {
  attributes: [
    "id",
    "text",
    "createdAt",
    "userId",
    [Sequelize.col("user.name"), "name"], //col안에있는 user.name을 가져오고 flat하게 데이터를 생성함
    [Sequelize.col("user.username"), "username"],
    [Sequelize.col("user.url"), "url"],
  ],
  include: {
    //User와 연결함
    model: User,
    attributes: [],
  },
};
const ORDER_DESC = {
  order: [["createdAt", "DESC"]], //정렬
};

export async function getAll() {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByUsername(username) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      //기존 .INCLUDE_USER의 include는 유지하면서 where 추가
      ...INCLUDE_USER.include,
      where: { username },
    },
  });
}

export async function getById(id) {
  return Tweet.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
}

export async function create(text, userId) {
  return Tweet.create({ text, userId }).then((data) =>
    this.getById(data.dataValues.id)
  );
}

export async function update(id, text) {
  //해당아이디에 대한 트윗과 사용자 정보까지 찾아와서
  return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
    tweet.text = text; //바로 전달 가능
    return tweet.save();
  });
}

export async function remove(id) {
  //해당아이디에 대한 트윗과 사용자 정보까지 찾아와서
  return Tweet.findByPk(id)
  .then((tweet)=>{
    tweet.destroy();
  })
}
