const express = require('express');
const router = express.Router();

const genresController = require('../../controllers/api/moviesController');

router.get('/api/movies', moviesController.list);
router.get('/api/movies/detail/:id', moviesController.detail);


module.exports = router;