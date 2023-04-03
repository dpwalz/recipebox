const { v4: uuid } = require("uuid");
const Recipe = require("../models/Recipe");
const RecipeIngredient = require("../models/RecipeIngredient");
const { addNewItem } = require("../services/itemService");
const { combineUnits, conversionAvailable } = require("../config/helper");

const serviceMethods = {};

serviceMethods.getAllRecipes = async ( query ) => {
    const allRecipes = await Recipe.getAllRecipes(query);
    return allRecipes
}

serviceMethods.getRecipesByUser = async ( body ) => {
    const allRecipes = await Recipe.getAllRecipes();
    return allRecipes;
}

serviceMethods.addNewRecipe = async ( body ) => {
    const newRecipe = await Recipe.addNewRecipe(body);
    return newRecipe;
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

serviceMethods.spoonacularSaveRecipe = async( body ) => {
    try {
        const { recipe_id, user_id } = body;
        const apiResponse = await serviceMethods.spoonacularRecipeDetails( recipe_id );
        const id = uuid();
        const recipeToAdd = {
            recipe_id: id,
            user_id: user_id,
            recipe_name: apiResponse.title
        };
        const newRecipe = await serviceMethods.addNewRecipe(recipeToAdd);
        
        for(let i = 0; i < apiResponse.extendedIngredients.length;i++){
            const {nameClean, unit} = apiResponse.extendedIngredients[i];
            if(nameClean && unit !== "servings"){
                const newItem = await addNewItem({name: nameClean});
                const ingredientPayload = {
                    recipe_id: id,
                    ingredient_id: newItem.ingredient_id,
                    quantity: apiResponse.extendedIngredients[i].amount,
                    unit: apiResponse.extendedIngredients[i].measures.us.unitShort.toLowerCase(),
                }
                const addItemToRecipe = await serviceMethods.addRecipeIngredient(ingredientPayload);
            }
        }
        return newRecipe;
    } catch (err) {
        throw err;
    }    
}

serviceMethods.addRecipeIngredient = async(newIngredient) => {
    try {
        const existingItems = await serviceMethods.getRecipeIngredientById(newIngredient);
        let itemDetails;
        if(existingItems.length > 0){
            for(let i = 0; i < existingItems.length; i++){
                let canCombine = await conversionAvailable(newIngredient.unit, existingItems[i].unit);
                if(canCombine){
                    itemDetails = await combineUnits(newIngredient, existingItems[i]);
                    const itemToUpdate = {
                        ...itemDetails,
                        ri_id: existingItems[i].ri_id,
                    }   
                    const updateItem = await serviceMethods.updateRecipeIngredient(itemToUpdate);
                    return updateItem;
                }
            }
        } 
        const insertItem = await RecipeIngredient.addNewIngredient(newIngredient);
        return insertItem; 
    } catch (err) {
        throw err;
    }
}

serviceMethods.getRecipeIngredientById = async(ingredient) => {
    try {
        const { recipe_id, ingredient_id } = ingredient;
        const getItem = await RecipeIngredient.getRecipeIngredientById(recipe_id, ingredient_id);
        return getItem;
    } catch (err) {
        return err;
    }
}

serviceMethods.updateRecipeIngredient = async(ingredientDetails) => {
    try {
        const updateRI = await RecipeIngredient.updateRecipeIngredient(ingredientDetails);
        return updateRI;
    } catch (error) {
        return err;
    }
}

module.exports = serviceMethods;