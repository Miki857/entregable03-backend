const { getAll, create, getOne, remove, update, setGenres, setDirectors, setActors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouters = express.Router();

//Static Routers
movieRouters.route('/')
    .get(getAll)
    .post(create);
    
//Hibrid Routers
movieRouters.route('/:id/genres')
    .post(setGenres);
movieRouters.route('/:id/actors')
    .post(setActors);
movieRouters.route('/:id/directors')
    .post(setDirectors);

//Dinamic Routers:
movieRouters.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = movieRouters;