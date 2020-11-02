const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { passSaltFactor } = require('../config');
const SALT_WORK_FACTOR = Math.max(parseInt(passSaltFactor, 10), 12); // make sure there is at least 12 factor

const { emailRegExp } = require('../utils/regex');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      match: [emailRegExp, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: 'This field is required.',
      trim: true,
      minlength: 8,
    },
    role: {
      type: String,
      trim: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// middlewares
UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// custom methods
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
