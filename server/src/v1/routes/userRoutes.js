const express = require("express");
const { checkToken } = require("../../auth/validation");

const userController = require("../../controllers/userController");

const router = express.Router();

router.get("/:userId/recipes", checkToken, userController.getUserRecipes);
router.post("/", userController.createUser);
router.post("/login", userController.login);

module.exports = router;