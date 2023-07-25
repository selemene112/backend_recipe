const express = require('express');
const route1 = express.Router();
const Userdicoba = require('../models/user1');

route1.post('/', Userdicoba.upload, Userdicoba.uploadUserPhoto);

module.exports = route1;
