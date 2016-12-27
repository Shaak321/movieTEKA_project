'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const Movie = use('App/Model/Movie')
const Rent = use('App/Model/Rent')
const Validator = use('Validator')

class RentController {
   * buyMovie (request, response) {
        const id = request.param('id');

        const movie = yield Movie.find(id);
        movie.is_rented = 'true'
        yield movie.save()

        const user = yield User.find(request.currentUser.id);
        user.coin -= movie.price
        yield user.save()

        const currentDate = new Date()

        const rentInfo = request.except('_csrf');
        
        rentInfo.user_id = request.currentUser.id
        rentInfo.movie_id = id
        rentInfo.title = movie.title
        rentInfo.from = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getUTCDate())
        rentInfo.to = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getUTCDate() + 10)
        rentInfo.expired = 'false'

       const rent = yield Rent.create(rentInfo)

       response.redirect('/ownRents')
   }

   * rentList (request, response) {
        const id = request.currentUser.id;
        const rentList = yield Database.from('rents').select('id', 'title','from','to', 'expired').where(function(){
            this.where('user_id',id)
        })
    
        yield response.sendView('rentList', {
            rentList: rentList
        })
   } 

   * rentInfo (request, response) {
        const id = request.param('id');
        const rentInfo = yield Database.from('rents').select('title','from','to', 'expired').where(function(){
            this.where('id',id)
        })
    
        yield response.sendView('rentInfo', {
            rentInfo: rentInfo
        })
   }
   
   * return (request, response) {
        const id = request.param('id');
        const rent = yield Rent.find(id)
        const movie = yield Movie.find(rent.movie_id)
        movie.is_rented = 'false'
        yield movie.save()

        yield rent.delete()
    
        response.redirect('/ownRents')
   } 

   * ajaxReturn (request, response) {
        const id = request.param('id');
        const rent = yield Rent.find(id)
        const movie = yield Movie.find(rent.movie_id)
        
        if(rent != null && movie != null){
            response.ok({success: true})
        }
        else {
            response.ok({success: false})
        }
   } 
}

module.exports = RentController