const express = require("express");
const { checkToken } = require("../../auth/validation");

const recipeController = require("../../controllers/recipeController");

const router = express.Router();

router.get("/", recipeController.getAllRecipes);

router.delete("/:recipe_id", checkToken, recipeController.deleteRecipe);

module.exports = router;