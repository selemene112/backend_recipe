const { pool } = require('../config/db');
const Modelrecipe = require('../models/ModelRecipe');

//=========================== GET Data Recipe========

const GetallRecipe = async (req, res) => {
  try {
    const result = await Modelrecipe.GetdataRecipe();
    const recipe = result.rows;
    res.status(200).json({
      message: 'View Get All Data',
      success: true,
      error: null,
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      message: ' Data Not Yet',
      success: false,
      error: error,
      data: null,
    });
  }
};
//======================================= GET Recipe by id ==============================
const GetRecipebyId = async (req, res) => {
  const id = req.params.id;
  const result = await Modelrecipe.GetRecipebyId(id);
  const recipe = result.rows[0];

  try {
    if (!recipe) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });

      return;
    }

    res.status(200).json({
      message: 'Data Profile',
      success: true,
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      message: 'retrieving Recipe data',
      error: error.message,
      data: null,
    });
  }
};

//====================================== POST RECIPE========================
const CreateRecipe = async (req, res) => {
  const bodyquery = req.body;
  try {
    await Modelrecipe.CreateRecipe(bodyquery);
    res.status(200).json({
      message: 'Create Data Succes',
      success: true,
      error: null,
      data: bodyquery,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: ' CREATE DATA ERROR',
      success: false,
      error: error,
      data: null,
    });
  }
};

//===================================== Update======================================
const UpdateRecipe = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    await Modelrecipe.UpdateRecipebyID(id, newData);
    res.status(200).json({
      message: 'Create Data Succes ',
      success: true,
      error: null,
      data: newData,
    });
  } catch (error) {
    res.status(500).json({
      message: ' CREATE DATA ERROR',
      success: false,
      error: error,
      data: null,
    });
  }
};

//======================================= Delete =============================
const DeleteRecipebyID = async (req, res) => {
  const { id } = req.params;
  try {
    await Modelrecipe.DeleteRecipebyId(id);
    res.status(200).json({
      success: true,
      message: ' Delete Data Succes',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message,
    });
  }
};
//===================================== EXPORT ==========================

module.exports = {
  GetallRecipe,
  GetRecipebyId,
  CreateRecipe,
  UpdateRecipe,
  DeleteRecipebyID,
};
