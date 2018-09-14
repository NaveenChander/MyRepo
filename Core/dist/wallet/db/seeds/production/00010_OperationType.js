exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('OperationType').del()
        .then(function () {
        // Inserts seed entries
        return knex('OperationType').insert([
            { OperationType_Code: 'DEPOSIT', OperationType_desc: 'DEPOSIT' },
            { OperationType_Code: 'WITHDRAWAL', OperationType_desc: 'WITHDRAWAL' },
        ]);
    });
};
