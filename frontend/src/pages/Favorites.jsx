import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import { useFavorites } from "../context/FavoriteContext";
import { FaHeart, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const Favorites = () => {
    const { favorites, toggleFavorite } = useFavorites();

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteEvents = async () => {
            try {
                const { data } = await api.get("/events");

                const favoriteEvents = data.filter((event) =>
                    favorites.includes(event._id)
                );

                setEvents(favoriteEvents);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteEvents();
    }, [favorites]);

    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading favorites...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f3eaff] via-[#f8f7ff] to-[#e6efff] px-4 py-10">

            <div className="mx-auto max-w-7xl">

                <div className="mb-10">
                    <p className="font-semibold text-purple-600">
                        YOUR COLLECTION
                    </p>

                    <h1 className="mt-2 text-4xl font-extrabold text-[#11162f]">
                        Favorite Events ❤️
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Events you saved for later.
                    </p>
                </div>

                {events.length === 0 ? (
                    <div className="rounded-3xl bg-white p-16 text-center shadow-xl">
                        <FaHeart className="mx-auto mb-5 text-5xl text-gray-200" />

                        <h2 className="text-2xl font-bold text-gray-900">
                            No favorite events yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Start exploring events and save the ones you like.
                        </p>

                        <Link
                            to="/"
                            className="mt-6 inline-block rounded-full bg-purple-600 px-7 py-3 font-bold text-white hover:bg-purple-700"
                        >
                            Explore Events
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                            >

                                <div className="relative h-52">
                                    {event.image ? (
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-purple-100 font-bold text-purple-600">
                                            {event.category}
                                        </div>
                                    )}

                                    <button
                                        onClick={() =>
                                            toggleFavorite(event._id)
                                        }
                                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
                                    >
                                        ❤️
                                    </button>
                                </div>

                                <div className="p-5">

                                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-600">
                                        {event.category}
                                    </span>

                                    <h2 className="mt-3 text-xl font-bold text-gray-900">
                                        {event.title}
                                    </h2>

                                    <div className="mt-3 space-y-2 text-sm text-gray-500">
                                        <p>
                                            <FaCalendarAlt className="mr-2 inline text-purple-600" />
                                            {new Date(event.date).toLocaleDateString()}
                                        </p>

                                        <p>
                                            <FaMapMarkerAlt className="mr-2 inline text-purple-600" />
                                            {event.location}
                                        </p>
                                    </div>

                                    <Link
                                        to={`/events/${event._id}`}
                                        className="mt-5 block rounded-xl bg-purple-600 py-3 text-center font-bold text-white hover:bg-purple-700"
                                    >
                                        View Event
                                    </Link>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default Favorites;