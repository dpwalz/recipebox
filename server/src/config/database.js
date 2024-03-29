const { createConnection } = require("mysql2");
const util = require("util");

class DatabaseConnection {

    instance;
    connection;

    constructor() {
        this.instance == null;
        this.connection == null;
    }

    static getDatabaseInstance() {
        if(this.instance == null) {
            this.instance = new DatabaseConnection();           
            this.instance.getDatabaseConnection();
        }
        return this.instance;
    }

    getDatabaseConnection() {
        if (!this.connection) {
            if(process.env.NODE_ENV === 'production') {
                this.connection = createConnection({
                    user: process.env.DB_USER,
                    database: process.env.DB_NAME,
                    password: process.env.DB_PASS,
                    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
                });
            } else {
            this.connection = createConnection({
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASS,
                host: process.env.DB_HOST
            });
        }
        return this.connection;
    }
    }
    query(sql, args) {
        return util
            .promisify(this.connection.query)
            .call(this.connection, sql, args);
    }


}

module.exports = DatabaseConnection
