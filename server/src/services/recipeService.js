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

serviceMethods.deleteRecipe = async( body ) => {
    try {
        const { recipe_id, user_id } = body
        const removeRecipe = await Recipe.deleteRecipe(recipe_id, user_id);
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