import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "twitter",
  password: "roejddl1",
}); //mysql 관리하는 애


export const db = pool.promise(); 
