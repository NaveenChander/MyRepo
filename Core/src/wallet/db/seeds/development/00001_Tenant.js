exports.seed = function (knex, Promise) {
  return knex('Tenant').del()
    .then(function () {
      return knex('Tenant').insert([
        { Tenant_Name: 'MGM Resorts International' },
        { Tenant_Name: 'Wynn Resorts Global' }
      ]);
    });
};