const { createConnection } = require("mysql");
const { config } = require("process");
const util = require("util");

class DatabaseConnection {

    instance;
    connection;
    config;

    constructor() {
        this.instance == null;
        this.connection == null;
        this.config == null;
    }

    static getDatabaseInstance() {
        if(this.instance == null) {
            this.instance = new DatabaseConnection();
            this.config = {
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASS,
            };
            if(process.env.NODE_ENV === 'production'){
                this.config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
            } else {
                this.config.host = process.env.DB_HOST;
            }
            
            this.instance.getDatabaseConnection();
        }
        return this.instance;
    }

    getDatabaseConnection() {
        if (!this.connection) {
            this.connection = createConnection(this.config);
        }
        return this.connection;
    }

    query(sql, args) {
        return util
            .promisify(this.connection.query)
            .call(this.connection, sql, args);
    }


}

module.exports = DatabaseConnection
