const DatabaseConnection = require("../config/database");
const connection = DatabaseConnection.getDatabaseInstance();

const modelMethods  = {};

modelMethods.createList = (query) => {
    return new Promise( async(resolve, reject) => {
        try {
            const user_id = query.user_id || null;
            const list_id = query.list_id;
            const results = await connection.query(
                `INSERT INTO SHOPPING_LIST(user_id, list_id)
                VALUES(?, ?)`,
                [user_id, list_id]
            );
            return resolve(results);
        } catch (err) {
            return reject(err);
        }
    });
}

modelMethods.getListByUser = (query) => {
    return new Promise( async(resolve, reject) => {
        try {
            const { user_id } = query;
            const results = await connection.query(
                `SELECT * FROM SHOPPING_LIST WHERE user_id = ?`,
                [user_id]
            );
            return resolve(results);
        } catch (err) {
            return reject(err);
        }
    })
}

modelMethods.getListById = (list_id) => {
    return new Promise( async(resolve, reject) => {
        try {
            const result = await connection.query(
                `SELECT * FROM SHOPPING_LIST WHERE list_id = ?`,
                [list_id]
            );
            return resolve(result);
        } catch (err) {
            return reject(err);
        }
    })
}


modelMethods.addIngredient = (query) => {
    return new Promise( async(resolve, reject) => {
        try {
            const {
                ingredient,
                list_id,
                quantity, 
                unit
            } = query; 
            const insert = connection.query(
                `INSERT INTO SHOPPING_LIST_DETAILS(list_id, ingredient, quantity, unit)
                VALUES(?, ?, ?, ?)`,
                [list_id, ingredient, quantity, unit]
            );
            return resolve(insert);
        } catch (err) {
            return reject(err);
        }
    });
}

modelMethods.getIngredientById = (list_id, ingredient_id) => {
    return new Promise( async(resolve, reject) => {
        try {
            const result = await connection.query(
                `SELECT * FROM SHOPPING_LIST_DETAILS WHERE list_id = ? AND ingredient_id = ?`,
                [list_id, ingredient_id]
            );
            return resolve(result[0]);
        } catch (err) {
            return reject(err);   
        }
    })
}

modelMethods.deleteList = (list_id) => {
    return new Promise( async(resolve, reject) => {
        try {
            const result = await connection.query(
                `DELETE FROM SHOPPING_LIST WHERE list_id = ?`, 
                [list_id]
            );
            return resolve(result);
        } catch (err) {
            return reject(err);        
        }
    }) 
}

modelMethods.removeIngredient = (list_id, ingredient) => {
    return new Promise( async(resolve, reject) => {
        try {
            const result = await connection.query(
                `DELETE FROM SHOPPING_LIST_DETAILS WHERE list_id = ? AND ingredient_id = ?`,
                [list_id, ingredient]
            );
            return resolve(result);
        } catch (err) {
            return reject(err);
        }
    })
}


module.exports = modelMethods; 