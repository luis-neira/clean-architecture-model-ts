import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface IProductAttributes {
  id: number;
  name: string;
  description: string;
  images: JSON;
  price: number;
  color: string;
  meta: JSON;
}

interface IProductCreationAttributes
  extends Optional<IProductAttributes, 'id'> {}

class Product
  extends Model<IProductAttributes, IProductCreationAttributes>
  implements IProductAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public images!: JSON;
    public price!: number;
    public color!: string;
    public meta!: JSON;
    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

function initProductModel(sequelize: Sequelize) {
  Product.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 31]
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 160]
        }
      },
      images: {
        type: DataTypes.JSON,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 20]
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
      modelName: 'Product', // We need to choose the model name
      tableName: 'products',
      timestamps: true
    }
  );
}

export { Product, initProductModel };
