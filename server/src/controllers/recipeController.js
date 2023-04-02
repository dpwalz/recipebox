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
        res.status(200).send({ status: "OK", data: searchResults });
    } catch (err) {
        res.status(err?.status || 500).send({status: "FAILED", data: {error: err?.message || err}});
    }
}

controllerMethods.spoonacularRecipeDetails = async(req, res) => {
    try {
        const { recipe_id } = req.params;
        const recipeDetails = await recipeService.spoonacularRecipeDetails(recipe_id);
        res.status(200).send({ status: "OK", data: recipeDetails });
    } catch (err) {
        res.status(err?.status || 500).send({status: "FAILED", data: {error: err?.message || err}})
    }
}

module.exports = controllerMethods;