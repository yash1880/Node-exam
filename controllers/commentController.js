const Comment = require('../models/commentModel');

exports.addComment = async (req, res) => {
  try {
    await Comment.create({
      text: req.body.text,
      recipeId: req.params.id,
      userId: req.user._id
    });
    res.redirect('/recipes');
  } catch (error) {
    res.status(500).send('Failed to add comment');
  }
};
