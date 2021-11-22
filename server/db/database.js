import mysql from "mysql2";
import SQ from 'sequelize';

export const sequelize = new SQ.Sequelize("twitter", "root", "roejddl1", {
  host: "localhost",
  dialect: 'mysql',
});

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "twitter",
  password: "roejddl1",
}); //mysql 관리하는 애


export const db = pool.promise(); 
