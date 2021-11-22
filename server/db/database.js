import SQ from 'sequelize'; //sequelize에서 mysql를 import함

export const sequelize = new SQ.Sequelize("twitter", "root", "roejddl1", {
  host: "localhost",
  dialect: 'mysql', //default
});

