import React from 'react';
import {
    FaTicketAlt,
    FaUsers,
    FaCalendarAlt,
    FaHeart,
    FaShieldAlt,
    FaBolt,
} from 'react-icons/fa';

const About = () => {
    return (
        <div className="min-h-screen overflow-hidden bg-[#eee8ff] text-[#111327]">

            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="relative px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12">

                {/* Background glow */}
                <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-purple-300/30 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">

                    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">

                        {/* LEFT */}

                        <div>

                            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-purple-600">
                                About Evently
                            </p>

                            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">

                                We make every event

                                <span
                                    className="ml-2 text-purple-600"
                                    style={{
                                        fontFamily: "'Pacifico', cursive",
                                    }}
                                >
                                    unforgettable.
                                </span>

                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                                Evently is an event booking platform designed to
                                make discovering, booking and managing events
                                simple, secure and enjoyable.
                            </p>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                                Whether you're looking for your next exciting
                                experience or managing an event of your own,
                                Evently brings everything together in one place.
                            </p>

                        </div>


                        {/* RIGHT VISUAL */}

                        <div className="relative mx-auto w-full max-w-md">

                            <div className="absolute -inset-5 rounded-[2.5rem] bg-purple-400/20 blur-2xl" />

                            <div className="relative overflow-hidden rounded-[2rem] bg-[#0b0d1c] p-7 text-white shadow-[0_25px_60px_rgba(11,13,28,0.25)] sm:p-9">

                                {/* Glow */}
                                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-600/20 blur-3xl" />

                                <div className="relative">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 rotate-[-8deg] items-center justify-center rounded-xl bg-gradient-to-br from-[#b56cff] via-[#9248eb] to-[#6935d2] shadow-lg">

                                            <FaTicketAlt className="text-xl" />

                                        </div>

                                        <div>
                                            <p
                                                className="text-2xl text-purple-300"
                                                style={{
                                                    fontFamily: "'Pacifico', cursive",
                                                }}
                                            >
                                                Evently
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                Your event, your experience.
                                            </p>
                                        </div>

                                    </div>


                                    <div className="mt-10 grid grid-cols-2 gap-4">

                                        <div className="rounded-2xl bg-white/[0.06] p-5">
                                            <p className="text-3xl font-extrabold">
                                                100+
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                Events
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-white/[0.06] p-5">
                                            <p className="text-3xl font-extrabold">
                                                500+
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                Users
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-white/[0.06] p-5">
                                            <p className="text-3xl font-extrabold">
                                                24/7
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                Access
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-white/[0.06] p-5">
                                            <p className="text-3xl font-extrabold">
                                                100%
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                Secure
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                WHAT WE DO
            ====================================================== */}

            <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">

                <div className="mx-auto max-w-7xl">

                    <div className="mx-auto mb-12 max-w-2xl text-center">

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-600">
                            Why Evently
                        </p>

                        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">

                            Everything you need for a

                            <span
                                className="ml-2 text-purple-600"
                                style={{
                                    fontFamily: "'Pacifico', cursive",
                                }}
                            >
                                great experience
                            </span>

                        </h2>

                        <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                            We focus on making the entire event journey
                            convenient — from discovering an event to
                            receiving your ticket.
                        </p>

                    </div>


                    <div className="grid gap-5 md:grid-cols-3">

                        {/* CARD 1 */}

                        <div className="rounded-3xl border border-purple-100 bg-white/70 p-7 shadow-[0_15px_40px_rgba(91,61,143,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(91,61,143,0.14)]">

                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-xl text-purple-600">
                                <FaCalendarAlt />
                            </div>

                            <h3 className="text-xl font-bold">
                                Discover Events
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-gray-500">
                                Find interesting events and explore experiences
                                that match your interests.
                            </p>

                        </div>


                        {/* CARD 2 */}

                        <div className="rounded-3xl border border-purple-100 bg-white/70 p-7 shadow-[0_15px_40px_rgba(91,61,143,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(91,61,143,0.14)]">

                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-xl text-pink-500">
                                <FaHeart />
                            </div>

                            <h3 className="text-xl font-bold">
                                Save Favorites
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-gray-500">
                                Keep track of events you love and access them
                                easily whenever you want.
                            </p>

                        </div>


                        {/* CARD 3 */}

                        <div className="rounded-3xl border border-purple-100 bg-white/70 p-7 shadow-[0_15px_40px_rgba(91,61,143,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(91,61,143,0.14)]">

                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-xl text-blue-500">
                                <FaShieldAlt />
                            </div>

                            <h3 className="text-xl font-bold">
                                Book Securely
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-gray-500">
                                A streamlined booking experience designed with
                                security and simplicity in mind.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                OUR VALUES
            ====================================================== */}

            <section className="px-5 pb-16 pt-8 sm:px-8 sm:pb-24 lg:px-12">

                <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#0b0d1c] px-6 py-12 text-white shadow-[0_25px_60px_rgba(11,13,28,0.18)] sm:px-10 sm:py-16 lg:px-16">

                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-400">
                                Our Mission
                            </p>

                            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">

                                More than just

                                <span
                                    className="ml-2 text-purple-400"
                                    style={{
                                        fontFamily: "'Pacifico', cursive",
                                    }}
                                >
                                    tickets.
                                </span>

                            </h2>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                                We believe events are about people, memories
                                and experiences. Evently aims to remove the
                                friction from event booking so users can spend
                                less time managing tickets and more time
                                enjoying the moment.
                            </p>

                        </div>


                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">

                                <FaBolt className="text-xl text-purple-400" />

                                <h3 className="mt-4 font-bold">
                                    Simplicity
                                </h3>

                                <p className="mt-2 text-xs leading-6 text-gray-500">
                                    Simple and intuitive experience.
                                </p>

                            </div>


                            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">

                                <FaUsers className="text-xl text-purple-400" />

                                <h3 className="mt-4 font-bold">
                                    Community
                                </h3>

                                <p className="mt-2 text-xs leading-6 text-gray-500">
                                    Bringing people together.
                                </p>

                            </div>


                            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">

                                <FaShieldAlt className="text-xl text-purple-400" />

                                <h3 className="mt-4 font-bold">
                                    Trust
                                </h3>

                                <p className="mt-2 text-xs leading-6 text-gray-500">
                                    Secure and reliable platform.
                                </p>

                            </div>


                            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">

                                <FaHeart className="text-xl text-purple-400" />

                                <h3 className="mt-4 font-bold">
                                    Experience
                                </h3>

                                <p className="mt-2 text-xs leading-6 text-gray-500">
                                    Making every moment count.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
};

export default About;