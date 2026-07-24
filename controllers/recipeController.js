const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');

/**
 * Helper to check if the current user owns a recipe.
 * Works with both populated and non-populated createdBy.
 */
function checkOwnership(recipe, user) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  
  // Get the createdBy ID as string regardless of populated or not
  let ownerId = null;
  if (recipe.createdBy) {
    if (typeof recipe.createdBy === 'object' && recipe.createdBy._id) {
      ownerId = recipe.createdBy._id.toString();
    } else {
      ownerId = recipe.createdBy.toString();
    }
  }
  
  return ownerId === user._id.toString();
}

exports.showRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).populate('createdBy', '_id username role');
    // Convert to plain objects and attach isOwner flag
    const enrichedRecipes = recipes.map(recipe => {
      const recipeObj = recipe.toObject();
      recipeObj.isOwner = checkOwnership(recipe, req.user);
      return recipeObj;
    });
    res.render('recipeList', { recipes: enrichedRecipes, user: req.user });
  } catch (error) {
    console.error('showRecipes error:', error);
    res.status(500).send('Failed to render recipes');
  }
};

exports.showMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user._id }).populate('createdBy', 'username role');
    const enrichedRecipes = recipes.map(recipe => {
      const recipeObj = recipe.toObject ? recipe.toObject() : recipe;
      recipeObj.isOwner = true; // Always true for My Recipes
      return recipeObj;
    });
    res.render('myRecipes', { recipes: enrichedRecipes, user: req.user });
  } catch (error) {
    console.error('showMyRecipes error:', error);
    res.status(500).send('Failed to render my recipes');
  }
};

exports.showRecipeForm = (req, res) => {
  res.render('recipeForm', { recipe: {}, mode: 'create', user: req.user });
};

exports.showEditForm = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'username role');
    if (!recipe) return res.status(404).send('Recipe not found');
    if (recipe.createdBy._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).send('Access denied');
    }
    res.render('recipeForm', { recipe, mode: 'edit', user: req.user });
  } catch (error) {
    res.status(500).send('Failed to load edit form');
  }
};

exports.showRecipeDetail = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('createdBy', '_id username role');
    if (!recipe) return res.status(404).send('Recipe not found');

    // Attach isOwner flag
    const recipeObj = recipe.toObject ? recipe.toObject() : recipe;
    // Handle both populated ({ _id, username, role }) and non-populated (ObjectId) cases
    const createdById = recipe.createdBy
      ? (recipe.createdBy._id ? recipe.createdBy._id.toString() : recipe.createdBy.toString())
      : null;
    const userId = req.user ? req.user._id.toString() : null;
    recipeObj.isOwner = req.user && (
      createdById === userId ||
      req.user.role === 'admin'
    );

    res.render('recipeDetail', { recipe: recipeObj, user: req.user });
  } catch (error) {
    console.error('showRecipeDetail error:', error);
    res.status(500).send('Failed to render recipe details');
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const recipeData = {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl || '',
      ingredients: req.body.ingredients.split(',').map(item => item.trim()),
      instructions: req.body.instructions.split(',').map(item => item.trim()),
      category: req.body.category || 'General',
      createdBy: req.user._id
    };

    const recipe = await Recipe.create(recipeData);
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { recipes: recipe._id } });
    res.redirect('/recipes');
  } catch (error) {
    console.error('createRecipe error:', error);
    res.status(500).send('Failed to create recipe');
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');
    const ownerId = recipe.createdBy?._id ? recipe.createdBy._id.toString() : recipe.createdBy.toString();
    if (ownerId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).send('Access denied');
    }
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl || '',
      ingredients: req.body.ingredients.split(',').map(item => item.trim()),
      instructions: req.body.instructions.split(',').map(item => item.trim()),
      category: req.body.category || 'General'
    };
    await Recipe.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect('/recipe/' + req.params.id);
  } catch (error) {
    console.error('updateRecipe error:', error);
    res.status(500).send('Failed to update recipe');
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');

    // Handle both populated and non-populated createdBy
    const ownerId = recipe.createdBy?._id ? recipe.createdBy._id.toString() : recipe.createdBy.toString();
    if (req.user.role !== 'admin' && ownerId !== req.user._id.toString()) {
      return res.status(403).send('Access denied');
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/myRecipes');
  } catch (error) {
    console.error('deleteRecipe error:', error);
    res.status(500).send('Failed to delete recipe');
  }
};
