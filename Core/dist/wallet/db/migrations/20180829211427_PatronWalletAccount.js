exports.up = function (knex, Promise) {
    return knex.schema.createTable('PatronWalletAccount', (table) => {
        table.integer('PatronWallet_ID').notNullable();
        table.integer('Account_ID').notNullable();
        table.integer('Tenant_ID').notNullable();
        table.integer('Balance').notNullable();
        table.integer('Limit').notNullable();
        table.string('ExternalAccount_ID').notNullable();
        table.primary(['PatronWallet_ID', 'Account_ID']);
        table.foreign('Account_ID').references('Account_ID').inTable('Account');
        table.foreign('Tenant_ID').references('Tenant_ID').inTable('Tenant');
        table.foreign('PatronWallet_ID').references('PatronWallet_ID').inTable('PatronWallet');
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('PatronWalletAccount');
};
