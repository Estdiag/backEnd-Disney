const { Router } = require("express");
const { Movie, Genre } = require("../db.js");
const router = Router();

router.post("/", async (req, res) => {
  const { title, image, creationDate, qualification, genres } = req.body;

  try {
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

      await movie[0].setGenre(genre[0]);
      res.status(201).send("successfully created");
    });
  } catch (err) {
    res.status(404).send(err);
  }
});
router.get("/", async (req, res) => {
  try {
    let movies = await Movie.findAll({
      include: { model: Genre, attributes: ["name"] },
    });
    res.status(201).send(movies);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.put("/", async (req, res) => {
  const { id, title, image, creationDate, qualification } = req.body;
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
});

router.delete("/", async (req, res) => {
  await Movie.destroy({
    where: { id: req.body.id },
  });
  res.status(201).send("successfully removed");
});

module.exports = router;
