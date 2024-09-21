const express = require('express');
const router = express.Router();

const moviesController = require('../../controllers/api/moviesController');

router.get('/api/movies', moviesController.list);
router.get('/api/movies/detail/:id', moviesController.detail);
router.post('/api/movies/create', moviesController.create);
router.put('/api/movies/update/:id', moviesController.update);


module.exports = router;