import {DataTypes} from 'sequelize';

const createUserModel = (sequelize) => {
  const User = sequelize.define('User', {
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
    }
  }, )

  return User;
}

export default createUserModel;