exports.up = function (knex, Promise) {
    return knex.schema.createTable('KeyStore', (table) => {
        table.integer('Tenant_ID').notNullable();
        table.string('API_key').notNullable();
        table.string('Secret_key').notNullable();
        table.integer('MA_Group_ID').notNullable();
        table.foreign('MA_Group_ID').references('MA_Group_ID').inTable('MerchantAccount_Group');
        table.foreign('Tenant_ID').references('Tenant_ID').inTable('Tenant');
        table.primary(['Tenant_ID', 'API_key', 'Secret_key']);
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('KeyStore');
};
