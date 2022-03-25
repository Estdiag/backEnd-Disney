const { Router } = require("express");
const { Movie, Genre, Character, Op } = require("../db.js");
const router = Router();
const { validateRegister } = require("./functions/functionValidate");
const { filterMovie } = require("./functions/functionFilter");

router.post("/", async (req, res) => {
  const { title, image, creationDate, qualification, genres, token } = req.body;

  let validate = await validateRegister(token);

  if (validate === true) {
    try {
      if (title && image && creationDate && qualification && genres) {
        const movie = await Movie.findOrCreate({
          where: { title: title.toLowerCase() },
          defaults: {
            title: title,
            image: image,
            creationDate: creationDate,
            qualification: qualification,
          },
        });
        genres.forEach(async (g) => {
          let genre = await Genre.findOrCreate({
            where: {
              name: g.name.toLowerCase(),
            },
            defaults: { name: g.name, image: g.image },
          });

          await movie[0].setGenres(genre[0]);
        });
        res.send("successfully created");
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

router.get("/", async (req, res) => {
  const { title, genre, order } = req.query;
  const { token } = req.body;
  const condition = filterMovie(title);
  let validate = await validateRegister(token);
  condition.include = {
    model: Genre,
    attributes: ["id", "name"],
    through: {
      attributes: [],
    },
  };

  if (validate === true) {
    try {
      if (order) {
        condition.order = [["creationDate", order]];
      }
      let movies = await Movie.findAll(condition);
      let movie = [];
      movies?.map((m) =>
        movie.push({
          image: m.image,
          title: m.title,
          creationDate: m.creationDate,
          genres: m.Genres.map((id) => `${id.id}`),
        })
      );
      if (genre) {
        let m = movie.filter((e) => e.genres.includes(genre));
        res.status(200).send(m);
      } else {
        res.status(200).send(movie);
      }
    } catch (err) {
      res.status(401).send(err);
    }
  } else {
    res.status(202).send("try register");
  }
});

router.put("/", async (req, res) => {
  const { id, title, image, creationDate, qualification, token } = req.body;

  let validate = await validateRegister(token);

  if (validate === true) {
    try {
      await Movie.update(
        {
          title: title || title,
          image: image || image,
          creationDate: creationDate || creationDate,
          qualification: qualification || qualification,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(201).send("successfully edited");
    } catch (err) {
      res.status(404).send(err);
    }
  } else {
    res.status(202).send("try register");
  }
});

router.get("/:id", async (req, res) => {
  const { token } = req.body;
  const { id } = req.params;
  let validate = await validateRegister(token);

  if (validate === true) {
    try {
      let movie = await Movie.findByPk(id, {
        include: {
          model: Character,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      res.send(movie);
    } catch (err) {
      res.status(404).send(err);
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
      await Movie.destroy({
        where: { id: id },
      });
      res.status(201).send("successfully removed");
    } catch (err) {
      res.status(404).send(err);
    }
  } else {
    res.status(202).send("try register");
  }
});

module.exports = router;
