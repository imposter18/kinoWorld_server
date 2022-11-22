const Router = require("express");
const router = new Router();
const filmRouter = require("./filmRouter");
const userRouter = require("./userRouter");
const genreRouter = require("./genreRouter");
const countresRouter = require("./countresRouter");
const reviewRouter = require("./reviewRouter");
const favoritesRouter = require("./favoritesRouter");

router.use("/user", userRouter);
router.use("/genre", genreRouter);
router.use("/countres", countresRouter);
router.use("/film", filmRouter);
router.use("/review", reviewRouter);
router.use("/favorites", favoritesRouter);

module.exports = router;
