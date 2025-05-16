'use client';

import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaGoogle, FaLinkedin } from 'react-icons/fa'; // Import OAuth icons

import LoginImg from '@/assets/pay-per-code.png';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { LoginPayload as BaseLoginPayload } from '@/store/authTypes';
type LoginPayload = BaseLoginPayload;

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


const Login = () => {
  const [formData, setFormData] = useState<Omit<LoginPayload, 'captchaToken'>>({
    email: '',
    password: '',
  });

  const { login, isLoading, error: storeError, isAuthenticated, isAuthInitialized, clearError } = useAuthStore();
  const router = useRouter();

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthInitialized && isAuthenticated) {
      router.push('/customer-dashboard');
    }
  }, [isAuthenticated, isAuthInitialized, router]);

   useEffect(() => {
        return () => { clearError(); };
    }, [clearError]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    clearError();
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    const validationErrors: string[] = [];
    if (!formData.email.trim()) { validationErrors.push('Email is required'); }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { validationErrors.push('Email is invalid'); }
    if (!formData.password) { validationErrors.push('Password is required'); }
    if (!captchaToken) { validationErrors.push('Please complete the CAPTCHA verification.'); }

    if (validationErrors.length > 0) {
      validationErrors.forEach(msg => toast.error(msg, toastErrorStyle));
       if (!validationErrors.includes('Please complete the CAPTCHA verification.') && captchaToken && recaptchaRef.current) {
           recaptchaRef.current.reset(); setCaptchaToken(null);
       }
      return;
    }

    const payload: LoginPayload = {
      email: formData.email.trim(), password: formData.password, captchaToken: captchaToken as string
    };

    try {
      await login(payload);
      const state = useAuthStore.getState();
      if (state.requiresVerification && state.userIdForVerification) {
         toast.success('Login successful! Please verify your email to activate your account.', toastSuccessStyle);
         router.push('/auth/verify-email');
         return;
      }
      if (state.isAuthenticated) {
         toast.success('Login Successful!', toastSuccessStyle);
         router.push('/customer-dashboard');
      }
    } catch (err: any) {
       const latestError = useAuthStore.getState().error;
        console.error("Login Error:", useAuthStore.getState());
       toast.error(latestError || 'Login failed. Please check credentials.', toastErrorStyle);
       if (recaptchaRef.current) { recaptchaRef.current.reset(); setCaptchaToken(null); }
    }
  };

   const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;
   if (!siteKey) {
        return <div className='p-4 text-red-600 text-center min-h-screen flex items-center justify-center'>CAPTCHA configuration error.</div>;
   }

   const API_BASE_URL = process.env.NEXT_PUBLIC_USER_API_URL;


  return (
    <div className="mt-26 flex min-h-screen w-full flex-col lg:flex-row text-[#003F5C]">
      <div className="hidden lg:block lg:w-[40%] flex-shrink-0">
        <div className="h-full w-full relative">
          <Image src={LoginImg} alt="Login" layout="fill" objectFit="cover" priority />
        </div>
      </div>

       <div className="w-full lg:w-[60%] flex items-center justify-center p-4 md:p-6 mt-[72px] lg:mt-0">
        <div className="w-full max-w-[600px] bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-[40px] font-bold text-center font-poppins">Welcome</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Email Address*</label>
              <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input type="email" id="email" name="email" placeholder="your@email.com" className="w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] border-gray-300" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Password*</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter your password" className="w-full text-sm md:text-base pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] border-gray-300" value={formData.password} onChange={handleChange} required />
                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
            </div>
             <div className="flex justify-center pt-2">
                <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} onChange={handleCaptchaChange} />
             </div>
            <Button type='submit' className='w-full font-poppins py-3 md:py-4 mt-4 font-semibold text-base md:text-[18px] cursor-pointer bg-[#00A5CF] hover:bg-[#008CBA] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed' disabled={isLoading}>
              {isLoading ? 'Logging In..' : 'Login'}
            </Button>
          </form>

          <div className="text-center mt-6">
             <p className="text-base md:text-[18px] font-lato font-normal">
              Don't have an account?{' '}
              <Link href="/auth/sign-up" className="text-[#00A5CF] font-medium hover:underline"> Register Now </Link>
            </p>
          </div>

           {/* --- OAuth Buttons Section --- */}
           <div className="mt-6">
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true"> <div className="w-full border-t border-gray-300" /> </div>
                    <div className="relative flex justify-center"> <span className="bg-white px-2 text-sm text-gray-500">OR CONTINUE WITH</span> </div>
                </div>
                <div className="mt-4 flex flex-col md:flex-row gap-3">
                    <a href={`${API_BASE_URL}/auth/google`} className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                         <span className="sr-only">Continue with Google</span>
                         <FaGoogle className="h-5 w-5 text-red-500" aria-hidden="true" />
                         <span className="ml-2">Continue with Google</span>
                    </a>
                    <a href={`${API_BASE_URL}/auth/linkedin`} className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                         <span className="sr-only">Continue with LinkedIn</span>
                         <FaLinkedin className="h-5 w-5 text-blue-600" aria-hidden="true" />
                         <span className="ml-2">Continue with LinkedIn</span>
                    </a>
                </div>
            </div>
            {/* --- End OAuth Buttons Section --- */}

        </div>
      </div>
    </div>
  );
};


const LoginPage = () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;
    if (!siteKey) {
        return ( <div className="flex items-center justify-center min-h-screen p-4"> <div className="p-4 md:p-6 bg-red-100 text-red-700 rounded border border-red-400 text-center"> <h3 className="font-bold mb-2">Configuration Error</h3> <p>Missing ReCAPTCHA configuration.</p> </div> </div> );
    }
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 4000 }} />
            <Login />
        </>
    );
};

export default LoginPage;