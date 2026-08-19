import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import api from "../utils/axios";

const Ticket = () => {
    const { id } = useParams();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data } = await api.get(`/bookings/${id}`);
                
                setBooking(data);
            } catch (error) {
                console.error("Error fetching ticket:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [id]);

    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading ticket...
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="py-20 text-center text-red-500">
                Ticket not found.
            </div>
        );
    }

    if (booking.status !== "confirmed") {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold">
                    Ticket not available
                </h2>

                <p className="mt-2 text-gray-500">
                    Your booking must be confirmed first.
                </p>
            </div>
        );
    }

    const event = booking.eventId;

    const qrData = JSON.stringify({
        ticketNumber: booking.ticketNumber,
        bookingId: booking._id,
        eventId: event._id
    });

    return (
        <div className="min-h-screen bg-[#f4f1ff] px-8 py-8 sm:py-10 flex flex-col items-center">

            {/* Ticket */}
            <div className="ticket-container w-full max-w-[350px] ">

                <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-violet-500 px-5 py-4 text-white">

                        <div className="flex items-center justify-between gap-3">

                            <div>
                                <p className="text-[9px] font-bold tracking-[0.3em] opacity-80">
                                    EVENTLY
                                </p>

                                <h1 className="mt-0.5 text-lg font-black">
                                    EVENT PASS
                                </h1>
                            </div>

                            <div className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase whitespace-nowrap">
                                Confirmed
                            </div>

                        </div>
                    </div>

                    {/* Main Ticket */}
                    <div className="flex flex-col sm:flex-row">

                        {/* Event Details */}
                        <div className="flex-1 p-5">

                            <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-purple-600">
                                {event.category}
                            </p>

                            <h2 className="mt-1.5 text-lg font-black leading-tight text-gray-900">
                                {event.title}
                            </h2>

                            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">

                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                                        Date
                                    </p>

                                    <p className="mt-0.5 text-xs font-bold text-gray-800">
                                        {new Date(event.date).toLocaleDateString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                                        Amount
                                    </p>

                                    <p className="mt-0.5 text-xs font-bold text-gray-800">
                                        {booking.amount === 0
                                            ? "FREE"
                                            : `₹${booking.amount}`}
                                    </p>
                                </div>

                                <div className="col-span-2">
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                                        Venue
                                    </p>

                                    <p className="mt-0.5 text-xs font-bold text-gray-800 truncate">
                                        {event.location}
                                    </p>
                                </div>

                                <div className="col-span-2">
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                                        Attendee
                                    </p>

                                    <p className="mt-0.5 text-xs font-bold text-gray-800">
                                        {booking.userId?.name}
                                    </p>
                                </div>

                            </div>

                            {/* Ticket Number */}
                            <div className="mt-5 pt-4 border-t-2 border-dashed border-gray-200">

                                <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                                    Ticket Number
                                </p>

                                <p className="mt-1 font-mono text-[11px] font-black tracking-wide text-gray-900 break-all">
                                    {booking.ticketNumber || "Generating..."}
                                </p>

                            </div>

                        </div>

                        {/* Desktop perforation */}
                        <div className="hidden sm:block border-l-2 border-dashed border-gray-200 my-4" />

                        {/* QR Section */}
                        <div className="flex w-full sm:w-[105px] shrink-0 flex-col items-center justify-center border-t-2 border-dashed border-gray-200 sm:border-t-0 p-4">

                            <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                                <QRCodeSVG
                                    value={qrData}
                                    size={82}
                                    level="M"
                                />
                            </div>

                            <p className="mt-2 text-center text-[8px] font-bold uppercase tracking-wider text-gray-400">
                                Scan at entrance
                            </p>

                        </div>

                    </div>

                    {/* Bottom Strip */}
                    <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-100">

                        <div className="flex items-center justify-between gap-2">

                            <p className="text-[7px] font-bold uppercase tracking-widest text-gray-400">
                                Evently Digital Ticket
                            </p>

                            <p className="text-[7px] font-bold text-gray-400">
                                Valid Entry Pass
                            </p>

                        </div>

                    </div>

                    {/* Perforation circles */}
                    <div className="absolute top-[58px] -left-3 h-6 w-6 rounded-full bg-[#f4f1ff]" />
                    <div className="absolute top-[58px] -right-3 h-6 w-6 rounded-full bg-[#f4f1ff]" />

                </div>

                {/* Print */}
                <button
                    onClick={() => window.print()}
                    className="print:hidden mt-4 w-full rounded-lg bg-purple-600 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-purple-700 hover:-translate-y-0.5"
                >
                    🖨 Print / Save Ticket
                </button>

                <Link
                    to="/dashboard"
                    className="print:hidden mt-3 block text-center text-sm font-semibold text-purple-600 hover:text-purple-800"
                >
                    ← Back to Dashboard
                </Link>

            </div>

            {/* Print Styles */}
            <style>
                {`
                    @media print {

                        @page {
                            size: auto;
                            margin: 8mm;
                        }

                        body {
                            background: white !important;
                        }

                        .ticket-container {
                            width: 350px !important;
                            max-width: 350px !important;
                            margin: 0 auto !important;
                        }

                        .ticket-container > div:first-child {
                            box-shadow: none !important;
                            border: 1px solid #ddd;
                        }
                    }
                `}
            </style>

        </div>
    );
};

export default Ticket;