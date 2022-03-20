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
      res.status(201).send("created");
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
module.exports = router;
