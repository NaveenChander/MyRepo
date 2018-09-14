
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Corporate').del()
    .then(function () {
      // Inserts seed entries
      return knex('Corporate').insert([
        {Tenant_ID: 1, Corporate_Name: 'MGM USA'},
        {Tenant_ID: 1, Corporate_Name: 'MGM Macau'},
        {Tenant_ID: 2, Corporate_Name: 'Wynn USA'},
        {Tenant_ID: 2, Corporate_Name: 'Wynn Macau'},
      ]);
    });
};
