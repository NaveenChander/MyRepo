exports.up = function (knex, Promise) {
    return knex.schema.createTable('MerchantAccount_Group', (table) => {
        table.integer('Merchant_ID').notNullable();
        table.integer('Account_ID').notNullable();
        table.integer('Tenant_ID').notNullable();
        table.primary(['Merchant_ID', 'Account_ID']);
        table.foreign('Account_ID').references('Account_ID').inTable('Account');
        table.foreign('Merchant_ID').references('Merchant_ID').inTable('Merchant');
    }).then(() => knex.schema.raw('Alter Table MerchantAccount_Group Add MA_Group_ID INT IDENTITY(1,1) UNIQUE'));
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('MerchantAccount_Group');
};
