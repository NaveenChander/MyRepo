exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('Merchant').del()
        .then(function () {
        // Inserts seed entries
        return knex('Merchant').insert([
            { Tenant_ID: 1, Corporate_ID: 1, Merchant_Name: 'MGM Grand', EveriTiPropertyCode: '1001' },
            { Tenant_ID: 1, Corporate_ID: 2, Merchant_Name: 'New York New Yotk', EveriTiPropertyCode: '1002' },
            { Tenant_ID: 2, Corporate_ID: 3, Merchant_Name: 'Encore LV', EveriTiPropertyCode: '1003' },
            { Tenant_ID: 2, Corporate_ID: 4, Merchant_Name: 'Wynn LV', EveriTiPropertyCode: '1004' }
        ]);
    });
};
