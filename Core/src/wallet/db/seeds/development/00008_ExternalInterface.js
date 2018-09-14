
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ExternalInterface').del()
    .then(function () {
      // Inserts seed entries
      return knex('ExternalInterface').insert([
        {Account_ID: 2, Tenant_ID: 1, ExternalInterfacePropertyCode: 'CMP001'},
        {Account_ID: 3, Tenant_ID: 1, ExternalInterfacePropertyCode: 'ACSC002'},
        {Account_ID: 4, Tenant_ID: 2, ExternalInterfacePropertyCode: 'IGT001'}
      ]);
    });
};
