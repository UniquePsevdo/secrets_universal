const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({
		sub: user.id,
		iat: timestamp,
		exp: Math.round(Date.now() / 1000 ) + 65*60         //65*60=3900 in seconds = 65min
	}, config.secret);
}

function refreshTokenForUser(user) {
	return jwt.encode({
		sub: user.id,
		exp: Math.round(Date.now() / 1000 ) + 2*65*60       //65*60=3900 in seconds = 130min
	}, config.secret);
}

exports.register = function (req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
	
	//see if a user with a given name exist
	User.findOne({email: email}, function (err, existingUser) {
		if (err) {
			return next(err);
		}
		
		if (!email || !password) {
			return res.status(422).send({error: 'You must provide email and password'});
		}
		
		//if a user exist return error
		if (existingUser) {
			return res.status(422).send({error: 'Email is in use'});
		}
		
		//if user does not exist - create
		const user = new User({
			email: email,
			password: password
		})
		
		user.save(function (err) {
			if (err) {
				return next(err);
			}
			res.json({token: tokenForUser(user)});
		});
	});
	//respond user was created
}

exports.login = function (req, res, next) {
	console.log('req.user', req.user);
	//give a token to user
	res.send({token: tokenForUser(req.user), refresh_token: refreshTokenForUser(req.user)});
}