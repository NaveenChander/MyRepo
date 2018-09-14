
exports.up = function(knex, Promise) {
  return knex.schema.createTable('OperationType', (table) => {
      table.string('OperationType_Code', 10).primary();
      table.string('OperationType_desc');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('OperationType');
};
