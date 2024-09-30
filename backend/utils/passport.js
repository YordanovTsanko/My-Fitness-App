import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import User from "../models/User.js";

export default function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }

          if (!user.isValidPassword(password)) {
            return done(null, false, { message: "Password incorrect" });
          }

          return done(null, user);
        })
        .catch((err) => console.error(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
