const { Movie, Genre, Movie_genre } = require("../../db");

const putDeleteGenre = async (idMovie, idGenre) => {
  try {
    const movie = await Movie_genre.findOne({
      where: { GenreId: idGenre, MovieId: idMovie },
    });
    if (typeof movie.dataValues.id === "number") {
      let id = movie.dataValues.id;
      await Movie_genre.destroy({
        where: { id: id },
      });
      return "successfully deleted";
    } else null;
  } catch (err) {
    return "the relationship you are trying to delete does not exist";
  }
};
const putAddGenre = async (idMovie, name) => {
  try {
    const movie = await Movie.findByPk(idMovie);

    const genre = await Genre.findOne({
      where: { name: name.toLowerCase() },
    });
    if (movie && genre) {
      await movie.setGenres(genre);
      return "successfully added movie";
    }
    if (!movie) {
      return "movie does not exist";
    }
    if (!genre) {
      return "genre does not exist";
    } else {
      null;
    }
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  putDeleteGenre,
  putAddGenre,
};
