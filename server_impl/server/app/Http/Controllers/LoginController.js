'use strict'

class LoginController {
    *login(req, res){
            yield res.sendView('login')
        }

    *doLogin(req, res){
        const username = req.input('username')
        const password = req.input('password')

        const loginMessage = {
           success: 'Cooool! You are logged in',
           error: 'Whooops... Wrong credentials'
        }
        const authCheck = yield req.auth.attempt(username, password)

        if (authCheck) {
           return res.redirect('/')
        }


        yield req
            .andWith({  error: loginMessage.error, username: username })
            .flash()

        res.redirect('/register')
        return

      }

    * logout(request, response) {
        yield request.auth.logout()

        return response.redirect('/')
    }

    *ajaxLogin(request, response){
        const username = request.input('username')
        const password = request.input('password')
        try {
            yield request.auth.attempt(username, password)
            response.ok({ success: true })
        } catch (ex) {
            response.ok({ success: false })
        }
    }

}

module.exports = LoginController
