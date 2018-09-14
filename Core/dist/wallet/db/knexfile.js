"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexfile = {
    development: {
        client: 'mssql',
        connection: {
            host: 'localhost',
            user: 'sa',
            password: '123456',
            database: 'WalletDB',
        },
        pool: { min: 0, max: 7 },
    },
};
