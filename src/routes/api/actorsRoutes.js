const express = require('express');
const router = express.Router();

const genresController = require('../../controllers/api/actorsController');

router.get('/api/actors', actorsController.list);
router.get('/api/actors/detail/:id', actorsController.detail);


module.exports = router;