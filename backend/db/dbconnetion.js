import { Sequelize } from "sequelize";

export const dbConnection = async(database, username, password) => {
  const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres'
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}