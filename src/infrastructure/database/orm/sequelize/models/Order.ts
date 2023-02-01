import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IOrderAttributes {
  id: string;
  userId: string;
  productIds: string[];
  date: Date;
  isPaid: boolean;
  meta: JSON;
}

interface IOrderCreationAttributes extends Optional<IOrderAttributes, 'id'> {}

class Order
  extends Model<IOrderAttributes, IOrderCreationAttributes>
  implements IOrderAttributes
{
  public id!: string;
  public userId!: string;
  public productIds!: string[];
  public date!: Date;
  public isPaid!: boolean;
  public meta!: JSON;
  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

function initOrderModel(sequelize: Sequelize) {
  Order.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      productIds: {
        type: DataTypes.JSON,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true
        }
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          max: 1,
          min: 0
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
      modelName: 'Order', // We need to choose the model name
      tableName: 'orders',
      timestamps: true
    }
  );
}

export { Order, initOrderModel };
