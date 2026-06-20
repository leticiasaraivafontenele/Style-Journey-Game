import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface LevelCompletedAttributes {
  id: number;
  idUser: number;
  level: number;
  userSolution: string;
  quality: number | null;
  evaluation: string | null;
}

interface LevelCompletedCreationAttributes
  extends Optional<LevelCompletedAttributes, 'id' | 'quality' | 'evaluation'> {}

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
    },
    quality: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 3
      }
    },
    evaluation: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  });

  return LevelCompleted;
};

export default createLevelCompletedModel;
