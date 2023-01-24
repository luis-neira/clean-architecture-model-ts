import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IUserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  meta: JSON;
}

interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {}

class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public meta!: JSON;
  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

function initUserModel(sequelize: Sequelize) {
  User.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 31]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      meta: {
        type: DataTypes.JSON,
        allowNull: false
      }
    },
    {
      // Other model options go here
      sequelize: sequelize, // We need to pass the connection instance
      modelName: 'User', // We need to choose the model name
      tableName: 'users',
      timestamps: true
    }
  );
}

export { User, initUserModel };
