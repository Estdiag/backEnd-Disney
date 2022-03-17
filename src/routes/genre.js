const { Router } = require("express");
const { Genre } = require("../db.js");
const router = Router();

router.post("/", async (req, res) => {
  const { image, name } = req.body;
  try {
    let newGenre = await Genre.findOrCreate({
      image,
      name,
    });
    res.status(200).send("creado");
  } catch (err) {
    res.status(404).send(`No se pudo guardar la info, ${err}`);
  }
});
module.exports = router;
