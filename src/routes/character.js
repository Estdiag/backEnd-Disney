const { Router } = require("express");
const { Character, Movie, Genre } = require("../db.js");
const router = Router();

router.get("/", async (req, res) => {
  const { name, age, width } = req.query;
  if (name) {
    try {
      let characters = await Character.findAll({
        where: { name: { [Op.substring]: name.toLocaleLowerCase() } },
      });
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
  } else {
    let characters = await Character.findAll();
    let character = [];
    characters?.map((c) =>
      character.push({
        image: c.image,
        name: c.name,
      })
    );
    res.json(character.length ? character : "nothing found");
  }
});

router.post("/", async (req, res) => {
  const { image, name, age, width, history, movies } = req.body;
  try {
    let newCharacter = await Character.findOrCreate({
      where: { name: name.toLocaleLowerCase() },
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
          title: m.title.toLocaleLowerCase(),
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
            name: g.name.toLocaleLowerCase(),
          },
          defaults: { name: g.name, image: g.image },
        });

        await movie[0].setGenre(genre[0]);
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
