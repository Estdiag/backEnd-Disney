const { Router } = require("express");
const { Character, Movie, Genre } = require("../db.js");
const router = Router();

router.post("/", async (req, res) => {
  const { image, name, age, width, history, movies } = req.body;
  try {
    let newCharacter = await Character.create({
      image,
      name,
      age,
      width,
      history,
    });
    movies.forEach(async (m) => {
      let movie = await Movie.findAll({
        where: {
          title: m.title,
        },
      });

      if (movie.length == 0) {
        let newMovie = newCharacter.setMovies(
          await Movie.create({
            title: m.title,
            image: m.image,
            creationDate: m.creationDate,
            qualification: m.qualification,
          })
        );
        console.log(newMovie);
      } else {
        newCharacter.setMovies(movie);
      }
    });

    // movies.forEach((m) => {
    //   m.genres.forEach(async (g) => {
    //     let genre = await Genre.findAll({
    //       where: {
    //         name: g.name,
    //       },
    //     });
    //     if (genre.length == 0) {
    //       m.createGenre(
    //         await Genre.create({
    //           name: g.name,
    //           image: g.image,
    //         })
    //       );
    //     } else {
    //       m.createGenre(genre);
    //     }
    //   });
    // });

    res.status(201).send("creado correctamente");
  } catch (err) {
    res.status(404).send(`No se pudo guardar la info, ${err}`);
  }
});
module.exports = router;
