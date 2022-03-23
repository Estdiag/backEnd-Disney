const { Router } = require("express");
const { Character, Movie, Genre } = require("../db.js");
const router = Router();
const { filter } = require("./functionFilter.js");

router.get("/", async (req, res) => {
  const { name, age, width, movie } = req.query;
  const condition = filter(name, age, width, movie);
  condition.include = {
    model: Movie,
    attributes: ["id"],
    through: {
      attributes: [],
    },
  };

  if (movie) {
    let characters = await Character.findAll({
      include: {
        model: Movie,
        attributes: ["id"],
        through: {
          attributes: [],
        },
      },
    });
    let character = [];
    characters?.map((c) =>
      character.push({
        image: c.image,
        name: c.name,
        movies: c.Movies.map((id) => `${id.id}`),
      })
    );
    try {
      let c = character.filter((e) => e.movies.includes(movie.toLowerCase()));

      res.send(c);
    } catch (err) {
      res.send(err);
    }
  } else {
    try {
      let characters = await Character.findAll(condition);
      let character = [];
      characters?.map((c) =>
        character.push({
          image: c.image,
          name: c.name,
        })
      );
      res.json(character.length ? character : "nothing found");
    } catch (err) {
      res.status(404).send(err);
    }
  }
});

router.post("/", async (req, res) => {
  const { image, name, age, width, history, movies } = req.body;
  try {
    let newCharacter = await Character.findOrCreate({
      where: { name: name.toLowerCase() },
      defaults: {
        image,
        name,
        age,
        width,
        history,
      },
    });

    movies.forEach(async (m) => {
      let movie = await Movie.findOrCreate({
        where: {
          title: m.title.toLowerCase(),
          creationDate: m.creationDate,
        },
        defaults: {
          title: m.title,
          image: m.image,
          creationDate: m.creationDate,
          qualification: m.qualification,
        },
      });

      await newCharacter[0].setMovies(movie[0]);

      m.genres.forEach(async (g) => {
        let genre = await Genre.findOrCreate({
          where: {
            name: g.name.toLowerCase(),
          },
          defaults: { name: g.name, image: g.image },
        });

        await movie[0].setGenres(genre[0]);
      });
    });

    res.status(201).send("successfully created");
  } catch (err) {
    res.status(404).send(err);
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
    res.status(201).send("successfully updated");
  } catch (err) {
    res.status(404).send(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    await Character.destroy({
      where: { id: req.body.id },
    });
    res.status(201).send("successfully deleted");
  } catch (err) {
    res.status(401).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const character = await Character.findByPk(id, {
      include: {
        model: Movie,
        attributes: ["title"],
        through: {
          attributes: [],
        },
      },
    });
    res.status(201).send(character);
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = router;
