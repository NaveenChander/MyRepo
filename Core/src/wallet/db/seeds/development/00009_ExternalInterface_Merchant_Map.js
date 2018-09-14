
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ExternalInterface_Merchant_Map').del()
    .then(function () {
      // Inserts seed entries
      return knex('ExternalInterface_Merchant_Map').insert([
        {Merchant_ID: 1, ExternalInterface_ID: 1},
        {Merchant_ID: 2, ExternalInterface_ID: 2},
        {Merchant_ID: 3, ExternalInterface_ID: 3}
      ]);
    });
};
