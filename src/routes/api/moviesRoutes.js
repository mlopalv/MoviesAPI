const express = require('express');
const router = express.Router();

const moviesController = require('../../controllers/api/moviesController');

router.get('/', moviesController.list);
router.get('/detail/:id', moviesController.detail);
router.post('/create', moviesController.create);
router.put('/update/:id', moviesController.update);
router.delete('/delete/:id', moviesController.destroy);



module.exports = router;