const { Sequelize, DataTypes, Model } = require("sequelize");

class Movie extends Model {}
const initMovie = (sequelize) => {
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          let value1 = value.toLowerCase();
          this.setDataValue("title", value1);
        },
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      creationDate: {
        type: DataTypes.DATEONLY,
      },
      qualification: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      },
    },
    {
      sequelize,
      modelName: "Movie",
      tableName: "Movies",
      timestamps: false,
    }
  );
};

module.exports = initMovie;
