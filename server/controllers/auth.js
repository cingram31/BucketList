var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config');

	function createUserToken(user){
		var timestamp = new Date().getTime();
		return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
	}

exports.signin = function(req, res, next){
	res.send({ token: createUserToken(req.user) });
}

exports.signup = function(req, res, next){
	//Test
	//res.send("authorization is happening, yo");
	//1
	var email = req.body.email;
	var password = req.body.password;
	
	//2
	if ( !email || !password){
		return res.status(418).send({error: 'Hey!!!!!!!!You must provide email and pw.'});
	}




	User.findOne({ email: email }, function(err, existingUser){
		if(err) {
			return next(err);
		}//handle search error

		if(existingUser){
			//return res.status(418).send(err);
			return res.status(418).send("Email is in use");
		
		}//handles existing users

		//3 Create a new user
		var user = new User({
			email: email,
			password: password
		});

		//To save the record to the DB.
		user.save(function(err){
			if(err) { return next(err); }
			
		//4 Respond to request indicating the user was created
			res.json({ token: createUserToken(user)});


		});
	});
}