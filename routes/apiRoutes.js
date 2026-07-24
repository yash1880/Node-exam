const express = require('express');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const { showRecipes, getRecipes, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const { getComments, createComment, deleteComment } = require('../controllers/commentController');

const router = express.Router();

router.get('/recipes/view', authenticate, showRecipes);
router.get('/api/recipes', authenticate, getRecipes);
router.post('/api/recipes', authenticate, createRecipe);
router.put('/api/recipes/:id', authenticate, updateRecipe);
router.delete('/api/recipes/:id', authenticate, deleteRecipe);

router.get('/api/recipes/:recipeId/comments', authenticate, getComments);
router.post('/api/recipes/:recipeId/comments', authenticate, createComment);
router.delete('/api/comments/:id', authenticate, deleteComment);

router.get('/admin', authenticate, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Admin access granted', user: req.user });
});

module.exports = router;
