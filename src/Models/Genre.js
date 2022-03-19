const { Sequelize, DataTypes, Model } = require("sequelize");

class Genre extends Model {}
const initGenre = (sequelize) => {
  Genre.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        set(value) {
          let value1 = value.toLowerCase();
          this.setDataValue("name", value1);
        },
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
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
