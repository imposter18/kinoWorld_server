const Router = require("express");
const router = new Router();
const countresController = require("../controllers/countresController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), countresController.create);
router.get("/", countresController.getAll);

module.exports = router;
