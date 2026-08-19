const Booking = require('../models/Booking.js');
const Event = require('../models/Event.js');
const OTP = require('../models/OTP.js');
const { sendBookingEmail, sendOTPEmail } = require('../utils/email');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const generateTicketNumber = () => {
    return `EV-${Date.now()}-${Math.floor(
        1000 + Math.random() * 9000
    )}`;
};
exports.sendBookingOTP = async (req, res) => {
    try {
        const otp = generateOTP();
        await OTP.findOneAndDelete({ email: req.user.email, action: 'event_booking' });
        await OTP.create({ email: req.user.email, otp, action: 'event_booking' });
        try {
            await sendOTPEmail(req.user.email, otp, 'event_booking');
        } catch (error) {
            await OTP.deleteOne({ email: req.user.email, otp, action: 'event_booking' });
            throw error;
        }
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        const status = error.code === 'EMAIL_DELIVERY_FAILED' ? 503 : 500;
        res.status(status).json({ message: error.message || 'Error sending OTP' });
    }
};

exports.bookEvent = async (req, res) => {
    try {
        const { eventId, otp } = req.body;

        // Verify OTP explicitly before proceeding
        const validOTP = await OTP.findOne({ email: req.user.email, otp, action: 'event_booking' });
        if (!validOTP) {
            return res.status(400).json({ message: 'Invalid or expired OTP for booking' });
        }

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        if (event.availableSeats <= 0) return res.status(400).json({ message: 'No seats available' });

        const existingBooking = await Booking.findOne({ userId: req.user.id, eventId });
        if (existingBooking && existingBooking.status !== 'cancelled') {
            return res.status(400).json({ message: 'Already booked or pending' });
        }

        const booking = await Booking.create({
            userId: req.user.id,
            eventId,
            status: 'pending',
            paymentStatus: 'not_paid',
            amount: event.ticketPrice
        });

        await OTP.deleteOne({ _id: validOTP._id }); // cleanup

        res.status(201).json({ message: 'Booking request submitted', booking });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.confirmBooking = async (req, res) => {
    try {
        const { paymentStatus } = req.body;

        const booking = await Booking.findById(req.params.id)
            .populate('userId')
            .populate('eventId');

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        if (booking.status === 'confirmed') {
            return res.status(400).json({
                message: 'Booking is already confirmed'
            });
        }

        const event = await Event.findById(booking.eventId._id);

        if (!event) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }

        if (event.availableSeats <= 0) {
            return res.status(400).json({
                message: 'No seats available to confirm this booking'
            });
        }

        // Confirm booking
        booking.status = 'confirmed';

        // Update payment status
        booking.paymentStatus = paymentStatus || 'not_paid';

        // Generate ticket number
        if (!booking.ticketNumber) {
            booking.ticketNumber = generateTicketNumber();
        }

        // Save booking first
        await booking.save();

        // Reduce available seats
        event.availableSeats -= 1;
        await event.save();

        // Send confirmation email
        let emailWarning;
        try {
            await sendBookingEmail(
                booking.userId.email,
                booking.userId.name,
                booking.eventId.title
            );
        } catch (error) {
            console.error('Booking confirmation email failed:', error);
            emailWarning = 'Booking confirmed, but the confirmation email could not be sent.';
        }

        res.json({
            message: 'Booking confirmed successfully',
            booking: {
                _id: booking._id,
                status: booking.status,
                paymentStatus: booking.paymentStatus,
                ticketNumber: booking.ticketNumber
            },
            ...(emailWarning && { warning: emailWarning })
        });

    } catch (error) {
        console.error('Confirm booking error:', error);

        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        const bookings = req.user.role === 'admin'
            ? await Booking.find().populate('eventId').populate('userId', 'name email').sort({ createdAt: -1 })
            : await Booking.find({ userId: req.user.id }).populate('eventId').sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        if (booking.status === 'cancelled') return res.status(400).json({ message: 'Already cancelled' });

        const wasConfirmed = booking.status === 'confirmed';

        booking.status = 'cancelled';
        await booking.save();

        // Only restore the seat if it was actually confirmed and deducted
        if (wasConfirmed) {
            const event = await Event.findById(booking.eventId);
            if (event) {
                event.availableSeats += 1;
                await event.save();
            }
        }

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
exports.getRecommendations = async (req, res) => {
    try {
        const bookings = await Booking.find({
            userId: req.user.id,
            status: 'confirmed'
        }).populate('eventId');

        if (bookings.length === 0) {
            const events = await Event.find({
                date: { $gte: new Date() }
            })
                .sort({ date: 1 })
                .limit(6);

            return res.json(events);
        }

        const categoryCount = {};

        bookings.forEach((booking) => {
            if (booking.eventId?.category) {
                const category = booking.eventId.category;

                categoryCount[category] =
                    (categoryCount[category] || 0) + 1;
            }
        });

        const preferredCategory = Object.keys(categoryCount).sort(
            (a, b) =>
                categoryCount[b] - categoryCount[a]
        )[0];

        const bookedEventIds = bookings
            .filter((booking) => booking.eventId)
            .map((booking) => booking.eventId._id);

        const recommendations = await Event.find({
            category: preferredCategory,
            date: { $gte: new Date() },
            _id: { $nin: bookedEventIds }
        })
            .sort({ date: 1 })
            .limit(6);

        res.json(recommendations);

    } catch (error) {
        res.status(500).json({
            message: 'Error generating recommendations',
            error: error.message
        });
    }
};
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('eventId')
            .populate('userId', 'name email');

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        if (
            booking.userId._id.toString() !== req.user.id &&
            req.user.role !== 'admin'
        ) {
            return res.status(403).json({
                message: 'Not authorized'
            });
        }

        res.json(booking);

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};
