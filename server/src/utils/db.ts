import {Sequelize} from "sequelize";

export const sequelize = new Sequelize("todoapp", "postgres", "fayezfawaz", {
  host: "localhost",
  dialect: "postgres",
});
