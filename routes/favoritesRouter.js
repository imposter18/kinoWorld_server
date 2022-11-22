const Router = require("express");
const router = new Router();
const favoritesController = require("../controllers/favoritesController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", favoritesController.create);
router.get("/", favoritesController.getAll);
router.delete("/", favoritesController.deleteOne);

module.exports = router;
