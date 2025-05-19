'use client'

import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import VideoCard from './_components/VideoCard'
// import Autoplay from "embla-carousel-autoplay"
import { Search } from 'lucide-react'
import axios from 'axios';

import Link from 'next/link'
import Footer from '@/app/_components/Footer'

interface FetchedVideo {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  course_category: string;
}

const VideosPage = () => {
  const [videos, setVideos] = useState<FetchedVideo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('HealthTech AI');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 3 rows x 4 columns

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_USER_API_URL || '';
        const response = await axios.get<{ videos: FetchedVideo[] }>(`${apiUrl}/videosFromDB/fetch-all-flexpick-courses`);
        setVideos(response.data.videos);
        console.log('Fetched videos count:', response.data.videos.length);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const categorizedVideos = videos.map((video: FetchedVideo) => ({
    ...video,
    category: video.course_category === 'HealthTech AI Plan' ? 'HealthTech AI' : 'Emerging Tech'
  }));

  const filteredVideos = searchTerm.trim() === ''
    ? categorizedVideos.filter(video => video.category === activeTab)
    : categorizedVideos.filter(video => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const titleMatch = video.title.toLowerCase().includes(lowerSearchTerm);
      const tagMatch = video.tags.some((tag: string) =>
        tag.toLowerCase().includes(lowerSearchTerm)
      );
      return (titleMatch || tagMatch) && video.category === activeTab;
    });

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const paginatedVideos = filteredVideos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full mx-auto mt-30 text-[#003F5C]">
      <div className="lg:w-[85%] flex flex-col md:items-center md:justify-between my-6 gap-4 mx-auto px-[12px]">
        <h2 className="text-[40px] md:text-[50px] font-poppins font-semibold text-center">FlexPick Marketplace</h2>

        {/* Search Input with Button */}
        <div className="min-w-[65%] mt-4 relative font-lato font-normal text-[22px] flex justify-center">
          <div className="flex w-full max-w-2xl">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search by title or tag..."
                className="pl-10 pr-4 py-2 text-[18px] border border-gray-300 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00A5CF] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => { }}
              className="bg-[#00A5CF] cursor-pointer text-white px-6 py-2 text-[18px] rounded-r-lg hover:bg-[#008bb3] transition-all duration-200"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mt-6">
        <button
          className={`px-6 py-2 text-[18px] font-semibold ${activeTab === 'HealthTech AI' ? 'text-white bg-[#00A5CF]' : 'text-[#003F5C] bg-gray-200'} rounded-l-lg`}
          onClick={() => setActiveTab('HealthTech AI')}
        >
          HealthTech AI
        </button>
        <button
          className={`px-6 py-2 text-[18px] font-semibold ${activeTab === 'Emerging Tech' ? 'text-white bg-[#00A5CF]' : 'text-[#003F5C] bg-gray-200'} rounded-r-lg`}
          onClick={() => setActiveTab('Emerging Tech')}
        >
          Emerging Tech
        </button>
      </div>

      {/* <h2 className="text-[40px] w-fit pl-12 mt-12 font-poppins font-semibold bg-gradient-to-r from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#FFFFFF]/5">{activeTab}</h2> */}

      <div className="w-full flex justify-center mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 max-w-7xl">
          {paginatedVideos.length > 0 ? (
            paginatedVideos.map((video, index) => (
              <div key={index} className="flex justify-center">
                <VideoCard
                  videoId={video.id.toString()}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  tags={video.tags}
                  description={video.description}
                  rating={4}
                />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-12 col-span-full">
              <p className="text-[32px] md:text-[40px] px-6 font-lato font-semibold">No videos found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {filteredVideos.length > itemsPerPage && (
        <div className="flex justify-center my-6 gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-[18px] font-semibold ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#00A5CF] text-white hover:bg-[#008bb3]'} rounded-lg`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-[18px] font-semibold ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#00A5CF] text-white hover:bg-[#008bb3]'} rounded-lg`}
          >
            Next
          </button>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default VideosPage
