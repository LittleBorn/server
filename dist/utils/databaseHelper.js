"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Import the mongoose module
const mongoose = require("mongoose");
class Database {
    constructor() {
        this.connection = mongoose.connection;
        try {
            this.connection
                .on('open', console.info.bind(console, 'Database connection: open'))
                .on('close', console.info.bind(console, 'Database connection: close'))
                .on('disconnected', console.info.bind(console, 'Database connection: disconnecting'))
                .on('disconnected', console.info.bind(console, 'Database connection: disconnected'))
                .on('reconnected', console.info.bind(console, 'Database connection: reconnected'))
                .on('fullsetup', console.info.bind(console, 'Database connection: fullsetup'))
                .on('all', console.info.bind(console, 'Database connection: all'))
                .on('error', console.error.bind(console, 'MongoDB connection: error:'));
        }
        catch (error) {
            console.error(error);
        }
    }
    async connect(connectionString) {
        try {
            await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'LittleBorn' });
        }
        catch (error) {
            console.error(error);
        }
    }
    async close() {
        try {
            await this.connection.close();
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = new Database();
//# sourceMappingURL=databaseHelper.js.map