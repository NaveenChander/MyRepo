exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('Account').del()
        .then(function () {
        // Inserts seed entries
        return knex('Account').insert([
            { Tenant_ID: 1, AccountType_Code: 'EVICASH', IsInternalAccount: 1, Account_Name: 'Everi Cash Account' },
            { Tenant_ID: 1, AccountType_Code: 'SLOTS', IsInternalAccount: 0, Account_Name: 'MGM EBS 1' },
            { Tenant_ID: 1, AccountType_Code: 'SLOTS', IsInternalAccount: 0, Account_Name: 'MGM EBS 2' },
            { Tenant_ID: 2, AccountType_Code: 'EVICASH', IsInternalAccount: 1, Account_Name: 'Everi Cash Account' }
        ]);
    });
};
