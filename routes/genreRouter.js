const Router = require("express");
const router = new Router();
const genreController = require("../controllers/genreController");
const checkRole = require("../middleware/checkRoleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", checkRole("ADMIN"), genreController.create);
router.get("/", authMiddleware, genreController.getAll);

module.exports = router;
