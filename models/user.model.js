const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'username already exists'],
    trim: true,
    minlength: 5
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'email already exists'],
    trim: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
},
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);

// const validateEmail = function(email) {
//   const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email)
// };

// const EmailSchema = new Schema({
//   email: {
//       type: String,
//       trim: true,
//       lowercase: true,
//       unique: true,
//       required: 'Email address is required',
//       validate: [validateEmail, 'Please fill a valid email address'],
//       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//   }
// });

// const Email = mongoose.model('Email', EmailSchema);

module.exports = User
