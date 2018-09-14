exports.up = function (knex, Promise) {
    return knex.schema.createTable('ExternalInterface', (table) => {
        table.increments('ExternalInterface_ID');
        table.integer('Account_ID').notNullable();
        table.integer('Tenant_ID').notNullable();
        table.string('ExternalInterfacePropertyCode', 20).notNullable();
        table.foreign('Account_ID').references('Account_ID').inTable('Account');
        table.foreign('Tenant_ID').references('Tenant_ID').inTable('Tenant');
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('ExternalInterface');
};
