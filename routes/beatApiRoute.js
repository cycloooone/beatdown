const express = require('express')
const path = require('path');
const beatController = require('../controllers/beatApiController')
const router = express.Router();
router.post('/add/', beatController.create);
router.get('/', beatController.findAll);
router.get('/:id', beatController.findOne);
router.post('/find/', beatController.findByTitle);
router.patch('/:id/update/', beatController.update);
router.delete('/:id/delete/', beatController.destroy);
module.exports = router