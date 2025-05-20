'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import parse from 'html-react-parser';

interface VideoCardProps {
  videoId: string;
  title: string;
  thumbnail: string;
  tags: string[];
  description: string;
  rating?: number;
}

const VideoCard = ({
  videoId,
  title,
  thumbnail,
  tags,
  description,
  rating = 3,
}: VideoCardProps) => {
  const [isLastColumn, setIsLastColumn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        const cardElement = document.getElementById(videoId);
        const rect = cardElement?.getBoundingClientRect();
        const tooltipWidth = 420;
        if (rect) {
          setIsLastColumn(rect.left + rect.width + tooltipWidth > window.innerWidth);
        }
      }, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [videoId]);

  const tooltipId = `tooltip-${videoId}`;

  return (
    <>
      <div
        id={videoId}
        className="flex flex-col w-[300px] min-h-[300px] justify-between gap-3 p-6 bg-gradient-to-b from-[#00A5CF]/30 via-[#FFFFFF]/30 to-[#00A5CF]/5 text-[#003F5C] rounded-2xl transition-transform duration-300 transform hover:scale-105 cursor-pointer"
        data-tooltip-id={tooltipId}
        data-tooltip-place={isLastColumn ? 'left' : 'right'}
      >
        <div className="relative h-40 w-full">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <p className="font-poppins text-[16px] font-medium line-clamp-2">
          {title}
        </p>
        <Link href={`/all-videos/${videoId}`}>
          <Button
            variant="secondary"
            className="bg-[#00A5CF] text-white hover:text-black font-lato font-semibold text-[16px] cursor-pointer"
          >
            Buy Now <span className="rotate-225"><ArrowDown size={30} /></span>
          </Button>
        </Link>
      </div>

      <Tooltip
        id={tooltipId}
        place={isLastColumn ? 'left' : 'right'}
        noArrow={false}
        offset={10}
        style={{
          zIndex: 9999,
          backgroundColor: 'transparent',
          padding: 0,
        }}
        render={() => (
          <div className="p-4 w-[400px] bg-white shadow-lg rounded-lg text-left text-[#003F5C]">
            <h3 className="font-bold text-lg">{title}</h3>
            <div className="text-sm mt-2 max-h-[140px] overflow-hidden line-clamp-6">
              {parse(description)}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {tags
                .filter((tag) => tag.trim() !== '')
                .sort((a, b) => a.length - b.length)
                .slice(0, 5)
                .map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-[#00A5CF]/20 text-xs font-medium rounded-md border border-[#00A5CF]"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        )}
      />
    </>
  );
};

export default VideoCard;