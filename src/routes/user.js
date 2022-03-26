const { Router } = require("express");
const { User } = require("../db.js");
const router = Router();
const { sendEmail } = require("./functions/sendEmail");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (name && email && password) {
      await User.findOrCreate({
        where: { email: email.toLowerCase() },
        defaults: {
          name: name,
          email: email.toLowerCase(),
          password: password,
        },
      });
      const user = await User.findOne({
        where: { email: email, password: password },
      });
      token = user.dataValues.id;
      sendEmail(email, name, token);
      res.status(200).send("successfully created");
    } else {
      res.send("add all params required");
    }
  } catch (err) {
    res.status(404).send(err.message);
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
    res.status(404).send(err.message);
  }
});

module.exports = router;
