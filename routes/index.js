const Router = require("express");
const router = new Router();
const filmRouter = require("./filmRouter");
const userRouter = require("./userRouter");
const genreRouter = require("./genreRouter");
const countresRouter = require("./countresRouter");
const reviewRouter = require("./reviewRouter");

router.use("/user", userRouter);
router.use("/genre", genreRouter);
router.use("/countres", countresRouter);
router.use("/film", filmRouter);
router.use("/review", reviewRouter);

module.exports = router;
