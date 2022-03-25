const { Router } = require("express");
const { Character, Movie, Genre } = require("../db.js");
const router = Router();
const { filter } = require("./functions/functionFilter");
const { validateRegister } = require("./functions/functionValidate");

router.get("/", async (req, res) => {
  const { name, age, width, movie } = req.query;
  const { token } = req.body;

  let validate = await validateRegister(token);

  if (validate === true) {
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
        let c = character.filter((e) => e.movies.includes(movie));

        res.send(c);
      } catch (err) {
        res.send(err.message);
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
        res.status(404).send(err.message);
      }
    }
  } else {
    res.send("try register");
  }
});

router.post("/", async (req, res) => {
  const { image, name, age, width, history, movies } = req.body;
  const { token } = req.body;

  let validate = await validateRegister(token);

  if (validate === true) {
    try {
      if (image && name && age && width && history && movies) {
        let newCharacter = await Character.findOrCreate({
          where: { name: name?.toLowerCase() },
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
              title: m.title?.toLowerCase(),
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
                name: g.name?.toLowerCase(),
              },
              defaults: { name: g.name, image: g.image },
            });

            await movie[0].setGenres(genre[0]);
          });
        });

        res.status(201).send("successfully created");
      } else {
        res.send("add all params required");
      }
    } catch (err) {
      res.status(404).send(err.message);
    }
  } else {
    res.status(202).send("try register");
  }
});

router.put("/", async (req, res) => {
  const { id, image, name, age, width, history, token } = req.body;

  let validate = await validateRegister(token);

  if (validate === true) {
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
      return res.status(201).send("successfully updated");
    } catch (err) {
      return res.status(404).send(err.message);
    }
  } else {
    res.status(202).send("try register");
  }
});

router.delete("/", async (req, res) => {
  const { token, id } = req.body;
  let validate = await validateRegister(token);

  if (validate === true) {
    try {
      await Character.destroy({
        where: { id: id },
      });
      res.status(201).send("successfully deleted");
    } catch (err) {
      res.status(401).send(err.message);
    }
  } else {
    res.status(202).send("try register");
  }
});

router.get("/:id", async (req, res) => {
  const { token } = req.body;
  let validate = await validateRegister(token);

  if (validate === true) {
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
      res.status(401).send(err.message);
    }
  } else {
    res.status(202).send("try register");
  }
});

module.exports = router;
