const { getAll, create, getOne, remove, update } = require('../controllers/genre.controllers');
const express = require('express');

const genreRouters = express.Router();

genreRouters.route('/')
    .get(getAll)
    .post(create);

genreRouters.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = genreRouters;