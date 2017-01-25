#Test cases:
**-Warning: every test case built on eachother. It can fail without the previous ones-

	Admin login:
	* Create an admin user and log in with the admin user (can be failed test if the admin user exists)
	New movie create:
	* After it logged in with admin user, it creates a new movie in the database (can be failed if not logged in with admin user from previous test case)
	Register and login:
	* Log out from admin user and register as a new user and log in with it (can be failed if the user exists)
	Rent new movie:
	* With the new user it goes to the movie list and rent one.
	Return rented movie:
	* Using the return movie feature
	
###Tests are created with SELENIUM IDE