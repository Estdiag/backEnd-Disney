const { DataTypes, Model } = require("sequelize");

class Movie_genre extends Model {}
const initMovie_genre = (sequelize) => {
  Movie_genre.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Movie_genre",
      tableName: "Movie_genre",
      timestamps: false,
    }
  );
};
module.exports = initMovie_genre;
