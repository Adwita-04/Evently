import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaTicketAlt, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!showOTP) {
                const data = await login(email, password);

                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');

            } else {
                const data = await verifyOTP(email, otp);

                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            }

        } catch (err) {
            if (err.needsVerification) {
                setShowOTP(true);
                setError(
                    'Account not verified. A new OTP has been sent to your email.'
                );
            } else {
                setError(err.message || err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="min-h-[calc(100vh-66px)] w-full flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md bg-[#0b0d1c] p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_60px_rgba(91,61,143,0.25)] border border-purple-200/20">

            {/* HEADER */}
            <div className="text-center mb-8">

                

                <h2 className="text-3xl font-extrabold text-white">
                    Welcome
                    <span
                        className="ml-2 text-purple-400"
                        style={{
                            fontFamily: "'Pacifico', cursive"
                        }}
                    >
                        Back
                    </span>
                </h2>

                <p className="mt-2 text-gray-400">
                    Sign in to your Evently account
                </p>

            </div>


            {/* ERROR */}
            {error && (
                <div className="mb-6 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                    {error}
                </div>
            )}


            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">

                {!showOTP ? (
                    <>
                        {/* EMAIL */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-200">
                                Email Address
                            </label>

                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>


                        {/* PASSWORD */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-200">
                                Password
                            </label>

                            <input
                                type="password"
                                required
                                placeholder="Enter your password"
                                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </>
                ) : (

                    /* OTP */
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-200">
                            Verification Code (OTP)
                        </label>

                        <input
                            type="text"
                            required
                            placeholder="6-digit code"
                            maxLength="6"
                            className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-lg font-bold tracking-[0.4em] text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                )}


                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-[#8b3fe8] to-[#914fe9] py-3 font-bold text-white shadow-[0_8px_25px_rgba(139,70,230,0.35)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_12px_30px_rgba(139,70,230,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? 'Processing...'
                        : showOTP
                            ? 'Verify OTP & Log In'
                            : 'Sign In'
                    }
                </button>

            </form>


            {/* REGISTER */}
            <div className="mt-8 border-t border-white/10 pt-7 text-center">

                <p className="text-gray-400">
                    Don't have an account?

                    <Link
                        to="/register"
                        className="ml-1 font-bold text-purple-400 transition hover:text-purple-300"
                    >
                        Sign up
                    </Link>

                </p>

            </div>

        </div>
    </div>
);
};

export default Login;