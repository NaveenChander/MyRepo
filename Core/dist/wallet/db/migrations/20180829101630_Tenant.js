exports.up = function (knex, Promise) {
    return knex.schema.createTable('Tenant', (table) => {
        table.increments('Tenant_ID').primary();
        table.string('Tenant_Name').notNullable();
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('Tenant');
};
