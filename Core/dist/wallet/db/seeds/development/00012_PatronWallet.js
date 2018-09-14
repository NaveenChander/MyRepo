exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('PatronWallet').del()
        .then(function () {
        // Inserts seed entries
        return knex('PatronWallet').insert([
            { Tenant_ID: 1, EveriPatron_ID: 'EV0001', ExternalWallet_ID: 1001 },
            { Tenant_ID: 2, EveriPatron_ID: 'EV0002', ExternalWallet_ID: 1002 }
        ]);
    });
};
