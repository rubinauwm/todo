var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
    Bcrypt = require('bcryptjs');


var userSchema = new Schema({
  firstName: { type: String, required: true}, 
  lastName: { type: String, required:true},
  dateRegistered: { type: Date, default: Date.now },
  screenName: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  follow: [{type: Schema.Types.ObjectId, ref: 'user'}]
});


userSchema.pre('save', function (next) {
    var person = this;
    if (this.isModified('password') || this.isNew) { 
       Bcrypt.genSalt(10, function (err, salt) {
            if (err) { 
               return next(err); 
           }
            Bcrypt.hash(person.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                person.password = hash;
                next();
            });
        });
    } else { 
       return next();
    }
});


userSchema.methods.comparePassword = function (passw, cb) {
    Bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = Mongoose.model('User', userSchema);

    


