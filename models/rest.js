
const knex = require('knex');
const default_connection = `${process.cwd()}/knexfile`

module.exports = {
  all ({ table, connection }) {
    if (!connection) {
      connection = default_connection
    } connection = knex(require(connection))
    return connection(table)  
  },
  get ({ table, id, connection }) {
    if (!connection) {
      connection = default_connection
    } connection = knex(require(connection))
    return connection(table).where({ id })
  },
  post ({ table, body, connection }) {
    if (!connection) {
      connection = default_connection
    } connection = knex(require(connection))
    return connection(table).insert(body)
  },
  put ({ table, body, id, connection }) {
    if (!connection) {
      connection = default_connection
    } connection = knex(require(connection))
    return connection(table).where({ id }).update(body)
  },
  delete({ table, id, connection }) {
    if (!connection) {
      connection = default_connection
    } connection = knex(require(connection))
    return connection(table).where({ id }).del()
  }
}