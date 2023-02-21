const { v4: uuid } = require("uuid");
const Recipe = require("../models/Recipe");

const serviceMethods = {};

serviceMethods.getAllRecipes = async ( query ) => {
    const allRecipes = await Recipe.getAllRecipes(query);
    return allRecipes
}

serviceMethods.getRecipesByUser = async ( body ) => {
    const allRecipes = await Recipe.getAllRecipes();
    return allRecipes;
}

serviceMethods.deleteRecipe = async( recipeToDelete ) => {
    try {
        const removeRecipe = await Recipe.deleteRecipe(recipeToDelete);
        if(removeRecipe.affectedRows){
            return removeRecipe;
        } else {
            const error = new Error("Recipe unavailable for delete action.");
            error.status = 404;
            throw error
        }
    } catch (err) {
        throw err;
    }   
}

module.exports = serviceMethods;