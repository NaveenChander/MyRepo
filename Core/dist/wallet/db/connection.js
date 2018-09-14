"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment = process.env.NODE_ENV || 'development';
const knexfile_1 = require("./knexfile");
const config = knexfile_1.knexfile[environment];
const knex = require("knex");
exports.connection = knex(config);
