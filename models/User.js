const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    name: String,
    phone: String,
    date: { 
      type: Date,
      default: Date.now 
    },
    quotes: { 
      type: [String],
      default: []
    }
})


const User = mongoose.model('User', UserSchema)

module.exports = User