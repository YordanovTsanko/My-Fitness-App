const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    default: 'Грешка'
  },
  phone: {
    type: String,
    maxlength: 50,
    default: 'Грешка'
  },
  email: {
    type: String,
    maxlength: 50,
    default: 'Грешка'
  },
  make: {
    type: String,
    maxlength: 50,
    default: 'Грешка'
  },
  model: {
    type: String,
    maxlength: 50,
    default: 'Грешка'
  },
  option: {
    type: String,
    minlength: 3,
    maxlength: 50,
    default: 'Грешка'
  },
  pickUp: {
    type: String,
    maxlength: 150,
    default: 'Грешка'
  },
  dropOff: {
    type: String,
    maxlength: 150,
    default: 'Грешка'
  },
  datePaid: {
    type: Date,
    default: Date.now
  },
  process: {
    type: String,
    default: 'Pending'
  },
  price: {
    type: Number,
    default: 0
  },
  time: {
    type: String,
    default: 'No Time'
  },
  lat: {
    type: Number,
    default: 0
  },
  long: {
    type: Number,
    default: 0
  },
  clientDevice: {
    type: String,
    default: 'Unknown Device'
  },
  clientIP: {
    type: String,
    default: 'No IP Show'
  },
  traceID: {
    type:String,
    default : 'ERRORERRORERROR!'
  }
})


const Booking = mongoose.model('Bookings', BookingSchema)

module.exports = Booking