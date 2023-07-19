const express = require('express');
const routeRecipe = express.Router();
const RecipeController = require('../controller/ControllerRecipe');
//=============================== Route Recipe ============================
routeRecipe.get('/', RecipeController.GetallRecipe);
routeRecipe.get('/:id', RecipeController.GetRecipebyId);
routeRecipe.post('/', RecipeController.CreateRecipe);
routeRecipe.put('/:id', RecipeController.UpdateRecipe);
routeRecipe.delete('/:id', RecipeController.DeleteRecipebyID);
//================================= Export ===============================

module.exports = routeRecipe;
