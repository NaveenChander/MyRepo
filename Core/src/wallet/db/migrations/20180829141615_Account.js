
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Account', (table) => {
      table.increments('Account_ID').primary();
      table.integer('Tenant_ID').notNullable();      
      table.string('AccountType_Code', 10).notNullable();
      table.boolean('IsInternalAccount').notNullable().default(1);
      table.string('Account_Name').notNullable();
      table.foreign('Tenant_ID').references('Tenant_ID').inTable('Tenant');
      table.foreign('AccountType_Code').references('AccountType_Code').inTable('AccountType');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('Account');
};
