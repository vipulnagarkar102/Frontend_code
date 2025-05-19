'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Star, GraduationCap, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FaqAccordion from './FaqAccordian';
import RatingsReviews from './RatingReviews';
import HeroImage from '@/assets/Rectangle 77.png';
import Footer from '@/app/_components/Footer';

interface Review {
  id: string | number;
  userName: string;
  rating: number;
  text: string;
  timestamp: string;
}

interface VideoProps {
  video: {
    id: string;
    title: string;
    progress: number;
    rating: number;
    enrolledDate: string;
    totalEnrolled: number;
    lastUpdatedDate: string;
    description: string;
    ratingCounts: number[];
    reviews: Review[];
  };
}

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const fillColor = index + 1 <= rating ? "#008080" : "gray";
        return <Star key={index} size={20} fill={fillColor} color={fillColor} />;
      })}
    </div>
  );
};


const VideoDetails: React.FC<VideoProps> = ({ video }) => {
  const [activeTab, setActiveTab] = useState('Course Info');
  const tabs = ['Course Info', 'Reviews', 'Resources'];

  const getActionText = () => {
    if (video.progress === 0) return "START LEARNING";
    if (video.progress === 100) return "DOWNLOAD CERTIFICATE";
    return "CONTINUE LEARNING";
  };

  return (
    <div className='min-h-screen bg-white text-[#003F5C] mt-32 w-screen'>
      <div className='flex flex-col lg:flex-row mx-4 justify-between'>
        <div className='lg:w-[65%] p-2 md:p-4 lg:p-8 flex flex-col m-4 lg:m-8'>
          <div className='flex justify-between flex-wrap flex-row items-center'>
            <h1 className="text-[32px] font-bold mb-2">{video.title}</h1>
            <StarRating rating={video.rating} />
          </div>
          <span className="w-[120px] md:w-[150px] bg-[#FFB74D] text-[#FFFFFF] font-lato text-[15px] md:text-[20px] font-normal mr-2 mt-4 lg:mt-1 px-4 py-0.5 rounded-lg mb-2">
            FlexPick plan
          </span>
          <div className="mt-8 relative rounded-[30px] overflow-hidden w-full h-[240px] md:h-[340px] lg:h-[420px]">
            <Image src={HeroImage} alt="Hero Image" fill objectFit="cover" />
          </div>
          <div className="border-b border-gray-200 my-6">
            <nav className="flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab ? 'text-[#00A5CF]' : 'border-transparent'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-poppins text-[14px] md:text-[18px] font-semibold cursor-pointer`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div>
            {activeTab === 'Course Info' && (
              <div>
                <p className="font-poppins text-[16px] md:text-[24px] font-semibold mb-4">About Course</p>
                <p className="font-lato text-[18px] font-normal">{video.description}</p>
                <p className='font-poppins text-[16px] md:text-[24px] font-semibold mb-4 mt-8'>Course Content</p>

                {/* Faqs */}

                <FaqAccordion />
              </div>
            )}
            {activeTab === 'Reviews' && (

                // Rating and reviews

              <RatingsReviews
                averageRating={video.rating}
                totalReviews={video.ratingCounts.reduce((sum, count) => sum + count, 0)}
                ratingCounts={video.ratingCounts}
                reviews={video.reviews}
              />
              
            )}
            {activeTab === 'Resources' && (
              <p className="font-lato text-[18px] font-normal">Course resources would be listed here.</p>
            )}
          </div>
        </div>
        <div className='lg:w-[25%] bg-[#F8F7F2] shadow-xl h-[540px] rounded-lg flex flex-col gap-6 p-6 m-8'>
          <p>Course Progress</p>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
            <span>1/1</span>
            <span>{video.progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-[#00A897] h-2 rounded-full" style={{ width: `${video.progress}%` }}></div>
          </div>
          <Button variant="outline" className="font-lato font-semibold text-[16px] text-[#FFFFFF] cursor-pointer mt-2 mx-6 p-4 py-6 rounded-lg bg-[#00A897]">
            {getActionText()}
          </Button>
          <div className="flex items-start space-x-3 font-lato text-[18px] mt-4 mb-4">
            <GraduationCap className="h-5 w-5 text-[#00A5CF] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <span>You enrolled in this course on <br/><span className="font-bold text-[#00A5CF]">{video.enrolledDate}</span></span>
          </div>
          <div className="flex items-center space-x-3 font-lato text-[18px] mb-4">
            <Users className="h-5 w-5 text-[#003F5C] flex-shrink-0" strokeWidth={1.5} />
            <span className='text-[#003F5C] opacity-75'>{video.totalEnrolled} Total Enrolled</span>
          </div>
          <div className="flex items-center space-x-3 font-lato text-[18px]">
            <Clock className="h-5 w-5 text-[#003F5C] flex-shrink-0" strokeWidth={1.5} />
            <span className='text-[#003F5C] opacity-75'>{video.lastUpdatedDate} Last Updated</span>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default VideoDetails;