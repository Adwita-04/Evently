const express = require('express');
const router = express.Router();
const { bookEvent, confirmBooking, getMyBookings, cancelBooking, sendBookingOTP ,getRecommendations,getBookingById} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

router.post('/send-otp', protect, sendBookingOTP);
router.post('/', protect, bookEvent);
router.get('/recommendations', protect, getRecommendations);
router.put('/:id/confirm', protect, admin, confirmBooking);
router.get('/my', protect, getMyBookings);
router.delete('/:id', protect, cancelBooking);
router.get('/:id', protect, getBookingById);
module.exports = router;