const router = require("express").Router();
const snippetrController = require("../controllers/snippetrController");
const loginValidation = require("../validation/user");

router.get("/", loginValidation, snippetrController.listAllSnippets);
router.delete("/:id", loginValidation, snippetrController.deleteSnippet);
router.put("/update/:id", loginValidation, snippetrController.updateSnippet);

router.put("/like", loginValidation, snippetrController.likeSnippet);
router.put("/unlike", loginValidation, snippetrController.unlikeSnippet);

router.post("/create", loginValidation, snippetrController.createSnippet);
router.get(
  "/userSnippets/:id",
  loginValidation,
  snippetrController.userSnippets
);
router.get("/:id", loginValidation, snippetrController.listOneSnippet);

module.exports = router;
