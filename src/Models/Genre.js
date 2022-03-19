const { Sequelize, DataTypes, Model } = require("sequelize");

class Genre extends Model {}
const initGenre = (sequelize) => {
  Genre.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,

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
      timestamps: false,
    }
  );
};
module.exports = initGenre;
