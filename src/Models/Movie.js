const { Sequelize, DataTypes, Model } = require("sequelize");

class Movie extends Model {}
const initMovie = (sequelize) => {
  Movie.init(
    {
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creationDate: {
        type: DataTypes.STRING,
      },
      qualification: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      },
    },
    {
      sequelize,
      modelName: "Movie",
      tableName: "Movies",
    }
  );
};

module.exports = initMovie;
