const bcrypt = require('bcryptjs');
const hashPasswordMiddleware = async (req, res, next) => {
  try {
    if (req.body.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashedPassword;
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error hashing password',
      error: error.message,
    });
  }
};

module.exports = hashPasswordMiddleware;
