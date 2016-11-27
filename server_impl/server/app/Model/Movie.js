'use strict'

const Lucid = use('Lucid')

class Movie extends Lucid {
    user () {
        return this.belongsTo('App/Model/Movie')
    }
}

module.exports = Movie
