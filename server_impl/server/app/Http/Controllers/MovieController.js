'use strict'

const Database = use('Database')
const User = use('App/Model/User')
const Movie = use('App/Model/Movie')
const Rent = use('App/Model/Rent')
const Validator = use('Validator')

class MovieController {
   * create (request, response) {
        const movies = yield Movie.all()
        yield response.sendView('movieCreate', {
        movies: movies.toJSON()
        });
   }

   * doCreate (request, response) {
       const movieInfo = request.except('_csrf');
        const rules = {
        title: 'required',
        director: 'required',
        description: 'required',
        price: 'required'
        };
        movieInfo.is_rented = 'false'

       const validation = yield Validator.validateAll(movieInfo, rules)

       if (validation.fails()) {
       yield request
           .withAll()
           .andWith({errors: validation.messages()})
           .flash()
       response.redirect('back')
       return
       }

       const movie = yield Movie.create(movieInfo)

       response.redirect('/allMovies')
   }

   * allMovies (request, response) {
            const movies = yield Movie.all()
            yield response.sendView('movies', {
            movies: movies.toJSON()
            });
   }

   * movieInfo (request, response) {
        const id = request.param('id');
        const movieInfo = yield Database.from('movies').select('title','director','description', 'price', 'is_rented').where(function(){
            this.where('id',id)
        })
    
        yield response.sendView('renting', {
            movieInfo: movieInfo
        })
   }

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

   *delete(request,response){
        const movieId = request.param('id')
        const movie = yield Movie.find(movieId)

        yield movie.delete()
        response.redirect('/allMovies')
    }

   *ajaxDelete(request,response){
        const movieId = request.param('id')
        const movie = yield Movie.find(movieId)

        if(movie != null) {
            response.ok({success: true})
        }
        else{
            response.ok({success: false})
        }
    }
   }

module.exports = MovieController