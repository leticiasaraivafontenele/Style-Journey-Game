import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface LevelCompletedAttributes {
  id: number;
  idUser: number;
  level: number;
  userSolution: string;
}

interface LevelCompletedCreationAttributes extends Optional<LevelCompletedAttributes, 'id'> {}

export interface LevelCompletedInstance
  extends Model<LevelCompletedAttributes, LevelCompletedCreationAttributes>,
    LevelCompletedAttributes {}

const createLevelCompletedModel = (sequelize: Sequelize) => {
  const LevelCompleted = sequelize.define<LevelCompletedInstance>('LevelCompleted', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userSolution: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  return LevelCompleted;
};

export default createLevelCompletedModel;
