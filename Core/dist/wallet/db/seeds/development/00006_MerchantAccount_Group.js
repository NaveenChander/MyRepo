exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('MerchantAccount_Group').del()
        .then(function () {
        // Inserts seed entries
        return knex('MerchantAccount_Group').insert([
            { Merchant_ID: 1, Account_ID: 2, Tenant_ID: 1 },
            { Merchant_ID: 2, Account_ID: 3, Tenant_ID: 1 },
            { Merchant_ID: 3, Account_ID: 4, Tenant_ID: 2 },
        ]);
    });
};
