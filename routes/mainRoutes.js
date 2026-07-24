const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.get('/', async (req, res) => {
  try {
    const token = req.cookies.jwt;
    let user = null;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      user = await User.findById(decoded.id).select('-password');
    }
    res.render('home', { user });
  } catch (error) {
    res.render('home', { user: null });
  }
});

module.exports = router;
