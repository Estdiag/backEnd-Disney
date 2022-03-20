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
    let newCharacter = await Character.findOrCreate({
      where: { name: name },
      defaults: {
        image,
        name,
        age,
        width,
        history,
      },
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

        await newCharacter[0].setMovies(newMovie);

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
        await newCharacter.createMovie(movie[0]);
      }
    });

    res.status(201).send("creado correctamente");
  } catch (err) {
    res.status(404).send(`No se pudo guardar la info, ${err}`);
  }
});

router.put("/", async (req, res) => {
  const { id, image, name, age, width, history } = req.body;
  try {
    await Character.update(
      {
        name: name && name,
        image: image && image,
        age: age && age,
        width: width && width,
        history: history && history,
      },
      {
        where: { id: id },
      }
    );
    res.status(201).send("update success");
  } catch (err) {
    res.status(404).send(err);
  }
});

router.delete("/", async (req, res) => {
  await Character.destroy({
    where: { id: req.body.id },
  });
  res.status(201).send("delete success");
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findByPk(id, {
      include: {
        model: Movie,
        attributes: [
          "id",
          "title",
          "creationDate",
          "qualification",
          "GenreName",
        ],
      },
    });
    res.status(201).send(character);
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = router;
