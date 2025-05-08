"use client";

import React from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import Card from './_components/TermsCard'
import termsData from '@/app/data/terms.json';
import Footer from '@/app/_components/Footer';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
  return (
    <div className='w-full'>
    <div className="min-h-screen max-w-8xl mx-auto font-lato mt-26 text-[#003F5C]">
      <div className="p-6 md:p-10 md:mt-6 flex flex-col">
        {/* Header Section */}
        <div className="mb-8 [@media(min-width:1750px)]:mb-14 text-center space-y-1">
          <h1 className="text-[50px] [@media(min-width:1750px)]:text-[64px] font-poppins font-semibold mb-4">Terms and Conditions</h1>
          <p className="text-[22px] [@media(min-width:1750px)]:text-[28px] font-normal">Last updated 01 April 2025</p>
        </div>
        
        {/* Cards Grid */}
        <div className="mt-6 md:mt-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-8">
          {termsData.map((item) => (
            <Link
              href={`/terms-and-conditions/${item.id}`}
              key={item.id}>
              <Card 
                
                icon={item.icon}
                title={item.title}
              />
            </Link>
          ))}
        </div>
        
         {/* Downloads Section */}
         <div className="mt-8 md:mt-12">
          <h2 className="text-[40px] [@media(min-width:1750px)]:text-[56px] font-semibold font-poppins mb-4">Downloads</h2>
          <div className="flex flex-col space-y-2">
            <a href="/Copyright Takedown Notice Form.docx" download className="font-normal text-[18px] [@media(min-width:1750px)]:text-[22px] hover:underline flex items-center">
              <span>Trade Mark Takedown Notice Form</span>
              <ArrowDown size={16} className="ml-1" />
            </a>
            <a href="/Trade Mark Takedown Notice Form.docx" download className="font-normal text-[18px] [@media(min-width:1750px)]:text-[22px] hover:underline flex items-center">
              <span>Copyright Takedown Notice Form</span>
              <ArrowDown size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
      
      
    </div>
    <Footer/>
    </div>
  );
}