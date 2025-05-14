'use client'

import React, { useState } from 'react'
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

import videoData from '@/app/data/videos1.json'
import Link from 'next/link'
import Footer from '@/app/_components/Footer'

const VideosPage = () => {
  const { videos } = videoData;
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredVideos = searchTerm.trim() === '' 
    ? videos 
    : videos.filter(video => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const titleMatch = video.title.toLowerCase().includes(lowerSearchTerm);
        const tagMatch = video.tags.some(tag => 
          tag.toLowerCase().includes(lowerSearchTerm)
        );
        return titleMatch || tagMatch;
      });

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
              onClick={() => {}}
              className="bg-[#00A5CF] cursor-pointer text-white px-6 py-2 text-[18px] rounded-r-lg hover:bg-[#008bb3] transition-all duration-200"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-[40px] w-fit pl-12 mt-12 font-poppins font-semibold bg-gradient-to-r from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#FFFFFF]/5">HealthTech AI</h2>

      <div className='max-w-screen mx-auto flex items-center justify-center max-h-screen mt-5'>
        {filteredVideos.length > 0 ? (
          <Carousel className="mt-10 w-[250px] md:w-[600px] lg:w-[900px] xl:w-[1200px] xl:[@media(min-width:1400px)]:w-[1300px] ml-4 md:ml-0">
            <CarouselContent>
              {filteredVideos.map((video, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center">
                  <VideoCard
                    videoId={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    tags={video.tags}
                    description={video.description}
                    rating={4}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="w-full text-center py-12">
            <p className="text-[32px] md:text-[40px] px-6 font-lato font-semibold">No videos found matching your search.</p>
          </div>
        )}
      </div>

      <h2 className="text-[40px] w-fit pl-12 mt-12 font-poppins font-semibold bg-gradient-to-r from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#FFFFFF]/5">Emerging Tech</h2>

      <div className='max-w-screen mx-auto flex items-center justify-center max-h-screen mt-5 mb-10'>
        {filteredVideos.length > 0 ? (
          <Carousel className="mt-10 w-[250px] md:w-[600px] lg:w-[900px] xl:w-[1200px] xl:[@media(min-width:1400px)]:w-[1300px] ml-4 md:ml-0">
            <CarouselContent>
              {filteredVideos.map((video, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center">
                  <VideoCard
                    videoId={video.id}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    tags={video.tags}
                    description={video.description}
                    rating={4}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="w-full text-center py-12">
            <p className="text-[32px] md:text-[40px] px-6 font-lato font-semibold">No videos found matching your search.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default VideosPage
