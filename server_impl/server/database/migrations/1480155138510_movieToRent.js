'use strict'

const Schema = use('Schema')

class MovieToRentTableSchema extends Schema {

  up () {
    this.create('movieToRent', (table) => {
      table.increments()
      table.integer('movie_id').unsigned().references('id').inTable('movies')
      table.integer('rent_id').unsigned().references('id').inTable('rents')
      table.timestamps()
    })
  }

  down () {
    this.drop('movieToRent')
  }

}

module.exports = MovieToRentTableSchema
