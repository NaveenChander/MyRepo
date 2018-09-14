
exports.up = function(knex, Promise) {
    return knex.schema.createTable('AuditHistory', (table)=>{
      table.bigInteger('AuditHistory_ID').notNullable();
      table.string('AuditType');
      table.string('AuditValue');
      table.string('AuditDescription');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('AuditHistory');
  }; 
