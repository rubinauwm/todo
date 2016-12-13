var express = require('express'),
	logger = require('../../config/logger'),
  	router = express.Router()  ,

      mongoose = require('mongoose')
      User = mongoose.model('User')

       Todo = mongoose.model('Todo')

       passportService = require('../../config/passport')
       passport = require('passport')

var requireAuth = passport.authenticate('jwt', { session: false });
var requireLogin = passport.authenticate('local', { session: false });



module.exports = function (app) {
  	app.use('/api', router);  


      router.route('/users/follow/:id')

     .put(requireAuth,function (req, res, next) {
		logger.log('Update User ' + req.params.id, 'verbose');
		User.findOne({ _id: req.params.id }).exec()
			.then(function (user) {
				if (user.follow.indexOf(req.body._id) == -1) {
					user.follow.push(req.body._id);
					user.save()
						.then(function ( user) {
							res.status(200).json(user);
						})
						.catch(function (err) {
							return next(error);
						});
				}
			})
			.catch(function (err) {
				return next(err);
			});
		});

     
     
       //.put(function(req,res){
     //   logger.log("follow a user","verbose");
   //     res.status(200).json({msg: "follow a user"});

 //   });

     
     
      router.route('/users/followedChirps/:id')


      .get(requireAuth,function (req, res, next) {
      		logger.log('Get Users followed chirps ' + req.params.id, 'verbose');
      		User.findOne({ _id: req.params.id })
			.then(function(user){
	        			Todo.find({$or: [{ todoAuthor: user._id }, { todoAuthor: { $in: user.follow } }]})
				.populate('screenName')
				.sort('-dateCreated')
				.exec()
					.then(function (todo) {
						res.status(200).json(todo);
					})
			})
			.catch(function(err){
				return next(error);
			});
	});


      // .get(function(req,res){
       //   logger.log("get the chirps of the users a user follows","verbose");
     //     res.status(200).json({msg: "get the chirps of the users a user follows"});
   //   });

      
      
      router.route('/users/screenName/:name')


      .get(requireAuth,function (req, res, next) {
		logger.log('Get User ' + req.params.id, 'verbose');	
    		User.findOne({ screenName: req.params.name }).exec()	
			.then(function (user) {							res.status(200).json(user);
			})
			.catch(function (err) {
				return next(err);
			});
});


  //    .get(function(req,res){
    //      logger.log("get a user based on screen name","verbose");
      //    res.status(200).json({msg: "get a user based on screen name"});
     // });

	
    
    router.route('/users/:id')


.get(requireAuth,function (req, res, next) {
      logger.log('Get User ' + req.params.id, 'verbose');
      var query = User.findById(req.params.id)
        .exec()
        .then(function (result) {
          res.status(200).json(result);
        })
        .catch(function(err) {
          return next(err);
        });
    })

//    .get(function(req,res){
  //      logger.log("get a user","verbose");
    //    res.status(200).json({msg: "get a user"});
   // })

 .put(requireAuth,function (req, res, next) {
      logger.log('Update User ' + req.params.id, 'verbose');
      console.log(req.params.id)
      var query = User.findById(req.params.id)
        .exec()
        .then(function (user) {
 var query = User.findById(req.params.id)
        .exec()
        .then(function (user) {
          if (req.body.firstName !== undefined) {
            user.firstName = req.body.firstName;
          };
          if (req.body.lastName !== undefined) {
            user.lastName = req.body.lastName;
          };
          if (req.body.screenName !== undefined) {
            user.screenName = req.body.screenName;
          };
          if (req.body.email !== undefined) {
            user.email = req.body.email;
          };
          if (req.body.password !== undefined) {
            user.password = req.body.password;
          };

          return user.save();
        })
 .then(function(user) {
          res.status(200).json(user);
        })
        .catch(function (err) {
          return next(err);
        });
    })
})

.delete(requireAuth,function (req, res, next) {
      logger.log('Delete User ' + req.params.id, 'verbose');
      var query = User.remove({ _id: req.params.id })
        .exec()
        .then(function (result) {
          res.status(204).json({ message: 'Record deleted' });
        })
        .catch(function (err) {
          return next(err);
        });
    })

 //   .delete(function(req,res){
   //     logger.log("delete a user","verbose");
     //   res.status(200).json({msg: "delete a user"});
   // });
    
    
  
  
    router.route('/users')	

     .get(requireAuth,function (req, res, next) {
      logger.log('Get User', 'verbose');
      var query = User.find()
        .sort(req.query.order)
        .exec()
        .then(function (result) {
          res.status(200).json(result);
        })
        .catch(function(err){
          return next(err);
        });
    })


   // .get(function (req, res) {
	//		logger.log("Get all users","verbose");		
    //        res.status(200).json({msg: "GET all users"});
	//	})


        .post(function (req, res, next) {
      logger.log('Create User', 'verbose');
      var user = new User(req.body);
      user.save()
      .then(function (result) {
          res.status(201).json(result);
      })
      .catch(function(err){
         return next(err);
      });
    })


	//	.post(function(req, res){
	//		logger.log("Create a users","verbose");
	//		res.status(201).json({msg: "Create a user"});
	//	})


 .put(requireAuth,function (req, res, next) {
      logger.log('Update User ' + req.params.id, 'verbose');
      var query = User.findOneAndUpdate(
		{ _id: req.body._id }, 
		req.body, 
		{ new: true })
      .exec()
      .then(function (result) {
          res.status(200).json(result);
      })
      .catch(function(err){
          return next(err);
      });
    });
  //      .put(function(req,res){
    //    logger.log("update a user","verbose");
      //  res.status(200).json({msg: "update a user"});

//    });




}
router.route('/users/login')

.post(requireLogin, login);
