const recipeService = require("../services/recipeService");

const controllerMethods = {}

controllerMethods.getAllRecipes = async (req, res) => {
    const {query} = req;
    const allRecipes = await recipeService.getAllRecipes(query);
    res.status(200).send({ status: "OK", data: allRecipes })
}

controllerMethods.deleteRecipe = async (req, res) => {
    try {
        const { recipe_id } = req.params;
        const recipeToDelete = {
        recipe_id: recipe_id,
        user_id: req.userId
        }
        const removeRecipe = await recipeService.deleteRecipe(recipeToDelete);
        res.status(200).send({ status: "OK", data: removeRecipe });
    } catch (err) {
        res.status(err?.status || 500).send({status: "FAILED", data: { error: err?.message || err }})
    }
}

// Spoonacular API Controller Methods
controllerMethods.spoonacularSearchRecipes = async(req, res) => {
    try {
        const { search_term } = req.params;
        const searchResults = await recipeService.spoonacularSearchRecipes(search_term);
        res.status(200).send({ status: "OK", data: searchResults});
    } catch (err) {
        res.status(err?.status || 500).send({status: "FAILED", data: {error: err?.message || err}});
    }
}

controllerMethods.spoonacularRecipeDetails = async(req, res) => {
    try {
        const { recipe_id } = req.params;
        const recipeDetails = await recipeService.spoonacularRecipeDetails(recipe_id);
        const ingredients = recipeDetails.extendedIngredients.map((item) => item.original)
        const recipe_details = {
            summary: recipeDetails.summary,
            id: recipeDetails.id,
            title: recipeDetails.title,
            image: recipeDetails.image,
            servings: recipeDetails.servings,
            readyInMinutes: recipeDetails.readyInMinutes,
            extendedIngredients: ingredients
        }
        res.status(200).send({ status: "OK", data: recipe_details });
    } catch (err) {
        res.status(err?.status || 500).send({ status: "FAILED", data: { error: err?.message || err }});
    }
}

controllerMethods.spoonacularSaveRecipe = async(req, res) => {
    try {
        const recipePackage = {
            user_id: req.userId,
            recipe_id: req.params.recipe_id
        };
        const saveRecipe = await recipeService.spoonacularSaveRecipe(recipePackage);
        res.status(200).send({ status: "OK", data: saveRecipe });
    } catch (err) {
        res.status(err?.status || 500).send({ status: "FAILED", data: { error: err?.message || err }});
    }
}

module.exports = controllerMethods;