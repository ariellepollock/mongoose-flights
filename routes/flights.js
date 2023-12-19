const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');
const ticketsCtrl = require('../controllers/tickets');

router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:id', flightsCtrl.show)
router.post('/', flightsCtrl.create)

router.get('/:id/tickets/new', flightsCtrl.show)
router.post('/:id/tickets', ticketsCtrl.create)

module.exports = router;
