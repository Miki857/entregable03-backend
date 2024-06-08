const express = require('express');
const router = express.Router();

// colocar las rutas aquí
const routerMovie = require('./movie.routers');
const routerActor = require('./actor.routers');
const routerGenre = require('./genre.routers');
const routerDirector = require('./director.routers');

router.use('/movies', routerMovie);
router.use('/actors', routerActor);
router.use('/directors', routerDirector);
router.use('/genres', routerGenre);

module.exports = router;