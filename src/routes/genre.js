const { Router } = require("express");
const { Genre } = require("../db.js");
const router = Router();

router.post("/", async (req, res) => {
  const { image, name } = req.body;

  try {
    await Genre.findOrCreate({
      where: { name: name.toLowerCase() },
      defaults: {
        image: image,
        name: name,
      },
    });
    res.status(200).send("created");
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(201).send(genres);
  } catch (err) {
    res.status(401).send(err);
  }
});
router.delete("/", async (req, res) => {
  const { name } = req.body;

  try {
    await Genre.destroy({ where: { name: name.toLowerCase() } });
    res.status(201).send("deleted");
  } catch (err) {
    res.status(404).send(err);
  }
});
router.put("/", async (req, res) => {
  const { id, name, image } = req.body;
  try {
    await Genre.update(
      { name: name, image: image },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(201).send("update success");
  } catch (err) {
    res.status(404).send(err);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findByPk(id);
    res.status(201).send(genre);
  } catch (err) {
    res.status(404).send(err);
  }
});
module.exports = router;
