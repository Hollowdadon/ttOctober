const mongoose = require('mongoose');
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;

const { ssnSecret } = require('../config');
const { ssnRegex } = require('../utils/regex');

const userInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: 'This field is required.',
    trim: true,
  },
  lastName: {
    type: String,
    required: 'This field is required.',
    trim: true,
  },
  phone: {
    type: String,
    required: 'This field is required.',
    trim: true,
    unique: true,
  },
  address: {
    type: String,
    required: 'This field is required.',
    trim: true,
  },
  ssn: {
    type: String,
    required: 'This field is required.',
    trim: true,
    unique: true,
  },
}, {
  timestamps: true
});

// custom validation for ssn -> should in format XXX-XX-XXXX where X is any digit from 0 to 9
userInfoSchema.path('ssn').validate((value) => {
  return ssnRegex.test(value);
}, 'Invalid SSN');

// plugins
userInfoSchema.plugin(mongooseFieldEncryption, { fields: ["ssn"], secret: ssnSecret });

module.exports = mongoose.model('UserInfo', userInfoSchema);
