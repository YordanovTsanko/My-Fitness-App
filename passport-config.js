const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const session = require('express-session')

function initialize(passport, getUserByEmail, getUserById) {
    //func to auth user
    const authUser = async (email, password, done) => {
        //get user by email
        const user = await getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: "No User Found" })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Wrong Passowrd"})
            }
        } catch(e){
            console.log(e)
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authUser))
    passport.serializeUser((user, done)=>{
        return done(null,user.id)
    })
    passport.deserializeUser((id, done)=>{
       return done(null, getUserById(id))
    })
}


module.exports = initialize