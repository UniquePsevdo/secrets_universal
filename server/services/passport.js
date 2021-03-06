const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const JwtBearerStrategy = require('passport-http-bearer').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const jwt = require('jwt-simple');

//create local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
	//verify this email and password, call done with the user
	//if it is the correct email and password
	//otherwise call done with false
	User.findOne({email: email}, function (err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}
		//compare passwords
		user.comparePassword(password, function (err, isMatch) {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}
			
			return done(null, user);
		})
	})
});

//setup options for jwt
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
	secretOrKey: config.secret
};


//create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	//see if the user id in the payload exist in the db
	//if it does call daone
	//otherwise, call done without a user object
	User.findById(payload.sub, function (err, user) {
		if (err) {
			return done(err, false);
		}
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	})
	
});

//create jwt strategy
const jwtBearer = new JwtBearerStrategy(function (token, done) {
	let decoded;
	let alowSearch = true;
	try {
		decoded = jwt.decode(token, config.secret);
	} catch (err) {
		alowSearch = false;
		done(null, false);
	}
	if (alowSearch) {
		User.findById(decoded.sub, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		})
	}
});

//tell passport to use strategy
passport.use(jwtLogin);
passport.use(jwtBearer);
passport.use(localLogin);