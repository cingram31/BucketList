var Auth = require('./controllers/auth'); //include the authorization controller
var passportService = require('./services/passport'); 
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function(app){  //sets routes

	app.get('/', requireAuth, function(req, res){
		res.send('Hello Homepage');
		//res.send({hi: 'there'});
	});
	
	app.post('/signup', Auth.signup);
}






/*module.exports = function(app){
	app.get('/', function(req, res, next){
		res.send("HELLO HOMEPAGE");
	});

	app.get('/signup', function(req, res, next){
		res.send("Hey folks, Thanks for signing up!");
	});
}*/