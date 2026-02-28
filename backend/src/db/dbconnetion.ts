import { Sequelize, ModelStatic } from "sequelize";
import createUserModel, { UserInstance } from "../model/userModel.js";
import { databaseConfig } from "../config/database.js";

let User: ModelStatic<UserInstance> | null = null;
let sequelize: Sequelize | null = null;

export const dbConnection = async(): Promise<void> => {
  sequelize = new Sequelize(
    databaseConfig.database,
    databaseConfig.username,
    databaseConfig.password,
    {
      host: databaseConfig.host,
      port: databaseConfig.port,
      dialect: databaseConfig.dialect,
      logging: databaseConfig.dialect === "postgres" ? false : console.log,
    }
  );

  try {
    await sequelize.authenticate();
    console.log('Database connection authenticated successfully.');
    
    User = await createUserModel(sequelize);
    
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

export const getSequelizeInstance = (): Sequelize => {
  if (!sequelize) {
    throw new Error("Database not initialized. Call dbConnection() first.");
  }
  return sequelize;
};

export { User };
