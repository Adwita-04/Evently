import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import { useFavorites } from "../context/FavoriteContext";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaRegClock,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaTicketAlt,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEvents();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get(`/events?search=${search}`);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f3eaff] via-[#f8f7ff] to-[#e6efff] px-4 pb-10 sm:px-6 lg:px-8">
      {/* =====================================================
                BACKGROUND DECORATIONS
            ====================================================== */}

      <div className="pointer-events-none absolute -left-32 top-32 h-80 w-80 rounded-full bg-purple-300/25 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-[550px] h-96 w-96 rounded-full bg-blue-300/25 blur-3xl" />

      <div className="pointer-events-none absolute left-[-70px] top-[650px] h-48 w-48 rounded-full border-[35px] border-purple-300/10" />

      <div className="pointer-events-none absolute right-[-80px] top-[850px] h-64 w-64 rounded-full border-[45px] border-blue-300/10" />

      {/* =====================================================
                MAIN CONTENT
            ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1280px] pt-4">
        {/* =================================================
                    HERO SECTION
                ================================================== */}

        <section className="relative mb-7 h-[360px] overflow-hidden rounded-[22px] bg-[#080b1c] shadow-[0_25px_55px_rgba(18,15,45,0.38)] sm:h-[390px] md:h-[410px]">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3000&auto=format&fit=crop')",
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#050817]/65" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#080b1c]/40 via-[#080b1c]/55 to-[#050713]/90" />

          {/* Purple glow */}
          <div className="absolute left-1/2 top-20 h-60 w-96 -translate-x-1/2 rounded-full bg-purple-700/20 blur-[100px]" />

          {/* Hero Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center sm:px-8">
            {/* Welcome Badge */}
            <div className="mb-4 flex items-center gap-2 rounded-full border border-purple-300/30 bg-white/5 px-5 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md ">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.9)]" />
              Welcome to <span className="cursive-font">Evently</span>
            </div>

            {/* Heading */}
            <h3 className="mb-4 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-xl md:text-[52px]">
              Find Your Next
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 italic sm:text-[10px] md:text-[50px] cursive-font p-2">
                Unforgettable
              </span>
              <span className="ml-2 sm:ml-[0.5px]">Experience</span>
            </h3>

            {/* Description */}
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-gray-200 sm:text-base">
              Discover the best tech conferences, late-night music festivals,
              and hands-on workshops happening near you.
            </p>

            {/* Search Box */}
            <div className="group relative w-full max-w-[475px]">
              {/* Glow */}
              <div className="absolute -inset-1 rounded-full bg-purple-500/40 opacity-70 blur-md transition duration-300 group-focus-within:opacity-100" />

              <div className="relative">
                <FaSearch className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-lg text-[#25284a]" />

                <input
                  type="text"
                  placeholder="Search events by title..."
                  className="h-[54px] w-full rounded-full border border-purple-300 bg-white px-14 pr-6 text-sm font-medium text-gray-900 shadow-[0_8px_30px_rgba(0,0,0,0.25)] outline-none transition-all placeholder:text-[#8c91ad] focus:border-purple-500 focus:ring-2 focus:ring-purple-400/30 sm:h-[58px] sm:text-base"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
                    FEATURE CARDS
                ================================================== */}

        <section className="mb-9 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Fast Booking */}
          <div className="group flex min-h-[122px] items-center gap-6 rounded-2xl border border-purple-100 bg-gradient-to-r from-[#eee2ff] to-[#f4eaff] px-7 py-6 shadow-[0_12px_30px_rgba(79,55,130,0.13)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(79,55,130,0.2)]">
            <div className="flex h-[68px] w-[68px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] text-2xl text-white shadow-[0_10px_25px_rgba(109,40,217,0.35)] transition-transform duration-300 group-hover:scale-105">
              <FaRegClock />
            </div>

            <div>
              <h3 className="mb-2 text-lg font-bold text-[#11162f]">
                Fast Booking
              </h3>

              <p className="text-sm leading-relaxed text-[#414663]">
                Secure your tickets instantly with our fast & streamlined
                booking.
              </p>
            </div>
          </div>

          {/* Seamless Access */}
          <div className="group flex min-h-[122px] items-center gap-6 rounded-2xl border border-pink-100 bg-gradient-to-r from-[#ffe7ec] to-[#fff0f2] px-7 py-6 shadow-[0_12px_30px_rgba(150,55,85,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(150,55,85,0.19)]">
            <div className="flex h-[68px] w-[68px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ec3566] to-[#f43f5e] text-2xl text-white shadow-[0_10px_25px_rgba(236,53,102,0.3)] transition-transform duration-300 group-hover:scale-105">
              <FaTicketAlt />
            </div>

            <div>
              <h3 className="mb-2 text-lg font-bold text-[#11162f]">
                Seamless Access
              </h3>

              <p className="text-sm leading-relaxed text-[#414663]">
                Download tickets instantly or manage them right from your
                dashboard.
              </p>
            </div>
          </div>

          {/* Secure Platform */}
          <div className="group flex min-h-[122px] items-center gap-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-[#dfecff] to-[#eaf2ff] px-7 py-6 shadow-[0_12px_30px_rgba(50,90,150,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(50,90,150,0.19)]">
            <div className="flex h-[68px] w-[68px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1688ed] to-[#2979e8] text-2xl text-white shadow-[0_10px_25px_rgba(37,120,230,0.3)] transition-transform duration-300 group-hover:scale-105">
              <FaShieldAlt />
            </div>

            <div>
              <h3 className="mb-2 text-lg font-bold text-[#11162f]">
                Secure Platform
              </h3>

              <p className="text-sm leading-relaxed text-[#414663]">
                All transactions and registrations are protected with top-tier
                security.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
                    EVENTS HEADING
                ================================================== */}

        <section className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl text-purple-600">✦</span>

            <h2 className="text-2xl font-extrabold tracking-tight text-[#10152e] sm:text-3xl">
              Upcoming Events
            </h2>
          </div>

          <div className="rounded-full border border-purple-200 bg-purple-50 px-5 py-2 text-xs font-bold text-purple-600 shadow-sm sm:text-sm">
            {events.length} results found
          </div>
        </section>

        {/* =================================================
                    LOADING
                ================================================== */}

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600" />

              <p className="font-semibold text-gray-600">Loading events...</p>
            </div>
          </div>
        ) : events.length === 0 ? (
          /* =================================================
                       NO EVENTS
                    ================================================== */

          <div className="rounded-2xl border border-purple-100 bg-white/80 py-20 text-center shadow-[0_15px_35px_rgba(50,40,90,0.12)]">
            <FaSearch className="mx-auto mb-4 text-4xl text-purple-200" />

            <h3 className="mb-2 text-xl font-bold text-[#11162f]">
              No events found
            </h3>

            <p className="text-gray-500">
              No events found matching your search.
            </p>
          </div>
        ) : (
          /* =================================================
                       EVENT CARDS
                    ================================================== */

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_32px_rgba(35,35,70,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(35,35,70,0.23)]"
              >
                {/* Event Image */}
                <div className="relative h-[190px] overflow-hidden bg-gray-200">
                  <button
                    onClick={() => toggleFavorite(event._id)}
                    className="absolute right-4 top-14 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-xl shadow-lg transition hover:scale-110"
                    aria-label="Toggle favorite"
                  >
                    {isFavorite(event._id) ? "❤️" : "♡"}
                  </button>
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 text-2xl font-bold text-purple-600">
                      {event.category || "Event"}
                    </div>
                  )}

                  {/* Image dark gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Category */}
                  <div className="absolute left-4 top-4 rounded-lg bg-purple-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg">
                    {event.category || "Event"}
                  </div>

                  {/* Price */}
                  <div className="absolute right-4 top-4 rounded-lg bg-white px-3.5 py-2 text-sm font-extrabold text-gray-900 shadow-lg">
                    {event.ticketPrice === 0 ? (
                      <span className="text-green-500">FREE</span>
                    ) : (
                      <span>₹{event.ticketPrice}</span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-grow flex-col px-5 pb-4 pt-4">
                  {/* Title */}
                  <h2 className="mb-3 text-xl font-extrabold leading-tight text-[#11162f]">
                    {event.title}
                  </h2>

                  {/* Date */}
                  <div className="mb-2 flex items-center gap-2.5 text-sm text-[#4c5270]">
                    <FaCalendarAlt className="flex-shrink-0 text-purple-600" />

                    <span>
                      {new Date(event.date).toLocaleDateString(undefined, {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="mb-4 flex items-center gap-2.5 text-sm text-[#4c5270]">
                    <FaMapMarkerAlt className="flex-shrink-0 text-purple-600" />

                    <span>{event.location}</span>
                  </div>

                  {/* Seats Progress */}
                  <div className="mt-auto">
                    <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-[#e4e1ef]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
                        style={{
                          width: `${(event.availableSeats / event.totalSeats) * 100}%`,
                        }}
                      />
                    </div>

                    <p className="mb-4 text-xs text-[#5c6079]">
                      {event.availableSeats} of {event.totalSeats} seats left
                    </p>

                    {/* View Details */}
                    <Link
                      to={`/events/${event._id}`}
                      className="group/button flex h-[40px] w-full items-center justify-center gap-3 rounded-lg border border-purple-300 bg-purple-50 text-sm font-bold text-purple-600 transition-all duration-300 hover:border-purple-400 hover:bg-purple-100 hover:shadow-[0_5px_15px_rgba(124,58,237,0.12)]"
                    >
                      <span>View Details</span>

                      <FaArrowRight className="text-sm transition-transform duration-300 group-hover/button:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
                    FOOTER
                ================================================== */}

        <footer className="mx-auto mt-20 max-w-7xl rounded-t-[30px] bg-gradient-to-br from-[#0c0b18] via-[#17112e] to-[#0d1530] px-8 py-14 text-white shadow-[0_-20px_50px_rgba(40,30,80,0.25)]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-xl shadow-lg">
                  <FaTicketAlt />
                </div>

                <span className="text-2xl font-black cursive-font">
                  Evently
                </span>
              </div>

              <p className="max-w-md font-serif text-sm italic leading-relaxed text-gray-300">
                Discover exciting events, connect with people, experience
                unforgettable moments and create memories that last forever.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-purple-300">
                Explore
              </h4>

              <div className="space-y-3 text-sm text-gray-400">
                <p className="cursor-pointer transition hover:text-white">
                  Upcoming Events
                </p>

                <p className="cursor-pointer transition hover:text-white">
                  Popular Events
                </p>

                <p className="cursor-pointer transition hover:text-white">
                  Workshops
                </p>

                <p className="cursor-pointer transition hover:text-white">
                  Music & Entertainment
                </p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-purple-300">
                Why Evently
              </h4>

              <div className="space-y-3 text-sm text-gray-400">
                <p>Fast & Secure Booking</p>
                <p>Verified Events</p>
                <p>OTP Protected Accounts</p>
                <p>Easy Ticket Management</p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="my-10 h-px bg-white/10" />

          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              © {new Date().getFullYear()} Evently Platform. All rights
              reserved.
            </p>

            <div className="flex gap-3">
              <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-gray-300 transition hover:bg-white hover:text-gray-900">
                <FaInstagram />
              </div>

              <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-gray-300 transition hover:bg-white hover:text-gray-900">
                <FaTwitter />
              </div>

              <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-gray-300 transition hover:bg-white hover:text-gray-900">
                <FaFacebookF />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
