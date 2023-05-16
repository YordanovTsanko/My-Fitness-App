const User = require('../models/User.js')
const bcrypt = require('bcrypt');

async function storeUser(req, res) {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z\d]{8,}$/
    if (await User.findOne({ email: req.body.emailRegister })) {
        return res.render('sign-in', { error: 'User Exist', boxSide: 'back', boxSideHelper: 'front', deg: 540, degHelper: 0 })
    } else {
        if (!passwordRegex.test(req.body.passwordRegister)) {
            return res.render('sign-in', { error: 'Password must contain 8 characters and a capital lettere', boxSide: 'back', boxSideHelper: 'front', deg: 540, degHelper: 0 })
        }
        if (req.body.passwordRegister !== req.body.repeatPasswordRegister) {
            return res.render('sign-in', { error: 'Password Not Match', boxSide: 'back', boxSideHelper: 'front', deg: 540, degHelper: 0 })
        } else {
            try {
                const hashedPassword = await bcrypt.hash(req.body.passwordRegister, 10);
                User.create({
                    email: req.body.emailRegister,
                    password: hashedPassword,
                    name: 'Name',
                    phone: '098098e'
                })
                res.redirect('/sign-in')
            } catch (e) {
                res.redirect('/sign-in')
                console.log(e)
            }
        }
    }
}

module.exports = {
    storeUser
};