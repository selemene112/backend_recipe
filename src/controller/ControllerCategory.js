const ModelCategory = require('../models/Category');

const GetControllerCategory = async (req, res) => {
  try {
    const result = await ModelCategory.GetdataCategory();
    const data = result.rows;

    res.status(200).json({
      massage: ' Category ',
      succes: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: ' Your Request Vaild ',
      error: error.message,
      succes: false,
      data: null,
    });
  }
};

module.exports = {
  GetControllerCategory,
};
