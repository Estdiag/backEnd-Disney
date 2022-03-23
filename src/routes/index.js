const { Router } = require("express");

const characterRouter = require("./character");
const genreRouter = require("./genre.js");
const movieRouter = require("./movie.js");
const userRouter = require("./user.js");

const router = Router();

router.use("/characters", characterRouter);
router.use("/genres", genreRouter);
router.use("/movies", movieRouter);
router.use("/auth", userRouter);

module.exports = router;
