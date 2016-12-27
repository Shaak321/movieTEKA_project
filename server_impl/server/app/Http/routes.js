'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/','MainController.main')

Route.get('/createMovie', 'MovieController.create').middleware('auth')
Route.post('/createMovie', 'MovieController.doCreate').middleware('auth')
Route.get('/allMovies', 'MovieController.allMovies').middleware('auth')
Route.get('/movieInfo/:id', 'MovieController.movieInfo').middleware('auth')
Route.post('/movieInfo/:id', 'MovieController.buyMovie').middleware('auth')
Route.get('/delete/:id','MovieController.delete').middleware('auth')

Route.get('/ownRents', 'RentController.rentList').middleware('auth')
Route.get('/rentInfo/:id', 'RentController.rentInfo').middleware('auth')
Route.get('/rentInfo/return/:id', 'RentController.return').middleware('auth')

Route.get('/ownProfile', 'UserController.profile')
Route.get('/users', 'UserController.users')
Route.get('/users/:id', 'UserController.showUser').middleware('auth')
Route.get('/users/:id/profile', 'MovieController.showProfile').middleware('auth')
Route.get('/addCoin', 'UserController.addCoin').middleware('auth')

Route.get('/register', 'UserController.register')
Route.get('/login', 'LoginController.login')
Route.post('/register', 'UserController.doRegister')
Route.post('/login', 'LoginController.doLogin')
Route.get('/logout', 'LoginController.logout')
Route.get('/logout', 'LoginController.doLogout')

Route.group('ajax', function() {
  Route.post('/login', 'LoginController.ajaxLogin')
  Route.get('/delete/:id','MovieController.ajaxDelete').middleware('auth')
  Route.get('/rentInfo/return/:id','RentController.ajaxReturn').middleware('auth')
}).prefix('/ajax')