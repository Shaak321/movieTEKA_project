'use strict'

const Schema = use('Schema')

class RentsTableSchema extends Schema {

  up () {
    this.create('rents', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('from').notNullable()
      table.string('to').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('rents')
  }

}

module.exports = RentsTableSchema
