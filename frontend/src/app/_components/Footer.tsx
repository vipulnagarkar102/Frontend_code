"use client";

import Image from 'next/image';
import Link from 'next/link';
import { RiTwitterXFill, RiLinkedinLine, RiYoutubeLine } from "react-icons/ri";
import vtexlogo from '@/assets/vtexlogo .png'
import { useAuthStore } from '@/store/authStore';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';

const Footer = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const recaptchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <footer className="bottom-0 bg-[#003F5C] text-[#FFFFFF] py-8 [@media(min-width:1750px)]:p-10 sm:px-6">
      {/* Horizontal Wrapper */}
      <div className="flex flex-wrap justify-between items-start gap-x-10 gap-y-10 px-4 md:px-6">

        {/* Logo + Social */}
        <div className='flex flex-col gap-4 min-w-[180px]'>
          <Image
            src={vtexlogo}
            alt='Vtex.AI'
            height={80}
            width={120}
          />
          <div className="flex space-x-2 mt-2">
            <a title='X' href="https://x.com/vtex_ai" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-800 rounded-md p-1 w-6 h-6 flex items-center justify-center hover:bg-gray-100"><RiTwitterXFill size={20} color='black' /></a>
            <a title='LinkedIn' href="https://www.linkedin.com/company/vtex-ai/" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-800 rounded-md p-1 w-6 h-6 flex items-center justify-center hover:bg-gray-100"><RiLinkedinLine size={20} color='black' /></a>
            <a title='YouTube' href="https://www.youtube.com/@vtex_ai" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-800 rounded-md p-1 w-6 h-6 flex items-center justify-center hover:bg-gray-100"><RiYoutubeLine size={20} color='black' /></a>
          </div>
        </div>

        {/* Menus */}
        <div className="flex flex-wrap gap-7 text-[15px] sm:text-[16px] [@media(min-width:1750px)]:text-[20px] font-poppins font-semibold leading-tight tracking-wide">
          {/* Menu 1 */}
          <div className="min-w-[150px]">
            <Link href='/contact-us' className="block mb-3">Contact Us</Link>
            <Link href='/terms-and-conditions' className="block mb-3">Terms & Conditions</Link>
            <Link href='/blogs' className="block mb-3">Upcoming Releases</Link>
          </div>

          {/* Menu 2 */}
          <div className="min-w-[200px]">
            <div className="mb-2 text-[#FFB74D]">Healthcare Resources</div>
            <ul className="font-normal space-y-2 text-sm">
            <li className="text-[#FFB74D]">Official U.S. Health Agencies</li>
                <li><Link href="https://www.hhs.gov/"  target="_blank">HHS - Health & Human Services</Link></li>
                <li><Link href="https://www.cms.gov/"  target="_blank">CMS - Medicare & Medicaid</Link></li>
                <li><Link href="https://www.fda.gov/"  target="_blank">FDA - Food & Drug Administration</Link></li>
                <li><Link href="https://www.cdc.gov/"  target="_blank">CDC - Centers for Disease Control</Link></li>
                <li><Link href="https://www.healthit.gov/"  target="_blank">ONC - HealthIT.gov</Link></li>
                <li className="text-[#FFB74D]">Regulatory Updates & Policies</li>
                <li><Link href="https://www.federalregister.gov/"  target="_blank">Federal Register - Healthcare Rules</Link></li>
                <li><Link href="https://www.cms.gov/Regulations-and-Guidance/Regulations-and-Guidance"  target="_blank">CMS - Regulations and Guidance</Link></li>
                <li className="text-[#FFB74D]">Privacy & Security Compliance</li>
                <li><Link href="https://www.hhs.gov/hipaa/for-professionals/privacy/index.html"  target="_blank">HIPAA Privacy Rule</Link></li>
                <li><Link href="https://www.hhs.gov/hipaa/for-professionals/security/index.html"  target="_blank">HIPAA Security Rule</Link></li>
                <li><Link href="https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/index.html"  target="_blank">OCR - HIPAA Enforcement</Link></li>

            </ul>
          </div>

          {/* Menu 3 */}
          <div className="min-w-[200px] ">
            <div className="mb-2 text-[#FFB74D] ">News and Alerts</div>
            <ul className="font-normal space-y-2 text-sm">
            <li><Link href="https://www.hhs.gov/about/news/index.html"  target="_blank">HHS Newsroom</Link></li>
                <li><Link href="https://www.cms.gov/newsroom"  target="_blank">CMS Newsroom</Link></li>
                <li><Link href="https://www.fda.gov/news-events"  target="_blank">FDA Newsroom</Link></li>
                <li><Link href="https://www.cdc.gov/media/index.html"  target="_blank">CDC Newsroom</Link></li>
                <li><Link href="https://www.healthit.gov/newsroom"  target="_blank">ONC HealthIT Newsroom</Link></li>
                <li><Link href="https://www.federalregister.gov/agencies/health-and-human-services-department"  target="_blank">Federal Register - Health Notices</Link></li>
            </ul>
          </div>
        </div>

        {/* Subscription */}
        {isAuthenticated && (
          <div className='flex flex-col gap-4 min-w-[240px]'>
            <div className="text-[16px] sm:text-[20px] font-poppins font-medium">Subscribe for updates</div>
            <div className="flex bg-white rounded-md">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="text-gray-800 text-sm px-3 py-2 w-full focus:outline-none"
              />
              <button
                className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-r-md"
                disabled={!captchaToken} onClick={() => {alert('Subscribed!');}}
              >
                →
              </button>
            </div>
            <div className="flex justify-center pt-2">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY || ''}
                onChange={handleCaptchaChange}
              />
            </div>
          </div>
        )}
      </div>

      {/* Copyright */}
      <div className="border-t border-teal-700 mt-6 pt-4 text-center px-6 text-sm [@media(min-width:1750px)]:text-[18px] font-poppins font-medium">
        © {new Date().getFullYear()} Curiouspods Learning Pvt. Ltd. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
