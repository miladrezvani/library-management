const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/sequelize");
class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    PublicationINFO: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Author: {
      type: DataTypes.STRING,
    },
    InventoryStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Book",
  }
);

module.exports = Book;
