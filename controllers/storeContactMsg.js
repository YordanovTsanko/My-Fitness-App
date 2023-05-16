const ContactMsg = require('../models/ContactMsg.js')


module.exports = (req, res) => {
   const storeBodyMsg = { name: req.body[0], phone: req.body[1], email: req.body[2], message: req.body[3] }
   ContactMsg.create(storeBodyMsg)
}