import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Lock, Mail, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, clearAuthMessage, signupUser } from '../redux/slices/authSlice'

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPass, setShowPass] = useState(false);

    const { error, message, isAuthenticated, loading } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const signupSubmit = async (data) => {
        dispatch(signupUser(data));
    }

    useEffect(() => {
        if (error) {
            toast.error(error || 'Invalid credentials. Please try again.', {
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '13px',
                    borderRadius: '8px',
                }
            });
            dispatch(clearAuthError());
        }

        if (message && isAuthenticated) {
            toast.success(message || 'Welcome back to Scentsô!', {
                style: {
                    fontFamily: 'Poppins',
                    fontSize: '13px',
                    borderRadius: '8px',
                    background: '#111111',
                    color: '#ffffff',
                },
                iconTheme: {
                    primary: '#D4AF37',
                    secondary: '#111111',
                },
            }
            );
            dispatch(clearAuthMessage());

            setTimeout(() => {
                navigate('/');
            }, 2500);
        }

    }, [error, message, dispatch, isAuthenticated, navigate]);

    return (
        <div className='flex items-center justify-center min-h-screen bg-CARD-BG px-4 select-none'>

            <div className='bg-white border border-gray-100 w-full max-w-md p-8 md:p-12 shadow-sm rounded-sm transition-all duration-300'>

                <div className='text-center mb-10'>
                    <h1 className='font-bold text-3xl tracking-[4px] text-TEXT uppercase mb-2'>
                        Scentsô
                    </h1>
                    <p className='text-[11px] tracking-[2px] font-light uppercase text-gray-400'>
                        Sign in to your elite sensory space
                    </p>
                </div>


                <form onSubmit={handleSubmit(signupSubmit)} className='space-y-6'>

                    <div className='flex flex-col space-y-2 group'>
                        <label className='text-[10px] uppercase tracking-[2px] font-medium text-gray-500' htmlFor="name">
                            Your Name
                        </label>
                        <div className='flex items-center w-full border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300'>
                            <UserRound size={16} className='text-gray-400 mr-3' />
                            <input
                                className='bg-transparent text-sm text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-light'
                                placeholder='Jhon Doe...'
                                id='name'
                                {...register('fullName', { required: 'Name is required' })}
                                type="text"
                            />
                        </div>

                        {errors.fullName && <span className='text-[10px] text-red-500 font-light'>{errors.fullName.message}</span>}

                    </div>

                    <div className='flex flex-col space-y-2 group'>
                        <label className='text-[10px] uppercase tracking-[2px] font-medium text-gray-500' htmlFor="email">
                            Your Email
                        </label>
                        <div className='flex items-center w-full border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300'>
                            <Mail size={16} className='text-gray-400 mr-3' />
                            <input
                                className='bg-transparent text-sm text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-light'
                                placeholder='name@example.com'
                                id='email'
                                {...register('email', { required: 'Email address is required' })}
                                type="email"
                            />
                        </div>

                        {errors.email && <span className='text-[10px] text-red-500 font-light'>{errors.email.message}</span>}

                    </div>

                    <div className='flex flex-col space-y-2'>
                        <label className='text-[10px] uppercase tracking-[2px] font-medium text-gray-500' htmlFor="password">
                            Your Password
                        </label>

                        <div className='flex items-center w-full border-b border-gray-200 focus-within:border-TEXT pb-1 transition-colors duration-300'>
                            <Lock size={16} className='text-gray-400 mr-3' />

                            <input
                                className='bg-transparent text-sm text-TEXT w-full outline-none focus:outline-none placeholder-gray-300 font-light'
                                placeholder='••••••••'
                                id='password'

                                {...register('password', { required: 'Password is required' })}
                                type={showPass ? 'text' : 'password'}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className='text-gray-400 hover:text-TEXT transition-colors focus:outline-none'
                            >
                                {showPass ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                        </div>

                        {errors.password && <span className='text-[10px] text-red-500 font-light'>{errors.password.message}</span>}
                    </div>

                    <button
                        className='bg-TEXT text-white w-full py-3.5 text-xs uppercase tracking-[2px] font-semibold border border-TEXT hover:bg-transparent hover:text-TEXT active:scale-[0.99] transition-all duration-300 mt-4 rounded-sm shadow-sm flex items-center justify-center disabled:opacity-50'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Signup'}
                    </button>

                </form>

                <p className='text-center mt-8 text-xs text-gray-400 font-light'>
                    Already have an account?{' '}
                    <Link
                        to={'/login'}
                        className='font-medium text-TEXT underline underline-offset-4 hover:text-gray-600 transition-colors'
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Signup