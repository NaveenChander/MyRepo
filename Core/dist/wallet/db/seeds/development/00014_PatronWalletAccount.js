exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('PatronWalletAccount').del()
        .then(function () {
        // Inserts seed entries
        return knex('PatronWalletAccount').insert([
            { PatronWallet_ID: 1, Account_ID: 1, Tenant_ID: 1, Balance: 200000, Limit: 200000, ExternalAccount_ID: 'CMPPlayer001' }
        ]);
    });
};
