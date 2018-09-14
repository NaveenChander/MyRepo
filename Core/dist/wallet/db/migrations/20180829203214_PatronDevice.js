exports.up = function (knex, Promise) {
    return knex.schema.createTable('PatronDevice', (table) => {
        table.increments('PatronDevice_ID');
        table.integer('PatronWallet_ID').notNullable();
        table.string('DeviceIdentifier').notNullable();
        table.foreign('PatronWallet_ID').references('PatronWallet_ID').inTable('PatronWallet');
    });
};
exports.down = function (knex, Promise) {
    return knex.schema.dropTable('PatronDevice');
};
