const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');

router.get('/', ventasController.index);
router.post('/', ventasController.create);

module.exports = router;