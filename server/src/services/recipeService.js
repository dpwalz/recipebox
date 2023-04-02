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

serviceMethods.getRecipeIngredients = async( recipe_id ) => {
    try {
        const getRecipe = await Recipe.getRecipeIngredients(recipe_id);
        if(getRecipe.length){
            return getRecipe;
        } else {
            const error = new Error("Could not find ingredients for this recipe");
            error.status = 404;
            throw error;
        }
    } catch (err) {
        throw err;
    }
}

const spoonacular_headers = {
    "x-api-key": process.env.S_API_KEY,   
    "Content-Type": "application/json",
}
// Spoonacular API Service Methods
serviceMethods.spoonacularSearchRecipes = async( search_term ) => {
    try {
        const response = await fetch(`${process.env.S_API_URL}recipes/complexSearch?query=${search_term}`, {
            method: "GET",
            headers: spoonacular_headers,
          });
          const results = await response.json();
          return results;
    } catch (err) {
        throw err;
    }
}

serviceMethods.spoonacularRecipeDetails = async( recipe_id ) => {
    try {
        const response = await fetch(`${process.env.S_API_URL}recipes/${recipe_id}/information`, {
            method: "GET",
            headers: spoonacular_headers,
          });
        const results = await response.json();
        return results; 
    } catch (err) {
        throw err;
    }
}

// serviceMethods.spoonacularSaveRecipe = async( recipe_id ) => {
//     const response = await 
// }

module.exports = serviceMethods;