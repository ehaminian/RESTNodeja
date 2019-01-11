
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_grants').del()
    .then(() => {
      return knex('users').del()
      .then(() => {
        return knex('users').insert([
          { email: 'admin@acme.com', password: 'password' },
          { email: 'user@acme.com', password: 'password' }
        ]);
      })
    });
};
