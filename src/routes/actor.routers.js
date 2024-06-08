const { getAll, create, getOne, remove, update } = require('../controllers/actor.controllers');
const express = require('express');

const actorRouters = express.Router();

actorRouters.route('/')
    .get(getAll)
    .post(create);

actorRouters.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = actorRouters;