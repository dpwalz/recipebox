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

module.exports = controllerMethods;