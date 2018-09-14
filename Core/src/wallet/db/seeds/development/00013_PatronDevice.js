
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('PatronDevice').del()
    .then(function () {
      // Inserts seed entries
      return knex('PatronDevice').insert([
        {PatronWallet_ID: 1, DeviceIdentifier: 'abcd1234'}
      ]);
    });
};
