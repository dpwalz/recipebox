const express = require("express");
const { checkToken, checkUserId } = require("../../auth/validation");
const listController = require("../../controllers/listController");

const router = express.Router();

router.post("/", checkUserId, listController.createList);

router.get("/", checkToken, listController.getListsByUser );

router.get("/:list_id", listController.getListDetailsById);

router.post("/:list_id", listController.addIngredient);

router.post("/:list_id/recipe/:recipe_id", listController.addRecipe);

router.delete("/:list_id/ingredient/:ingredient_id", listController.removeIngredient);

router.delete("/", listController.deleteList);

module.exports = router;