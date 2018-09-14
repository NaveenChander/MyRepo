exports.up = function (knex, Promise) {
    return knex.schema.createTable('Merchant', (table) => {
        table.increments('Merchant_ID').primary();
        table.integer('Tenant_ID').notNullable();
        table.integer('Corporate_ID').notNullable();
        table.string('Merchant_Name').notNullable();
        table.string('EveriTiPropertyCode', '20').notNullable();
        table.foreign('Tenant_ID').references('Tenant_ID').inTable('Tenant');
        table.foreign('Corporate_ID').references('Corporate_ID').inTable('Corporate');
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('Merchant');
};
