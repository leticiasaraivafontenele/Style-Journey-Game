import { Sequelize, ModelStatic } from "sequelize";
import createUserModel, { UserInstance } from "../model/userModel.js";

let User: ModelStatic<UserInstance> | null = null;

export const dbConnection = async(database: string, username: string, password: string): Promise<void> => {
  const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres'
  });

  try {
    await sequelize.authenticate();
    User = await createUserModel(sequelize);
    await sequelize.sync({alter: true});
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { User };
