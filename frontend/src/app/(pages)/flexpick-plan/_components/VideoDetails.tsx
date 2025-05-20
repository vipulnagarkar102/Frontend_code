'use client'

import React from 'react'
import StarRating from '../../_components/StarRating';
import Image from 'next/image';
import DummyImage from '@/assets/Emerging Tech/AI Model assessment.png'
import { Button } from '@/components/ui/button';
import { ArrowDown, Clock } from 'lucide-react';
import parse from 'html-react-parser';


interface VideoDetailPageProps {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  course_category?: string;
  course_benefits: string;
  course_requirements: string;
}

const VideoDetailPage = ({ videoId, title, description, thumbnail, tags, course_category, course_benefits, course_requirements }: VideoDetailPageProps) => {

  return (
    <div className="py-8 px-4 mt-30 flex flex-col items-center lg:flex-row justify-between md:px-12 gap-10 mx-auto text-[#003F5C] font-lato">
      <div className='lg:w-[60%] flex flex-col gap-4'>
        <div className='flex flex-row text-[20px] font-normal items-center gap-4'>
          <p className='bg-[#FFB74D] px-4 rounded-lg'>{course_category || 'CATEGORY'}</p>
        </div>

        <div>
          <p className='font-extrabold text-[40px]'>{title}</p>
        </div>

        <div>
          <div className='font-normal text-[20px]'>{parse(description)}</div>
        </div>

        <div className='mt-10'>
          <p className='text-[22px] font-semibold font-poppins'>Course Outcomes</p>
          <p className='text-[16px] font-normal'>{course_benefits}</p>
        </div>

        <div className='mt-10'>
          <p className='text-[22px] font-semibold font-poppins'>Course Requirements</p>
          <p className='text-[16px] font-normal'>{course_requirements}</p>
        </div>
      </div>

      <div className='lg:w-[30%] flex flex-col items-center justify-center gap-4'>
        <div className='flex flex-col w-[330px] sm:w-[400px] min-h-[360px] justify-between gap-3 p-6 bg-gradient-to-b from-[#00A5CF]/30 via-[#FFFFFF]/30 to-[#00A5CF]/5 text-[#003F5C] rounded-2xl'>
          <div className="relative h-60 w-full">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <p className='font-poppins text-[28px] font-bold'>$128</p>
          <div className='flex flex-row items-center gap-2'>
            <Clock color='red' size={20} />
            <p className='font-poppins font-normal text-[18px] text-red-500'>3 days left at this price!</p>
          </div>
          <Button className='font-lato py-4 font-semibold text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%]'>BUY NOW<span className='rotate-225'><ArrowDown size={30} /></span></Button>
        </div>

        <div>
          <p className='font-poppins font-normal text-[16px] text-center text-[#003F5C80]'>The prices listed above do not incorporate the taxes applicable based on your billing location. The total amount payable will be shown on the checkout page prior to finalizing your payment.</p>
        </div>
      </div>
    </div>
  )
}

export default VideoDetailPage