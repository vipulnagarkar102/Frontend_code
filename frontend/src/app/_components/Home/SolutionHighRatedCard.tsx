"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import CustomCarousel from "@/components/ui/CustomCarousel";

interface Video {
  _id: string;
  title: string;
  ratings: number;
  link: string;
  video: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  return (
    <div className="flex gap-1 mt-5 self-start">
      {[...Array(totalStars)].map((_, index) => {
        const fillColor = index + 1 <= rating ? "#008080" : "gray";
        return <Star key={index} size={20} fill={fillColor} color={fillColor} />;
      })}
    </div>
  );
};

const HighRatedCard = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await fetch("/api/top-rated");
        const data = await res.json();
        if (Array.isArray(data)) {
          setVideos(data.filter((v): v is Video => v && typeof v._id === "string"));
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (err) {
        console.error("Failed to fetch top-rated videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopRated();
  }, []);

  if (loading) return <p>Loading top-rated videos...</p>;

  return (
    <div className="w-full overflow-x-hidden mt-5 px-4">
      <CustomCarousel visibleCards={5}>
        {videos.map((video) => (
          <div
            key={video._id}
            className="w-[300px] bg-white shadow-md rounded-lg p-4"
          >
            <Image
              src={video.link}
              alt={video.title}
              width={1000}
              height={500}
              className="rounded-md object-cover w-full h-[150px]"
            />
            <p className="mt-4 text-left font-semibold line-clamp-2 text-sm">
              {video.title}
            </p>
            <StarRating rating={Math.min(5, video.ratings)} />
          </div>
        ))}
      </CustomCarousel>
    </div>
  );
};

export default HighRatedCard;
