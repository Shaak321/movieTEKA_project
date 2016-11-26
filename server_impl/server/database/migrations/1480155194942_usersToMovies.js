'use strict'

const Schema = use('Schema')

class UsersToMoviesTableSchema extends Schema {

  up () {
    this.create('usersToMovies', (table) => {
      table.increments()
      table.integer('movie_id').unsigned().references('id').inTable('movies')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('usersToMovies')
  }

}

module.exports = UsersToMoviesTableSchema
