
exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('user_grants').del().then(() => {
      return knex('grants').del()
    }).then(() => {
      return knex('grants').insert([
        { name: 'admin'},
        { name: 'user'}
      ])
    })
  ])
};
