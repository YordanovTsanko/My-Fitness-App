const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContactIndexSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    message: String,
    date: { 
      type: Date,
      default: Date.now 
    }
})


const ContactMsg = mongoose.model('ContactMsg', ContactIndexSchema)

module.exports = ContactMsg