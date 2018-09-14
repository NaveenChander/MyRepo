
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('KeyStore').del()
    .then(function () {
      // Inserts seed entries
      return knex('KeyStore').insert([
        {Tenant_ID: 1, API_key: 'abed1224abcd1234', Secret_key: 'abed1234abcd1234',MA_Group_ID: 1},
        {Tenant_ID: 1, API_key: 'abed1234abcd1234', Secret_key: 'abed1234abcd1234',MA_Group_ID: 2},
        {Tenant_ID: 2, API_key: 'abed1254abcd1234', Secret_key: 'abed1234abcd1234',MA_Group_ID: 3}
      ]);
    });
};
