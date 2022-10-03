import { Sequelize } from "sequelize";

const db = new Sequelize("marketplace_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
