
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('grants', (t) => {
      t.increments('id').unsigned().primary()
      t.string('name').notNull()
      t.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      t.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    }),
    knex.schema.createTable('users', (t) => {
      t.increments('id').unsigned().primary()
      t.string('email').notNull()
      t.string('password').notNull()
      t.string('salt').notNull()
      t.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      t.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    }),
    knex.schema.createTable('user_grants', (t) => {
      t.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('cascade').onUpdate('cascade')
      t.integer('grant_id').unsigned().notNullable().references('id').inTable('grants').onDelete('cascade').onUpdate('cascade')
      t.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      t.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      t.primary(['user_id', 'grant_id']);
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('user_grants'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('grants')
  ]);
};
