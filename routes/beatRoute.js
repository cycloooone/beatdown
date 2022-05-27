const express = require('express')
const path = require('path');
const beatController = require('../controllers/beatController')
const router = express.Router();
router.post('/', beatController.create);
router.get('/', beatController.findAll);
router.get('/:id', beatController.findOne);
router.get('/:id/edit', beatController.findOneEdit);
router.post('/find/', beatController.findByTitle);
router.patch('/:id', beatController.update);
router.delete('/:id', beatController.destroy);
module.exports = router