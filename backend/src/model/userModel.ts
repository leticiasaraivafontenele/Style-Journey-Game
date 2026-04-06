import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  refreshToken: string | null;
  avatarId: number;
  level: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'refreshToken' | 'avatarId' | 'level'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const createUserModel = (sequelize: Sequelize) => {
  const User = sequelize.define<UserInstance>('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    avatarId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 8
      }
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  })

  return User;
}

export default createUserModel;
