const { Sequelize, DataTypes, Model } = require("sequelize");

class Genre extends Model {}
const initGenre = (sequelize) => {
  Genre.init(
    {
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Genre",
      tableName: "Genres",
    }
  );
};
module.exports = initGenre;
