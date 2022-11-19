const Router = require("express");
const router = new Router();
const countresController = require("../controllers/countresController");

router.post("/", countresController.create);
router.get("/", countresController.getAll);

module.exports = router;
