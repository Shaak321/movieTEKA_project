'use strict'

const Schema = use('Schema')

class RentsTableSchema extends Schema {

  up () {
    this.create('rents', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('movie_id').unsigned().references('id').inTable('movies')
      table.string('title').notNullable()
      table.date('from').notNullable()
      table.date('to').notNullable()
      table.boolean('expired').defaultTo('false')
      table.timestamps()
    })
  }

  down () {
    this.drop('rents')
  }

}

module.exports = RentsTableSchema
