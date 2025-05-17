'use client';

import { useState, useEffect, useRef } from 'react'; // Import useRef
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Adjust path as needed
import { useAuthStore } from '@/store/authStore'; // Adjust path
import { FaKey } from 'react-icons/fa';
import Link from 'next/link';
import img from '@/assets/pay-per-code.png'
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster
import useRefreshRouterEffect from '@/hooks/useRefreshRouterEffect';

const RESEND_COOLDOWN_SECONDS = 60; // Cooldown time in seconds

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const {
    verifyEmail,
    resendOtp, // Import resend action
    isLoading, // Main verify loading
    isResendingOtp, // Resend loading
    error: storeError,
    clearError,
    userIdForVerification
  } = useAuthStore();

  // State for resend button cooldown and messages
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [resendMessage, setResendMessage] = useState(''); // Specific message for resend action
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref for cooldown timer

  // Clear timer on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!userIdForVerification && !isLoading && !isResendingOtp) {
      console.warn('No user ID found for verification. Redirecting to sign-up page...');
       router.push('/auth/sign-up');
    }
    // Clear general errors when component mounts or state changes relevantly
    clearError();
  }, [userIdForVerification, isLoading, isResendingOtp, router, clearError]);

  const { isAuthenticated, isAuthInitialized } = useAuthStore(); // Get isAuthInitialized as well

  useEffect(() => {
    // Only redirect if auth check is complete AND user is authenticated
    if (isAuthInitialized && isAuthenticated) {
      console.log(`User authenticated on ${window.location.pathname}, redirecting to dashboard...`);
      router.push('/customer-dashboard');
    }
  }, [isAuthenticated, isAuthInitialized, router]);

  // Add the custom hook at the top level of the component
  useRefreshRouterEffect();

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
     if (value.length <= 6) {
        setOtp(value);
        clearError(); // Clear general error on input change
        setResendMessage(''); // Clear resend message on input change
     }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setResendMessage('');

    if (!otp || otp.length !== 6) {
        useAuthStore.setState({ error: "Please enter a valid 6-digit OTP." });
        return;
    }

    if (!userIdForVerification) {
        useAuthStore.setState({ error: "Verification session expired or invalid. Please try registering again." });
        return;
    }

    try {
        const success = await verifyEmail(otp);
        if (success) {
            toast.success('Email verified successfully!\nRedirecting to login.', toastSuccessStyle);
            router.push('/auth/login');
        } else {
            
            toast.error('Invalid or expired verification code. Please try again.', toastErrorStyle);
        }
    } catch (err) {
        toast.error('Verification failed. Please try again.', toastErrorStyle);
    }
};

// Handler for the Resend OTP button
const handleResendOtp = async () => {
    clearError(); // Clear general error
    setResendMessage(''); // Clear previous resend message

    if (!userIdForVerification) {
        useAuthStore.setState({ error: "Cannot resend OTP without a valid session. Please try registering again." });
        return;
    }

    const result = await resendOtp(); // Call the store action

    setResendMessage(result.message); // Display message from the action (success or error)

    if (result.success) {
        toast.success('OTP sent successfully!', toastSuccessStyle);
        setResendDisabled(true); // Disable button
        setCountdown(RESEND_COOLDOWN_SECONDS); // Start countdown

        // Clear existing timer if any
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        // Start new countdown timer
        timerRef.current = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(timerRef.current!);
                    setResendDisabled(false); // Re-enable button
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);
    } else {
        toast.error(result.message || 'Failed to resend OTP. Please try again.', toastErrorStyle);
    }
};


  return (
    <>
        <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 4000 }} />
        <div className="flex w-full justify-between mt-26 flex-row text-[#003F5C]">
            {/* Left side */}
            <div className="hidden lg:block w-[40%]">
                <div className="h-full relative">
                    <Image
                        src={img}
                        alt="Sign Up"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
            
            <div className="flex max-w-[600px] lg:w-[60%] mx-auto mt-6 justify-center text-[#003F5C] p-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center font-poppins mb-6">Verify Your Email</h1>
                    <p className="text-center font-normal text-[18px] lg:text-[20px] font-lato mb-6">
                    An OTP has been sent to your registered email address. Please enter it below to activate your account.
                    </p>

                    {/* Display General Store Error */}
                    {storeError && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
                        {storeError}
                    </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="otp" className="block text-lg text-gray-700 font-lato font-bold mb-2">
                        Enter OTP*
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaKey className="text-gray-500" />
                            </div>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                placeholder="Enter 6-digit code"
                                value={otp}
                                onChange={handleOtpChange}
                                maxLength={6}
                                className="w-full text-xl tracking-[0.2em] text-center pl-12 text-[16px] sm:text-[20px] py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF]"
                                required
                                inputMode="numeric"
                                pattern="\d{6}"
                                autoComplete="one-time-code"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full font-poppins py-3 font-semibold text-lg cursor-pointer bg-[#00A5CF] hover:bg-[#008CBA] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading || isResendingOtp || otp.length !== 6} // Disable if any loading or invalid OTP
                    >
                        {isLoading ? 'Verifying...' : 'Verify Account'}
                    </Button>
                    </form>

                    {/* Resend OTP Section */}
                    <div className="text-center mt-4 pt-4 border-t border-gray-200">
                    {/* Display Resend Message */}
                    {resendMessage && (
                            <p className={`text-sm mb-2 ${resendMessage.includes('sent successfully') ? 'text-green-600' : 'text-red-600'}`}>
                                {resendMessage}
                            </p>
                        )}
                    <Button
                        type="button"
                        variant="link" // Use link variant or style as needed
                        className="text-[#00A5CF] hover:underline disabled:text-gray-400 disabled:no-underline"
                        onClick={handleResendOtp}
                        disabled={isLoading || isResendingOtp || resendDisabled} // Disable during any loading or cooldown
                    >
                        {isResendingOtp
                        ? 'Sending...'
                        : resendDisabled
                        ? `Resend OTP in ${countdown}s`
                        : 'Resend OTP'}
                    </Button>
                    </div>


                    <div className="text-center mt-6">
                        <p className="text-md font-lato font-normal">
                        Entered wrong email?{' '}
                        <Link href="/auth/sign-up" className="text-[#00A5CF] font-medium text-[20px] hover:underline">
                            Go back to Sign Up
                        </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

const toastErrorStyle = {
    style: {
        border: '1px solid #EF4444', padding: '12px', color: '#B91C1C', background: '#FEF2F2', fontSize: '14px',
    },
    iconTheme: { primary: '#EF4444', secondary: '#FEF2F2' },
};

const toastSuccessStyle = {
    style: {
        border: '1px solid #10B981', padding: '12px', color: '#047857', background: '#ECFDF5', fontSize: '14px',
    },
    iconTheme: { primary: '#10B981', secondary: '#ECFDF5' },
};

export default VerifyEmail;