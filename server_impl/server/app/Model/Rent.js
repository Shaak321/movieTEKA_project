'use strict'

const Lucid = use('Lucid')

class Rent extends Lucid {

    user () {
        return this.belongsTo('App/Model/Rent')
    }
}

module.exports = Rent
