const { Router } = require("express");

const characterRouter = require("./character");
// const categoriesRouter = require('./categories.js');
// const serviceRouter = require('./service.js');

const router = Router();

router.use("/api/character", characterRouter);
// router.use('/api/categories', categoriesRouter);
// router.use('/api/service', serviceRouter);

module.exports = router;
