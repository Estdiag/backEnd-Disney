const { DataTypes, Model } = require("sequelize");

class Movie_character extends Model {}
const initMovie_character = (sequelize) => {
  Movie_character.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Movie_character",
      tableName: "Movie_character",
      timestamps: false,
    }
  );
};
module.exports = initMovie_character;
