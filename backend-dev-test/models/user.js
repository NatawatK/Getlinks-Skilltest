const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema(
	{
        username : {type : String, required : true , unique : true},
        password : {type : String, required : true , unique : true},
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        firstname : String,
        lastname : String
	}
);
UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
      return bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.password = hash;
        next();
      });
    }
    next();
  });

UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);
const User = mongoose.model('User', UserSchema);
module.exports = User;