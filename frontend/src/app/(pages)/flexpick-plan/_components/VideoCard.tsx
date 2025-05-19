import Image from 'next/image'
import React from 'react'
import DummyImage from '@/assets/Emerging Tech/Generative AI for architects.png'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface VideoCardProps {
  videoId: string,
  title: string;
  thumbnail: string;
  tags: string[];
  description: string;
  rating?: number;
}


const VideoCard = ({videoId, title, thumbnail, tags, rating = 3 }: VideoCardProps) => {
  return (
    <div className='flex flex-col w-[250px] min-h-[320px] justify-between gap-3 p-6 bg-gradient-to-b from-[#00A5CF]/30 via-[#FFFFFF]/30 to-[#00A5CF]/5 text-[#003F5C] rounded-2xl'>
      <div className="relative h-36 w-full">
        <Image 
          src={thumbnail} 
          alt={title} 
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <p className='font-poppins text-[16px] font-medium line-clamp-2'>{title}</p>
      <Link href={`/all-videos/${videoId}`}>
      <Button variant='secondary' className='bg-[#00A5CF] text-white hover:text-black font-lato font-semibold text-[16px] cursor-pointer'>WATCH NOW<span className='rotate-225'><ArrowDown size={30}/></span></Button>

      </Link>
       
    </div>
  )
}

export default VideoCard