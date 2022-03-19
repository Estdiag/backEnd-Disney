const { Router } = require("express");
const { Character, Movie, Genre } = require("../db.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let characters = await Character.findAll();
    let character = [];
    characters?.map((c) =>
      character.push({
        image: c.image,
        name: c.name,
      })
    );
    res.status(200).send(character);
  } catch (err) {
    res.status(404).send("este es el error", err);
  }
});
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
          creationDate: m.creationDate,
        },
      });

      if (movie.length == 0) {
        let newMovie = await Movie.create({
          title: m.title,
          image: m.image,
          creationDate: m.creationDate,
          qualification: m.qualification,
        });

        await newCharacter.setMovies(newMovie);

        m.genres.forEach(async (g) => {
          let genre = await Genre.findOrCreate({
            where: {
              name: g.name,
            },
            defaults: { name: g.name, image: g.image },
          });

          await newMovie.setGenre(genre[0]);
        });
      } else {
        await newCharacter.setMovies(movie);
      }
    });

    res.status(201).send("creado correctamente");
  } catch (err) {
    res.status(404).send(`No se pudo guardar la info, ${err}`);
  }
});

module.exports = router;
