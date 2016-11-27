'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')
const Database = use('Database')

class UserController {
  * register(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (isLoggedIn) {
      response.redirect('/')
    }

    yield response.sendView('register')
  }

  * login(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (isLoggedIn) {
      response.redirect('/')
    }

    yield response.sendView('login')
  }

  * doLogin (request, response) {
    const username = request.input('username')
    const password = request.input('password')

    try {
      const login = yield request.auth.attempt(username, password) 

      if (login) {
        response.redirect('/')
        return
      }
    } 
    catch (err) {
      yield request
        .withAll()
        .andWith({errors: [
          {
            message: 'Invalid credentails'
          }
        ]})
        .flash()

      response.redirect('/login')
    }
  }

  * doRegister (request, response) {
    const registerData = request.except('_csrf');

    const rules = {
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      name: 'required|min:3',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    };

    const validation = yield Validator.validateAll(registerData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    const user = new User()

    user.username = registerData.username;
    user.name = registerData.name
    user.email = registerData.email;
    user.password = yield Hash.make(registerData.password)
    user.coin = 50
    yield user.save()
    
    yield request.auth.login(user)

    response.redirect('/')
  }

  * doLogout (request, response) {
    yield request.auth.logout()
    response.redirect('/')
  }

  * users (request, response) {
     const users = yield User.all()

    for(let user of users) {
      user = user.toJSON();
    }

    yield response.sendView('users', {
      users: users.toJSON()
    })  
  }

  * profile (request, response) {
      const currentUser = request.currentUser
      const userId = currentUser.id;

      const userInfo = yield Database.from('users').select('username','email','name', 'coin').where(function(){
          this.where('id',userId)
      })
      
      yield response.sendView('profile',{
              userInfo: userInfo
      }) 
      }

    * addCoin (request, response) {
      const user = yield User.find(request.currentUser.id);

      user.coin += 50;

      yield user.save()
      
      response.redirect('/')
      }

    * showUser (request, response) {
      const id = request.param('id');
      const userInfo = yield Database.from('users').select('username','email','name', 'coin').where(function(){
          this.where('id',id)
      })

      yield response.sendView('profile', {
        userInfo: userInfo
      })
    }
  }

module.exports = UserController
