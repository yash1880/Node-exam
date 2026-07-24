const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '1d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).render('register', { error: 'Please provide all required fields.', user: null });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).render('register', { error: 'User already exists.', user: null });
    }

    const user = await User.create({ username, email, password, role: role || 'user' });
    const token = createToken(user);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.redirect('/recipes');
  } catch (error) {
    res.status(500).render('register', { error: 'Registration failed. Please try again.', user: null });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render('login', { error: 'Please provide email and password.', user: null });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).render('login', { error: 'Invalid credentials.', user: null });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).render('login', { error: 'Invalid credentials.', user: null });
    }

    const token = createToken(user);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.redirect('/recipes');
  } catch (error) {
    res.status(500).render('login', { error: 'Login failed. Please try again.', user: null });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/login');
};
