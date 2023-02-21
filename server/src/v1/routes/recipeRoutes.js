const express = require("express");
const { checkUserId } = require("../../auth/validation");

const recipeController = require("../../controllers/recipeController");

const router = express.Router();

router.get("/", recipeController.getAllRecipes);

router.delete("/:recipe_id", checkUserId, recipeController.deleteRecipe);

module.exports = router;