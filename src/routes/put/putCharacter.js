const { Movie, Character, Movie_character } = require("../../db");

const putDeleteMovie = async (idCharacter, idMovie) => {
  try {
    const character = await Movie_character.findOne({
      where: { CharacterId: idCharacter, MovieId: idMovie },
    });
    if (typeof character.dataValues.id === "number") {
      let id = character.dataValues.id;
      await Movie_character.destroy({
        where: { id: id },
      });
      return "successfully deleted";
    } else null;
  } catch (err) {
    return "the relationship you are trying to delete does not exist";
  }
};
const putAddMovie = async (idCharacter, title) => {
  try {
    const character = await Character.findByPk(idCharacter);

    const movie = await Movie.findOne({
      where: { title: title.toLowerCase() },
    });
    if (character && movie) {
      await character.setMovies(movie);
      return "successfully added movie";
    }
    if (!character) {
      return "character does not exist";
    }
    if (!movie) {
      return "movie does not exist";
    } else {
      null;
    }
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  putDeleteMovie,
  putAddMovie,
};
