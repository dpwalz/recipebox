const DatabaseConnection = require("../config/database");
const connection = DatabaseConnection.getDatabaseInstance();

const modelMethods = {};

modelMethods.getAllRecipes = (query) => {
    return new Promise(async(resolve, reject) => {
        try{
            const user_id = query.user_id || "%";
            const results = await connection.query(
              `SELECT * FROM RECIPES WHERE (user_id LIKE ? OR ?)`,  
            [user_id, user_id === "%"]
              );
            return resolve(results);
        } catch (err) {
            return reject(err);
        }
    });

}

modelMethods.deleteRecipe = (recipe_id, user_id) => {
  return new Promise( async(resolve, reject) => {
    try {
      const results = await connection.query(
        `DELETE FROM RECIPES WHERE recipe_id = ? AND user_id = ?`,
        [recipe_id, user_id]
      );
      return resolve(results);
    } catch (err) {
      return reject(err);
    }
  })
}

module.exports = modelMethods;