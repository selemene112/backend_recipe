const { pool } = require('../config/db');

//================================================================== Get All ===========================
const GetdataRecipe = () => {
  const GetRecipeSql = 'SELECT * FROM recipe';

  return pool.query(GetRecipeSql);
};
//================================================================== Get by id =====================

const GetRecipebyId = (id) => {
  const sqlbyidRecipe = ' SELECT * FROM recipe WHERE id = $1 ';
  const values = [id];

  return pool.query(sqlbyidRecipe, values);
};

//======================================= create Recipe========================

const CreateRecipe = (body) => {
  const sqlCreateRecipe = `INSERT INTO recipe (title,ingredients,category,photo) VALUES ('${body.title}','${body.ingredients}','${body.category}','${body.photo}')`;

  return pool.query(sqlCreateRecipe);
};

//========================================== PUT recipe =====================

const UpdateRecipebyID = (id, newData) => {
  const sqlUpdateRecipe = 'UPDATE recipe SET title = $1, ingredients= $2, category= $3, photo= $4  WHERE id = $5';

  const values = [newData.title, newData.ingredients, newData.category, newData.photo, id];

  return pool.query(sqlUpdateRecipe, values);
};
//=========================================== Delete Recipe==============================

const DeleteRecipebyId = (id) => {
  const sqlDeleteRecipe = 'DELETE FROM recipe WHERE  id = $1';
  const values = [id];

  return pool.query(sqlDeleteRecipe, values);
};

//=================================================================== EXPORT ========================

module.exports = {
  GetdataRecipe,
  GetRecipebyId,
  CreateRecipe,
  UpdateRecipebyID,
  DeleteRecipebyId,
};
