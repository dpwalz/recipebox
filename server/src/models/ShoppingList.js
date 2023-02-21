const DatabaseConnection = require("../config/database");
const connection = DatabaseConnection.getDatabaseInstance();

const modelMethods  = {};

modelMethods.createList = (query) => {
    return new Promise( async(resolve, reject) => {
        try {
            const user_id = query.user_id || null;
            const { list_id } = query;
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

modelMethods.getListsByUser = (query) => {
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

modelMethods.getListDetailsById = (list_id) => {
    return new Promise( async(resolve, reject) => {
        try {
            const result = await connection.query(
                `SELECT * FROM SHOPPING_LIST_DETAILS WHERE list_id = ?`,
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
                ingredient_id,
                list_id,
                quantity, 
                unit
            } = query; 
            const insert = connection.query(
                `INSERT INTO SHOPPING_LIST_DETAILS(list_id, ingredient_id, quantity, unit)
                VALUES(?, ?, ?, ?)`,
                [list_id, ingredient_id, quantity, unit]
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

modelMethods.updateIngredient = (item) => {
    return new Promise( async(resolve, reject) => {
        try {
            const { 
                ingredient_id,
                list_id, 
                quantity, 
                unit } = item;
            const result = await connection.query(
                `UPDATE SHOPPING_LIST_DETAILS
                SET quantity = ?, unit = ?
                WHERE list_id = ? AND ingredient_id = ?`,
                [quantity, unit, list_id, ingredient_id]
            )
            return resolve(result);
        } catch (err) {
            return reject(err);
        }
    });
}



module.exports = modelMethods; 