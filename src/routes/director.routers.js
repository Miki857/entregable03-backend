const { getAll, create, getOne, remove, update } = require('../controllers/director.controllers');
const express = require('express');

const directorRouters = express.Router();

directorRouters.route('/')
    .get(getAll)
    .post(create);

directorRouters.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = directorRouters;