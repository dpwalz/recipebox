const DatabaseConnection = require("../config/database");
const connection = DatabaseConnection.getDatabaseInstance();
const { v4: uuid } = require("uuid");

const modelMethods = {}

modelMethods.addNewIngredient = (ingredientDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {recipe_id, ingredient_id, quantity, unit} = ingredientDetails;
            const results = await connection.query(
                `INSERT INTO RECIPE_INGREDIENTS (ri_id, recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?, ?)`,
                [uuid(), recipe_id, ingredient_id, quantity, unit]
            );
            return resolve(results);
        } catch (error) {
            return reject(error)
        }
    });
}

modelMethods.updateRecipeIngredient = (ingredientDetails) => {
    return new Promise( async(resolve, reject) => {
        try {
            const { 
                ri_id, 
                quantity, 
                unit } = ingredientDetails;
            const updateRecipeIngredient = await connection.query(
                `UPDATE RECIPE_INGREDIENTS SET quantity = ?, unit = ? WHERE ri_id = ?`,
                [quantity, unit, ri_id]
            );
            return resolve(updateRecipeIngredient);
        } catch (err) {
            return reject(err);
        }
    })
}

modelMethods.getRecipeIngredientById = (recipe_id, ingredient_id) => {
    return new Promise( async(resolve, reject) => {
        try {
            const results = await connection.query(
                `SELECT * FROM RECIPE_INGREDIENTS WHERE recipe_id = ? AND ingredient_id = ?`,
                [recipe_id, ingredient_id]
            );
            return resolve(results);
        } catch (error) {
            return reject(error);
        }
    })
}

module.exports = modelMethods;