const { DataTypes, Model } = require("sequelize");

class Character extends Model {}
const initCharacter = (sequelize) => {
  Character.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          let value1 = value.toLowerCase();
          this.setDataValue("name", value1);
        },
      },
      age: {
        type: DataTypes.STRING,
      },
      history: {
        type: DataTypes.TEXT,
      },
      width: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Character",
      tableName: "Characters",
    }
  );
};
module.exports = initCharacter;
