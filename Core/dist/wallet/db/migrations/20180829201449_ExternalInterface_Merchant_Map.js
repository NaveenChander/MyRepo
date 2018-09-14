exports.up = function (knex, Promise) {
    return knex.schema.createTable('ExternalInterface_Merchant_Map', (table) => {
        table.integer('Merchant_ID').notNullable();
        table.integer('ExternalInterface_ID').notNullable();
        table.foreign('Merchant_ID').references('Merchant_ID').inTable('Merchant');
        table.foreign('ExternalInterface_ID').references('ExternalInterface_ID').inTable('ExternalInterface');
        table.primary(['Merchant_ID', 'ExternalInterface_ID']);
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('ExternalInterface_Merchant_Map');
};
