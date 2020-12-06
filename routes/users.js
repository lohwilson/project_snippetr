const router = require("express").Router();
const userController = require("../controllers/userController");
const loginValidation = require("../validation/user");

router.get("/protected", userController.protected);
router.post("/signup", userController.createNewUser);
router.post("/login", userController.loginUser);
router.get("/:id", loginValidation, userController.getUser);

module.exports = router;
