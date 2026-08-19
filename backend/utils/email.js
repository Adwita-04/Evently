const RESEND_EMAILS_URL = 'https://api.resend.com/emails';

const emailDeliveryError = (message) => {
    const error = new Error(message);
    error.code = 'EMAIL_DELIVERY_FAILED';
    return error;
};

const sendEmail = async ({ to, subject, html }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;

    if (!apiKey || !from) {
        throw emailDeliveryError('Email service is not configured.');
    }

    let response;
    try {
        response = await fetch(RESEND_EMAILS_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Evently/1.0'
            },
            body: JSON.stringify({ from, to: [to], subject, html })
        });
    } catch (error) {
        console.error('Email service connection error:', error);
        throw emailDeliveryError('Could not connect to the email service.');
    }

    if (!response.ok) {
        const details = await response.text();
        console.error('Email service rejected the message:', response.status, details);
        throw emailDeliveryError('The email service could not send the message.');
    }
};

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    await sendEmail({
        to: userEmail,
        subject: `Booking Confirmed: ${eventTitle}`,
        html: `
            <h2>Hi ${userName}!</h2>
            <p>Your booking for the event <strong>${eventTitle}</strong> is successfully confirmed.</p>
            <p>Thank you for choosing Evently.</p>
        `
    });
};

const sendOTPEmail = async (userEmail, otp, type) => {
    const title = type === 'account_verification'
        ? 'Verify your Evently Account'
        : 'Evently Booking Verification';
    const message = type === 'account_verification'
        ? 'Please use the following OTP to verify your new Evently account.'
        : 'Please use the following OTP to verify and confirm your event booking.';

    await sendEmail({
        to: userEmail,
        subject: title,
        html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2 style="color: #111;">${title}</h2>
                <p style="color: #555; font-size: 16px;">${message}</p>
                <div style="margin: 20px auto; padding: 15px; font-size: 24px; font-weight: bold; background: #f4f4f4; width: max-content; letter-spacing: 5px;">${otp}</div>
                <p style="color: #999; font-size: 12px;">This code expires in 5 minutes. If you didn't request this, please ignore this email.</p>
            </div>
        `
    });
};

module.exports = { sendBookingEmail, sendOTPEmail };
