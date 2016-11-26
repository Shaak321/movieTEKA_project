'use strict'

const Schema = use('Schema')

class MoviesTableSchema extends Schema {

  up () {
    this.create('movies', (table) => {
      table.increments()
      table.string('title', 40).notNullable().unique()
      table.string('director').notNullable()
      table.boolean('is_rented').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('movies')
  }

}

module.exports = MoviesTableSchema
