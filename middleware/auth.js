const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.redirect('/login');

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.redirect('/login');

    req.user = user;
    next();
  } catch (error) {
    res.redirect('/login');
  }
};
