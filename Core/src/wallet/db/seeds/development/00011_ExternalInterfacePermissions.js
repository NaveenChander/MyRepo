
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ExternalInterfacePermissions').del()
    .then(function () {
      // Inserts seed entries
      return knex('ExternalInterfacePermissions').insert([
        {ExternalInterface_ID: 1, OperationType_Code: 'DEPOSIT', isAuthorized: 1},
        {ExternalInterface_ID: 1, OperationType_Code: 'WITHDRAWAL', isAuthorized: 1},
        {ExternalInterface_ID: 2, OperationType_Code: 'DEPOSIT', isAuthorized: 1},
        {ExternalInterface_ID: 2, OperationType_Code: 'WITHDRAWAL', isAuthorized: 1},
        {ExternalInterface_ID: 3, OperationType_Code: 'DEPOSIT', isAuthorized: 1},
        {ExternalInterface_ID: 3, OperationType_Code: 'WITHDRAWAL', isAuthorized: 1}
      ]);
    });
};
