const crypto = require('crypto')
const knex = require('knex')(require('../knexfile'))

module.exports = {
  getUserByEmail ({ email }) {
    return knex('users')
      .select([
        'users.id', 
        'users.salt', 
        'users.password', 
        'users.email'
      ])
      .where({ email })
      .then(([user]) => {
        return knex("grants")
        .join("user_grants", "grants.id", "user_grants.grant_id")
        .select([
          "grants.name"
        ]).then((grants) => {
          return new Promise((resolve, reject) => {
            if (user && grants) {
              user.grants = grants
              return resolve(user)
            } reject("Could not find a valid user");
          })
        })
      })
  }
}
