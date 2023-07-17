const jwt = require('jsonwebtoken');
const secretKey = 'secretKey123';

const VertifikasiToken = (req, res, next) => {
  //   console.log(req.header);
  //   console.log(token);
  const generateToken = req.header('Authorization');
  const token = generateToken.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, secretKey);
    req.id = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

const generateToken = (req, res) => {
  const { id } = req;

  try {
    // Buat token dengan payload berisi ID pengguna
    const token = jwt.sign({ id }, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Token generated successfully',
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating token',
      error: error.message,
    });
  }
};

module.exports = {
  VertifikasiToken,
  generateToken,
};
