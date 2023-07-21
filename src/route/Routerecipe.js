const express = require('express');
const routeRecipe = express.Router();
const RecipeController = require('../controller/ControllerRecipe');
//=============================== Route Recipe ============================
routeRecipe.get('/', RecipeController.GetallRecipe);
routeRecipe.get('/:id', RecipeController.GetRecipebyId);
routeRecipe.post('/', RecipeController.CreateRecipe);
routeRecipe.put('/:id', RecipeController.UpdateRecipe);
routeRecipe.delete('/:id', RecipeController.DeleteRecipebyID);
routeRecipe.get('/searchbyname/:title', RecipeController.Searchbyname);
routeRecipe.get('/user/la', RecipeController.getDataDetail);
//================================= Export ===============================

module.exports = routeRecipe;
