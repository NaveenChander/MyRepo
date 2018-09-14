exports.up = function (knex, Promise) {
    return knex.schema.createTable('Corporate', (table) => {
        table.increments('Corporate_ID').primary();
        table.integer('Tenant_ID');
        table.string('Corporate_Name').notNullable();
        table.foreign('Tenant_ID').references('Tenant_ID').inTable('Tenant');
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('Corporate');
};
