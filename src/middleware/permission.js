const Permissions = (req, res, next) => {
  console.log('Acces to Path ', req.path);
  next();
};

module.exports = Permissions;
