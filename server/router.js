var Auth = require('./controllers/auth'); //include the authorization controller
var BucketList = require('./controllers/bucketlistcontroller');

var passportService = require('./services/passport'); 
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){  //sets routes

	app.get('/', requireAuth, function(req, res){
		//res.send('Hello Homepage');
		res.send({message: 'Hi there'});
	});
	
	
	app.post('/signup', Auth.signup);
	app.post('/signin', requireSignin, Auth.signin);
	app.post('/newitem', requireAuth, BucketList.addBucketList);
	app.get('/items', requireAuth, BucketList.fetchBucketLists);
	app.get('/items/:id', requireAuth, BucketList.fetchBucketList);
	app.put('/items/:id', requireAuth, BucketList.updateBucketList);
	app.delete('/items/:id', requireAuth, BucketList.deleteBucketList);
}






/*module.exports = function(app){
	app.get('/', function(req, res, next){
		res.send("HELLO HOMEPAGE");
	});

	app.get('/signup', function(req, res, next){
		res.send("Hey folks, Thanks for signing up!");
	});
}*/