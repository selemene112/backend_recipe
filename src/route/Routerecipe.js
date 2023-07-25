const express = require('express');
const routeRecipe = express.Router();
const RecipeController = require('../controller/ControllerRecipe');
const jwt = require('../middleware/jwt');

//=============================== Route Recipe ============================
routeRecipe.get('/', jwt.VertifikasiToken, RecipeController.GetallRecipe);
routeRecipe.get('/:id', jwt.VertifikasiToken, RecipeController.GetRecipebyId);
routeRecipe.post('/', jwt.VertifikasiToken, RecipeController.CreateRecipe);
routeRecipe.put('/:id', jwt.VertifikasiToken, RecipeController.UpdateRecipe);
routeRecipe.delete('/:id', jwt.VertifikasiToken, RecipeController.DeleteRecipebyID);
routeRecipe.get('/searchbyname/:title', jwt.VertifikasiToken, RecipeController.Searchbyname);
routeRecipe.get('/user/la', RecipeController.getDataDetail);
//================================= Export ===============================

module.exports = routeRecipe;
