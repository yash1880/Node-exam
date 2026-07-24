const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const recipeController = require("../controllers/recipeController");

router.get("/recipes", auth, recipeController.showRecipes);
router.get("/recipe/add", auth, recipeController.showRecipeForm);
router.post("/recipe/add", auth, recipeController.createRecipe);
router.get("/recipe/edit/:id", auth, recipeController.showEditForm);
router.post("/recipe/edit/:id", auth, recipeController.updateRecipe);
router.get("/myRecipes", auth, recipeController.showMyRecipes);
router.get("/recipe/delete/:id", auth, recipeController.deleteRecipe);
router.get("/recipe/:id", auth, recipeController.showRecipeDetail);

module.exports = router;
