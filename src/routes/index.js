const { Router } = require("express");

const characterRouter = require("./character");
const genreRouter = require("./genre.js");
const movieRouter = require("./movie.js");

const router = Router();

router.use("/api/character", characterRouter);
router.use("/api/genre", genreRouter);
router.use("/api/movie", movieRouter);

module.exports = router;
