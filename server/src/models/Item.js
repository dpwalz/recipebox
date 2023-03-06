const DatabaseConnection = require("../config/database");
const connection = DatabaseConnection.getDatabaseInstance();

const modelMethods = {};

modelMethods.getAllItems = () => {
    return new Promise(async (resolve, reject) => {
        try{
            const results = await connection.query(
                `SELECT * FROM INGREDIENTS`
            );
            return resolve(results);
        } catch (err) {
            return reject(err); 
        }
    });
};

modelMethods.addNewItem = ( body ) => {
    return new Promise(async (resolve, reject) => {
        try{
            const { id, name } =  body;
            const insert = await connection.query(
                `INSERT INTO INGREDIENTS(ingredient_id, ingredient_name) VALUES (?, ?)`,
                [id, name]
            );
            const results = await connection.query(
                `SELECT * FROM INGREDIENTS WHERE ingredient_id = ?`, 
                [id]
            );
            return resolve(results[0]);
        } catch (err) {
            return reject(err);
        } 
    });
}

modelMethods.getItemName = ( id ) => {
    return new Promise(async (resolve, reject) => {
        try {
            const item_name = await connection.query(
                `SELECT ingredient_name FROM INGREDIENTS WHERE ingredient_id = ?`,
                [id]
            );
            return resolve(item_name[0]);
        } catch (err) {
            return reject(err);
        }
    })
    
}

module.exports = modelMethods;