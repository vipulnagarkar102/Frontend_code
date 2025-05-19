'use client';

import React, { useEffect, useState, useRef, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from 'react-hot-toast';

import SignUpImg from '@/assets/pay-per-code.png';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaCalendar, FaIndustry, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { RegisterPayload as BaseRegisterPayload } from '@/store/authTypes';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';


type RegisterPayload = BaseRegisterPayload & { captcha?: string | null };

type SignUpFormData = Omit<RegisterPayload, 'industry' | 'preferences' | 'captcha'> & {
    industry: BaseRegisterPayload['industry'] | '';
    preferences: { notification_opt_in: boolean };
};

const toastErrorStyle = {
    style: {
        border: '1px solid #EF4444',
        padding: '12px',
        color: '#B91C1C',
        background: '#FEF2F2',
        fontSize: '14px',
    },
    iconTheme: {
        primary: '#EF4444',
        secondary: '#FEF2F2',
    },
};

const toastSuccessStyle = {
    style: {
        border: '1px solid #10B981',
        padding: '12px',
        color: '#047857',
        background: '#ECFDF5',
        fontSize: '14px',
    },
    iconTheme: {
        primary: '#10B981',
        secondary: '#ECFDF5',
    },
};

// Regex for password validation (matches backend Joi)
const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$');


const SignUp = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        first_name: '', last_name: '', DoB: '', industry: '', email: '',
        password: '', phone_number: '',
        address: { state: '', country: '' },
        preferences: { notification_opt_in: false }
    });

    const { register, isLoading, error: storeError, isAuthInitialized, isAuthenticated, clearError, requiresVerification } = useAuthStore();
    const router = useRouter();
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthInitialized && isAuthenticated) {
            router.push('/customer-dashboard');
        }
    }, [isAuthenticated, isAuthInitialized, router]);

    useEffect(() => {
        return () => { clearError(); };
    }, [clearError]);

    const [showPassword, setShowPassword] = useState(false);
    // **FIXED:** Industries array now matches backend Joi schema
    const industries = [
        'Healthcare',
        'Digital Engineering',
        'Life science',
        'Pharmaceutical Companies',
        'Health Insurance',
        'Software Development',
        'Ed Tech', // Note the space
        'Hospitals & Health Systems', // Added from Joi
        'Others'
    ];


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        clearError();
        setFormData(prev => {
            if (name.includes('.')) {
                const [parent, child] = name.split('.') as ['address', string];
                if (parent === 'address') {
                    return { ...prev, address: { ...(prev.address ?? { state: '', country: '' }), [child]: value } };
                }
            }
            return { ...prev, [name]: value };
        });
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (name === 'notification_opt_in') {
            setFormData(prev => ({ ...prev, preferences: { ...prev.preferences, notification_opt_in: checked } }));
        }
    };

    const handleCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
    };

    const handlePhoneNumberChange = (value: string | undefined) => {
        clearError();
        setFormData(prev => ({ ...prev, phone_number: value ?? '' }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearError();

        if (!formData.preferences.notification_opt_in) {
            toast.error('Please agree to the Terms and Conditions to continue.', toastErrorStyle);
            return;
        }

        const validationErrors: string[] = [];
        if (!formData.first_name.trim()) validationErrors.push('First name is required');
        if (!formData.last_name.trim()) validationErrors.push('Last name is required');
        if (!formData.email.trim()) validationErrors.push('Email is required');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.push('Email is invalid');

        if (!formData.password) {
            validationErrors.push('Password is required');
        } else {
            if (formData.password.length < 6) {
                validationErrors.push('Password must be at least 6 characters long');
            }
            // **ADDED:** Frontend check for password pattern
            if (!passwordRegex.test(formData.password)) {
                validationErrors.push('Password needs uppercase, lowercase, number, & special char');
            }
        }

        if (!formData.industry) validationErrors.push('Industry is required');
        // Ensure selected industry is valid (should match backend now)
        else if (!industries.includes(formData.industry)) {
            validationErrors.push('Invalid industry selected.'); // Should not happen if list matches
        }

        if (formData.address?.country && formData.address.country.trim().length > 0 && formData.address.country.trim().length !== 2) {
            validationErrors.push('Country must be a 2-letter code (e.g., US)');
        }
        if (!captchaToken) {
            validationErrors.push('Please complete the CAPTCHA verification.');
        }
        if (formData.phone_number && !isValidPhoneNumber(formData.phone_number)) {
            validationErrors.push('Please enter a valid phone number');
        }

        if (validationErrors.length > 0) {
            validationErrors.forEach(msg => toast.error(msg, toastErrorStyle));
            if (!validationErrors.includes('Please complete the CAPTCHA verification.') && captchaToken && recaptchaRef.current) {
                recaptchaRef.current.reset();
                setCaptchaToken(null);
            }
            return;
        }

        // Use optional chaining and nullish coalescing for potentially undefined industry
        const selectedIndustry = formData.industry && industries.includes(formData.industry)
            ? formData.industry
            : undefined;

        const payload: RegisterPayload = {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            DoB: formData.DoB || null,
            industry: selectedIndustry, // Send selected or undefined
            email: formData.email.trim(),
            password: formData.password,
            phone_number: formData.phone_number?.trim() || null,
            address: {
                state: formData.address?.state?.trim() || null,
                country: formData.address?.country?.trim().toUpperCase() || null,
            },
            preferences: {
                notification_opt_in: formData.preferences.notification_opt_in
            },
            captcha: captchaToken as string
        };

        try {
            await register(payload);
            const state = useAuthStore.getState();
            if (state.requiresVerification && state.userIdForVerification) {
                toast.success('Registration successful! Please check your email for verification.', toastSuccessStyle);
                router.push('/auth/verify-email');
            } else if (!state.error) {
                toast.success('Registration successful!', toastSuccessStyle);
                router.push('/auth/login');
            }

        } catch (err: any) {
            const latestError = useAuthStore.getState().error;
            toast.error(latestError || 'Registration failed. Please try again.', toastErrorStyle);

            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
                setCaptchaToken(null);
            }
        }
    };

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;
    if (!siteKey) {
        return <div className='p-4 text-red-600 text-center min-h-screen flex items-center justify-center'>ReCAPTCHA configuration error.</div>;
    }

    return (
        <div className="mt-30 flex min-h-screen w-full flex-col lg:flex-row text-[#003F5C]">
            <div className="hidden lg:block lg:w-[40%] flex-shrink-0">
                <div className="h-full w-full relative">
                    <Image src={SignUpImg} alt="Sign Up" layout="fill" objectFit="cover" priority />
                </div>
            </div>

            <div className="w-full lg:w-[60%] flex items-center justify-center p-4 md:p-6 mt-[72px] lg:mt-0">
                <div className="w-full max-w-[600px] bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-3xl md:text-[40px] font-bold text-center font-poppins">Create an Account</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">First Name*</label>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="first_name" name="first_name" placeholder="John" className="w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] border-gray-300" value={formData.first_name} onChange={handleChange} required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Last Name*</label>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="last_name" name="last_name" placeholder="Doe" className="w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] border-gray-300" value={formData.last_name} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="DoB" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Date of Birth</label>
                            <div className="relative">
                                <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input type="date" id="DoB" name="DoB" className="w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] text-gray-500 border-gray-300" value={formData.DoB ?? ''} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="industry" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Industry*</label>
                            <div className="relative">
                                <FaIndustry className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <select id="industry" name="industry" className={`w-full text-sm md:text-base pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] bg-white appearance-none border-gray-300 ${!formData.industry ? 'text-gray-500' : ''}`} value={formData.industry} onChange={handleChange} required>
                                    <option value="" disabled>Select your industry</option>
                                    {/* Updated options to match backend */}
                                    {industries.map((industry) => (<option key={industry} value={industry}>{industry}</option>))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="address.state" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">State</label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="address.state" name="address.state" placeholder="California" className="w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] border-gray-300" value={formData.address?.state ?? ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="address.country" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Country (2-letter code)</label>
                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input type="text" id="address.country" name="address.country" placeholder="US" maxLength={2} className="w-full text-sm md:text-base pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] uppercase border-gray-300" value={formData.address?.country ?? ''} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
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
                                <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="••••••••" className="w-full text-sm md:text-base pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] border-gray-300" value={formData.password} onChange={handleChange} required />
                                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                </button>
                            </div>
                            {/* Optional: Add a hint for password requirements */}
                            {/* <p className="text-xs text-gray-500 mt-1">Must include uppercase, lowercase, number, special char (@$!%*?&).</p> */}
                        </div>
                        <div>
                            <label htmlFor="phone_number" className="block text-sm md:text-[16px] text-gray-700 font-lato font-bold mb-1">Phone Number</label>
                            <div className="relative">
                                <PhoneInput
                                    international
                                    id="phone_number"
                                    name="phone_number"
                                    defaultCountry="US"
                                    value={formData.phone_number ?? ''}
                                    onChange={handlePhoneNumberChange}
                                    className="w-full text-sm md:text-base pl-3 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A5CF] border-gray-300"
                                />
                            </div>
                            {formData.phone_number && !isValidPhoneNumber(formData.phone_number) && (
                                <p className="text-xs text-red-500 mt-1">Invalid phone number format for the selected country.</p>
                            )}
                        </div>
                        <div className="flex items-center pt-2">
                            <input
                                type="checkbox"
                                id="notification_opt_in"
                                name="notification_opt_in"
                                className="h-4 w-4 md:h-5 md:w-5 text-[#00A5CF] rounded focus:ring-[#00A5CF] border-gray-300 cursor-pointer"
                                checked={formData.preferences.notification_opt_in}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="notification_opt_in" className="ml-2 block text-sm md:text-[16px] text-gray-700 font-lato cursor-pointer">
                                I agree to the{" "}
                                <a
                                    href="/terms-and-conditions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#00A5CF] underline hover:text-[#007ba1]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>

                        <div className="flex justify-center pt-2">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={siteKey}
                                onChange={handleCaptchaChange}
                            />
                        </div>

                        <Button
                            type='submit'
                            className='w-full font-poppins py-3 md:py-4 mt-4 font-semibold text-base md:text-[18px] cursor-pointer bg-[#00A5CF] hover:bg-[#008CBA] text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={isLoading || !formData.preferences.notification_opt_in}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-base md:text-[18px] font-lato font-normal">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="text-[#00A5CF] font-medium hover:underline">Login Here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SignUpPage = () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;

    if (!siteKey) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="p-4 md:p-6 bg-red-100 text-red-700 rounded border border-red-400 text-center">
                    <h3 className="font-bold mb-2">Configuration Error</h3>
                    <p>Missing ReCAPTCHA configuration.</p>
                </div>
            </div>
        );
    }
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{ duration: 4000 }}
            />
            <SignUp />
        </>
    );
};

export default SignUpPage;