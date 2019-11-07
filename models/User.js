const { Schema, model } = require('mongoose')
const bcrypt = require('../helpers/bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please input your email'],
    validate: {
      validator: function (v) {
        let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        return emailRegex.test(v)
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  username : {
    type: String,
    required: [true, 'Please input your username']
  },
  password: {
    type: String,
    required: [true, 'Please input your password'],
    minlength: [8, 'Please input minimum 8 characters']
  }
})

userSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase()
  this.password = bcrypt.hash(this.password)
  next()
})

const User = model('User', userSchema)

module.exports = User