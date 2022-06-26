const express = require('express')
const router = express.Router()
const event = require('../controllers/eventController')

router.get('/', event.getAllEvents)
router.get('/:id', event.getEventById)

router.post('/', event.createEvent)

module.exports = router