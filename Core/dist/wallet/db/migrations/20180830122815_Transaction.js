exports.up = function (knex, Promise) {
    return knex.schema.createTable('Transaction', (table) => {
        table.bigInteger('Transaction_ID').notNullable();
        table.integer('PatronWallet_ID');
        table.string('SourceFundType');
        table.integer('SourceAmount');
        table.string('SourceSystem');
        table.string('SourceAddress');
        table.string('SourceTerminal');
        table.string('DestintationFundType');
        table.integer('DestinationAmount');
        table.string('DestintationSystem');
        table.string('DestinationAddress');
        table.string('DestinationTerminal');
        table.string('OperationType');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('Transaction');
};
