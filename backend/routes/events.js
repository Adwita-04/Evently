const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/auth');

//Anyone can see the data
router.get('/', getEvents);
router.get('/:id', getEventById);

//Admins can only modify the data create,modify,delete
router.post('/', protect, admin, createEvent);
router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;