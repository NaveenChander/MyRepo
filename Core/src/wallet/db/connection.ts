const environment = process.env.NODE_ENV || 'development';
import { knexfile } from './knexfile';
const config: any = knexfile[environment];
import * as knex from 'knex';
export const connection: knex = knex(config);
