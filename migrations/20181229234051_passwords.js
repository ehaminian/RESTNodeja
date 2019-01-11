const { saltHashPassword } = require("../lib/utils");

exports.up = async function(knex, Promise) {
  const users = await knex('users');
  await Promise.all(users.map(convertPassword))
  
  function convertPassword (user) {
    const { salt, hash } = saltHashPassword({ password: user.password })
    return knex('users')
      .where({ id: user.id })
      .update({
        salt,
        password: hash
      })
  }
};

exports.down = async function(knex, Promise) {
  await Promise.all([])
};
