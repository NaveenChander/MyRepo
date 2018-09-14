exports.up = function (knex, Promise) {
    return knex.schema.createTable('FundType', (table) => {
        table.string('FundType_Code').notNullable().primary();
        table.string('FundType_Desc');
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('FundType');
};
