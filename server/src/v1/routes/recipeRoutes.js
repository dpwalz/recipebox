const express = require("express");
const { checkUserId } = require("../../auth/validation");

const recipeController = require("../../controllers/recipeController");

const router = express.Router();

router.get("/", recipeController.getAllRecipes);

router.get("/complexSearch/:search_term", recipeController.spoonacularSearchRecipes);

router.get("/:recipe_id/information", recipeController.spoonacularRecipeDetails);

router.delete("/:recipe_id", checkUserId, recipeController.deleteRecipe);

module.exports = router;