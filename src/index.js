require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const RouteUser = require('./route/user.js');
const routeRecipe = require('./route/Routerecipe.js');
const middlewares = require('./middleware/permission.js');
// const db = require('./config/db.js');
const routeCategory = require('./route/RouteCategory.js');
const app = express();

//===================================Import file====================================
// app.use(middlewares);
app.use(middlewares);
app.use(express.json());

/**
 * endpoint root
 * to check root endpoint
 */
app.get('/api/v1/', (req, res) => {
  res.status(200).json({
    message: 'hello world!!!',
  });
});

//user endpoint
app.use('/api/v1/recipe', routeRecipe);
app.use('/api/v1/user', RouteUser);
app.use('/api/v1/category', routeCategory);
// app.use('/api/v1/coba', routeujicoba);

app.listen(PORT, () => {
  console.log(`Server Running On Port '${PORT}'`);
});
