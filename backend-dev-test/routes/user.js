/**
 * Module Dependencies
 */
const errors = require('restify-errors');
/**
 * Model Schema
 */
const User = require('../models/user');
module.exports = function(server) {
	/**
	 * POST
	 */
	server.post('/user/register', (req, res, next) => {
		if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			);
        }
        console.log(req.body)
		let data = req.body || {};
        let user = new User(data);
        console.log(data)
		user.save(function(err) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
				next();
			}
			res.send(201);
			next();
		});
    });
    server.post('/user/login', (req,res,next) => {
        if (!req.is('application/json')){
            return next(
				new errors.InvalidContentError("Expects 'application/json'"),
			);
        }
        console.log(req.body)
        let data = req.body || {};
        User.findOne({ username: req.body.username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) { return res.status(400).json({message: 'user not founded!'}); }
			if (!user.verifyPassword(req.body.password)) { return res.status(400).json({message: 'password is incorrect!'});  }
			return jres.status(200);
		});
    });
	/**
	 * LIST
	 */
	server.get('/users', (req, res, next) => {
		User.apiQuery(req.params, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}
			res.send(docs);
			next();
		});
	});
};