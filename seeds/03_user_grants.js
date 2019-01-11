
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_grants').del()
    .then(() => {
      // Inserts seed entries
      return knex('user_grants').insert([
        { user_id: 1, grant_id: 1 },
        { user_id: 2, grant_id: 2 }
      ]);
    });
};
