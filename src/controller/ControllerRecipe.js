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
  const result = await Modelrecipe.GetRecipebyId1(id);
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
//========================================= Search by name========================

const Searchbyname = async (req, res) => {
  const { title } = req.params;
  const result = await Modelrecipe.SearchByname({ title: title });
  const data = result.rows;
  try {
    res.status(200).json({
      message: ' Data By name ',
      succes: true,
      error: null,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: ' Data Not Found',
      succes: false,
      error: error.message,
      data: null,
    });
  }
};

//========================================== Pagnation ==========================

const getDataDetail = async (req, res, next) => {
  const { search, searchBy, limit } = req.query;

  let page = req.query.page || 1;
  let limiter = limit || 5;

  const data = {
    search: search || '',
    searchBy: searchBy || 'title',
    offset: (page - 1) * limiter,
    limit: limit || 5,
  };

  try {
    let dataRecipe = await Modelrecipe.getRecipe(data);
    let dataRecipeCount = await Modelrecipe.getRecipeCount(data);

    let pagination = {
      totalPage: Math.ceil(dataRecipeCount.rowCount / limiter),
      totalData: parseInt(dataRecipeCount.rowCount),
      pageNow: parseInt(page),
    };

    console.log('dataRecipe');
    console.log(dataRecipe);
    console.log('total data');
    console.log(dataRecipeCount.rowCount);

    res.status(200).json({
      status: 200,
      message: 'get data recipe success',
      data: dataRecipe.rows,
      pagination,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Failed to get data recipe',
      error: err.message, // Menambahkan informasi kesalahan ke respons JSON
      data: null,
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
  Searchbyname,
  getDataDetail,
};
