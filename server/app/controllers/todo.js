var express = require('express'),
	logger = require('../../config/logger'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Todo = mongoose.model('Todo');
passportService = require('../../config/passport')
passport = require('passport')


var requireAuth = passport.authenticate('jwt', { session: false });
// var requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
	app.use('/api', router);


	router.route('/todos/like/:id')


		.put(requireAuth, function (req, res, next) {
			logger.log('Update Todo ' + req.params.id, 'debug');
			Todo.findOne({ _id: req.params.id }).exec()
				.then(function (todo) {
					todo.likes++;
					return todo.save();
				})
				.then(function (todo) {
					res.status(200).json(todo);
				})
				.catch(function (err) {
					return next(err);
				});
		});



	//.put(function (req, res) {
	//	logger.log("like a chirp","verbose");		
	//      res.status(200).json({msg: "like a chirp"});
	//	});

	router.route('/todos/userTodo/:id')


		.get(requireAuth, function (req, res, next) {
			logger.log('Get User Todo ' + req.params.id, 'verbose');
			Todo.find({ todoAuthor: req.params.id })
				.populate('todoAuthor')
				.sort("-dateCreated")
				.exec()
				.then(function (todo) {
					res.status(200).json(todo);
				})
				.catch(function (err) {
					return next(err);
				})
		});




	// .get(function (req, res) {
	//			logger.log("Get a user's chirps","verbose");		
	//          res.status(200).json({msg: "GET a user's chirps"});
	//	});


	router.route('/todos/:id')

		.get(requireAuth, function (req, res) {
			logger.log("Get a todo", "verbose");
			res.status(200).json({ msg: "GET a todo" });
		})

		.delete(requireAuth, function (req, res) {

			console.log(req.params.id)
			Todo.remove({ _id: req.params.id }, function (err, result) {
				if (err) {
					return next(err);
				} else {
					res.status(204).json({ message: 'Record Deleted' });
				}
			});
		});




	router.route('/todos')

		.get(requireAuth, function (req, res) {
			logger.log("Get all todo", "verbose");
			Todo.find()
				.exec()
				.then(function (todo) {
					res.status(200).json(todo);
				})

		})

		.post(requireAuth, function (req, res, next) {
			logger.log('Create todo', 'verbose');
			var todo = new Todo(req.body);
			todo.save()
				.then(function (result) {
					res.status(201).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})


		//.post(function (req, res) {
		//			logger.log("create a chirps","verbose");		
		//          res.status(201).json({msg: "create a chirps"});
		//	})  


		.put(requireAuth, function (req, res, next) {
			logger.log('update record' + req.params.id, 'verbose');
			var query = Todo.findOneAndUpdate(
				{ _id: req.body._id },
				req.body,
				{ _id: true })
				.exec()
				.then(function (result) {
					res.status(200).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		}

		)}