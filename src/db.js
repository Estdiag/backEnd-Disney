require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// const modelCharacter = require("./Models/Character");
// const modelMovie = require("./Models/Movie");
// const modelGenre = require("./Models/Genre");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/disney`,
  {
    logging: false,
    native: false,
    dialect: "postgres",
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/Models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/Models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Character, Genre, Movie } = sequelize.models;

Character.belongsToMany(Movie, { through: "movie-character" });
Movie.belongsToMany(Character, { through: "movie-character" });

Genre.hasMany(Movie);
Movie.belongsTo(Genre);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op,
};
