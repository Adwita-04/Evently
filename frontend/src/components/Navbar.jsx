import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTicketAlt } from 'react-icons/fa';
import { useFavorites } from '../context/FavoriteContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { favorites } = useFavorites();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="relative z-50 w-full bg-[#0b0d1c] text-white shadow-[0_8px_30px_rgba(8,10,30,0.45)]">

            <div className="mx-auto max-w-7xl px-5 sm:px-8">

                <div className="flex h-[66px] items-center justify-between">

                    {/* ================= LOGO ================= */}

                    <Link
                        to="/"
                        className="group flex shrink-0 items-center gap-2.5"
                    >

                        <div className="relative flex h-[35px] w-[39px] rotate-[-10deg] items-center justify-center rounded-[6px] bg-gradient-to-br from-[#b56cff] via-[#9248eb] to-[#6935d2] shadow-[0_5px_18px_rgba(139,92,246,0.45)] transition duration-300 group-hover:rotate-0">

                            <FaTicketAlt className="text-[20px] text-white" />

                            <span className="absolute -left-[2px] top-1/2 h-[8px] w-[4px] -translate-y-1/2 rounded-r-full bg-[#0b0d1c]" />

                            <span className="absolute -right-[2px] top-1/2 h-[8px] w-[4px] -translate-y-1/2 rounded-l-full bg-[#0b0d1c]" />

                        </div>

                        <span
                            className="text-[27px] italic leading-none text-white"
                            style={{
                                fontFamily: "'Pacifico', cursive",
                            }}
                        >
                            Evently
                        </span>

                    </Link>


                    {/* ================= NAVIGATION ================= */}

                    <div className="flex items-center gap-1 sm:gap-3">

                        {/* HOME */}

                        <Link
                            to="/"
                            className="px-3 py-2 text-sm font-medium text-gray-300 transition hover:text-white sm:px-4"
                        >
                            Home
                        </Link>


                        {/* ABOUT US */}

                        <Link
                            to="/about"
                            className="px-3 py-2 text-sm font-medium text-gray-300 transition hover:text-white sm:px-4"
                        >
                            About Us
                        </Link>


                        {user ? (
                            <>

                                {/* ================= LOGGED IN ================= */}

                                {/* FAVORITES */}

                                <Link
                                    to="/favorites"
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 transition hover:text-white sm:px-4"
                                >
                                    Favorites

                                    {favorites.length > 0 && (
                                        <span className="rounded-full bg-purple-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                            {favorites.length}
                                        </span>
                                    )}
                                </Link>


                                {/* DASHBOARD */}

                                <Link
                                    to={
                                        user.role === 'admin'
                                            ? '/admin'
                                            : '/dashboard'
                                    }
                                    className="px-3 py-2 text-sm font-medium text-gray-300 transition hover:text-white sm:px-4"
                                >
                                    Dashboard
                                </Link>


                                {/* LOGOUT */}

                                <button
                                    onClick={handleLogout}
                                    className="ml-1 rounded-lg bg-gradient-to-r from-[#8b3fe8] to-[#914de9] px-4 py-2 text-sm font-semibold text-white shadow-[0_5px_18px_rgba(139,70,230,0.35)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(139,70,230,0.5)] sm:ml-2 sm:px-5"
                                >
                                    Logout
                                </button>

                            </>
                        ) : (

                            /* ================= LOGGED OUT ================= */

                            <Link
                                to="/login"
                                className="ml-1 rounded-lg bg-gradient-to-r from-[#8b3fe8] to-[#914de9] px-5 py-2 text-sm font-semibold text-white shadow-[0_5px_18px_rgba(139,70,230,0.35)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(139,70,230,0.5)] sm:ml-2"
                            >
                                Login
                            </Link>

                        )}

                    </div>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;