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
Route.get('/ownRents', 'MovieController.rentList').middleware('auth')
Route.get('/rentInfo/:id', 'MovieController.rentInfo').middleware('auth')
Route.post('/rentInfo/:id', 'MovieController.returnMovie').middleware('auth')
Route.get('/ownProfile', 'UserController.profile')
Route.get('/movieInfo/:id', 'MovieController.movieInfo').middleware('auth')
Route.post('/movieInfo/:id', 'MovieController.buyMovie').middleware('auth')

Route.get('/users', 'UserController.users')
Route.get('/users/:id', 'UserController.showUser').middleware('auth')
Route.get('/users/:id/profile', 'MovieController.showProfile').middleware('auth')
Route.get('/addCoin', 'UserController.addCoin').middleware('auth')

Route.get('/register', 'UserController.register')
Route.get('/login', 'UserController.login')
Route.post('/register', 'UserController.doRegister')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')