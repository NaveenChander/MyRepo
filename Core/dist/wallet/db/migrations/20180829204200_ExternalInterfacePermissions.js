exports.up = function (knex, Promise) {
    return knex.schema.createTable('ExternalInterfacePermissions', (table) => {
        table.integer('ExternalInterface_ID').notNullable();
        table.string('OperationType_Code', 10).notNullable();
        table.boolean('isAuthorized').default(1);
        table.foreign('ExternalInterface_ID').references('ExternalInterface_ID').inTable('ExternalInterface');
        table.foreign('OperationType_Code').references('OperationType_Code').inTable('OperationType');
        table.primary(['ExternalInterface_ID', 'OperationType_Code']);
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('ExternalInterfacePermissions');
};
