exports.up = function (knex, Promise) {
    return knex.schema.createTable('AccountType', (table) => {
        table.string('AccountType_Code', 10).primary();
        table.string('Category', 10).notNullable();
        table.string('AccountType_Desc');
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('AccountType');
};
