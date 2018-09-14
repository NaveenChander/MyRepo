exports.up = function (knex, Promise) {
    return knex.schema.createTable('PatronWallet', (table) => {
        table.integer('Tenant_ID').notNullable();
        table.string('EveriPatron_ID', 50).notNullable();
        table.integer('ExternalWallet_ID').notNullable();
        table.primary(['Tenant_ID', 'EveriPatron_ID']);
        table.foreign('Tenant_ID').references('Tenant_ID').inTable('Tenant');
    }).then(() => knex.schema.raw('Alter Table PatronWallet Add PatronWallet_ID INT IDENTITY(1,1) UNIQUE'));
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('PatronWallet');
};
