const DatabaseConnection = require("../config/database");
const connection = DatabaseConnection.getDatabaseInstance();

const modelMethods = {};

modelMethods.getOneUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const oneUser = await connection.query(
                `SELECT * FROM REGISTERED_USER WHERE id = ?`,
                [id]
            );
            return resolve(oneUser[0]);
        } catch (err) {
            return reject(err);
        }
    });
}

modelMethods.getUserByEmail = (email_address) => {
    return new Promise(async (resolve, reject) => {
        try{
            const oneUser = await connection.query(
                `SELECT * FROM REGISTERED_USER WHERE email_address = ?`,
                [email_address]
            );
            return resolve(oneUser[0]);
        } catch (err) {
            return reject(err);
        }
    });
}

modelMethods.createUser = (body, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                first_name, 
                last_name, 
                email_address, 
                password
            } = body;
            const results = await connection.query(
                `INSERT INTO REGISTERED_USER(id, first_name, last_name, email_address, password) 
                VALUES(?, ?, ?, ?, ?)`, 
                [id, first_name, last_name, email_address, password]
            );
            return resolve(results);
        } catch (err) {
            return reject(err);
        }
    });
}


module.exports = modelMethods;