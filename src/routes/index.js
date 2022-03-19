const { Router } = require("express");

const characterRouter = require("./character");
const genreRouter = require("./genre.js");
// const serviceRouter = require('./service.js');

const router = Router();

router.use("/api/character", characterRouter);
router.use("/api/genre", genreRouter);
// router.use('/api/service', serviceRouter);

module.exports = router;
