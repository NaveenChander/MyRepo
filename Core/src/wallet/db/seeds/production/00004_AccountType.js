
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('AccountType').del()
    .then(function () {
      // Inserts seed entries
      return knex('AccountType').insert([
        {AccountType_Code: 'EVICASH', Category: 'DEPOSIT', AccountType_Desc:'Everi Cash Deposit'},
        {AccountType_Code: 'FRONTMONEY', Category: 'DEPOSIT', AccountType_Desc:'Front Money'},
        {AccountType_Code: 'CREDITLINE', Category: 'CREDIT', AccountType_Desc:'Credit Line Increase'},
        {AccountType_Code: 'CHECKBOOST', Category: 'CREDIT', AccountType_Desc:'Check Boost'},
        {AccountType_Code: 'SLOTS', Category: 'GAMING', AccountType_Desc:'SLOTS'},
        {AccountType_Code: 'SPORTS', Category: 'GAMING', AccountType_Desc:'Sports betting'},
        {AccountType_Code: 'HOTEL', Category: 'FOODANDBEV', AccountType_Desc:'Everi Cash Deposit'}
      ]);
    });
};
