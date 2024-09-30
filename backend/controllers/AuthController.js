import passport from 'passport';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { email, password, password2 } = req.body;
  let errors = [];

  if (!email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errors.push({ msg: 'Email already exists' });
      return res.status(400).json({ errors });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'You are now registered and can log in' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: 'You are logged in', user });
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.status(200).json({ message: 'You are logged out' });
  });
};

export const checkUserLoggedIn = (req, res) => {
    if (req.isAuthenticated()) {
      return res.status(200).json({ loggedIn: true, user: req.user });
    } else {
      return res.status(200).json({ loggedIn: false });
    }
  };