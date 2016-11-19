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

Route.on('/').render('welcome')
Route.get('/', 'MovieController.index')
Route.get('/ownRecipes', 'MovieController.ownList').middleware('auth')
Route.get('/recipes/create', 'MovieController.create').middleware('auth')
Route.post('/recipes/create', 'MovieController.doCreate').middleware('auth')
Route.get('/recipes/:id/edit', 'MovieController.edit').middleware('auth')
Route.post('/recipes/:id/edit', 'MovieController.doEdit').middleware('auth')
Route.get('/recipes/:id/delete', 'MovieController.doDelete').middleware('auth')
Route.get('/recipes/:id', 'MovieController.show')
Route.get('/search', 'MovieController.search')

Route.get('/register', 'UserController.register')
Route.get('/login', 'UserController.login')
Route.post('/register', 'UserController.doRegister')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')