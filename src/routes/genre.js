const { Router } = require("express");
const { Genre, movie_genre } = require("../db.js");
const router = Router();
const { validateRegister } = require("./functions/functionValidate");

router.post("/", async (req, res) => {
  const { image, name, token } = req.body;

  let validate = await validateRegister(token);

  if (validate === true) {
    try {
      if (image && name) {
        await Genre.findOrCreate({
          where: { name: name.toLowerCase() },
          defaults: {
            image: image,
            name: name,
          },
        });
        res.status(200).send("successfully created");
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
  const { token } = req.body;
  let validate = await validateRegister(token);

  if (validate === true) {
    try {
      const genres = await Genre.findAll();
      res.status(201).send(genres);
    } catch (err) {
      res.status(401).send(err.message);
    }
  } else {
    res.status(202).send("try register");
  }
});

router.delete("/", async (req, res) => {
  const { name, token } = req.body;

  let validate = await validateRegister(token);

  if (validate === true) {
    try {
      if (name) {
        await Genre.destroy({ where: { name: name.toLowerCase() } });
        res.status(201).send("successfully removed");
      } else {
        res.status(400).send("add name to delete");
      }
    } catch (err) {
      res.status(404).send(err.message);
    }
  } else {
    res.status(202).send("try register");
  }
});

router.put("/", async (req, res) => {
  const { id, name, image, token } = req.body;

  let validate = await validateRegister(token);

  if (validate === true) {
    try {
      await Genre.update(
        { name: name, image: image },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(201).send("successfully updated");
    } catch (err) {
      res.status(404).send(err.message);
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
      const genre = await Genre.findByPk(id);
      res.status(201).send(genre);
    } catch (err) {
      res.status(404).send(err.message);
    }
  } else {
    res.status(202).send("try register");
  }
});
module.exports = router;
