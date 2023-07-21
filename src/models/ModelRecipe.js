const { pool } = require('../config/db');

//================================================================== Get All ===========================
const GetdataRecipe = () => {
  const GetRecipeSql = 'SELECT * FROM recipe';

  return pool.query(GetRecipeSql);
};
//================================================================== Get by id =====================

const GetRecipebyId1 = (id) => {
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
//============================================ Search by name==============================

const SearchByname = (body) => {
  const sqlSearchByname = 'SELECT * FROM recipe WHERE title = $1';
  const values = [body.title];

  return pool.query(sqlSearchByname, values);
};

//============================================= Sort and pagnation ==============================

const getRecipe = async (data) => {
  const { search, searchBy, offset, limit } = data;
  console.log('model getRecipe', search, searchBy, offset, limit);
  try {
    const result = await pool.query(
      `SELECT recipe.id, recipe.title, recipe.ingredients, recipe.photo, category.name AS category
    FROM recipe
    JOIN category ON recipe.category = category.name
    WHERE ${searchBy} ILIKE $1
    LIMIT $2
    OFFSET $3`,
      [`%${search}%`, limit, offset]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

const getRecipeCount = async (data) => {
  const { search, searchBy } = data;
  console.log('model getRecipeCount', search, searchBy);
  try {
    const result = await pool.query(
      `SELECT recipe.id, recipe.title, recipe.ingredients, recipe.photo, category.name AS category
    FROM recipe
    JOIN category ON recipe.category = category.name
    WHERE ${searchBy} ILIKE $1`,
      [`%${search}%`]
    );
    return result;
  } catch (err) {
    throw err; // Tambahkan try-catch dan lempar kesalahan dengan throw
  }
};

//=================================================================== EXPORT ========================

module.exports = {
  GetdataRecipe,
  GetRecipebyId1,
  CreateRecipe,
  UpdateRecipebyID,
  DeleteRecipebyId,
  SearchByname,
  getRecipe,
  getRecipeCount,
};
