const { Router } = require("express");
const { User } = require("../db.js");
const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await User.findOrCreate({
      where: { email: email.toLowerCase() },
      defaults: {
        name: name,
        email: email.toLowerCase(),
        password: password,
      },
    });
    res.status(200).send("successfully created");
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email: email, password: password },
    });

    let u = {};
    (u.username = user.dataValues.name),
      (u.token = user.dataValues.id),
      (u.email = user.dataValues.email),
      res.status(201).send(u);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
