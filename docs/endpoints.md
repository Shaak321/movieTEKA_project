#End points:

* GET: / - Homepage

* GET: /createMovie - Page where the movies can be created
* POST: /createMovie - Sends in the datas and create the movie
* GET: /allMovies - Page with the lists of existing movies
* GET: /movieInfo/:id - Selected movie's informations (selected by id)
* POST: /movieInfo/:id - Selected movie's renting (change the is_rented value)
* GET: /delete/:id - Remove the selected movie from the database

* GET: /ownRents - Page with the list of rented movies
* GET: /rentInfo/:id - Rent information (selected by id)
* GET: /rentInfo/return/:id - Return the movie by changing it's "is_rented" value and remove from rented table

* GET: /ownProfile - current user's profile page
* GET: /users - list of users
* GET: /users/:id - user's minimal profile (name only)
* GET: /users/:id/profile - Selected user's full profile page
* GET: /addCoin - Feature which grants the current user virtual money

* GET: /register - Registering page
* GET: /login - Login page
* POST: /register - Sending in register informations
* POST: /login - Sending in login datas
* GET: /logout - Logout page
