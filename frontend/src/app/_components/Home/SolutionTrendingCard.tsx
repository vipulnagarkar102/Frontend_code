"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface Video {
  _id: string;
  title: string;
  trendingScore: number;
  link: string;
  video: string;
  valid_from: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const normalizedRating = Math.round((rating / 30) * 5); // Normalize out of 30 to 5
  return (
    <div className="flex gap-1 mt-5 self-start">
      {[...Array(totalStars)].map((_, index) => {
        const fillColor = index + 1 <= normalizedRating ? "#008080" : "gray";
        return <Star key={index} size={20} fill={fillColor} color={fillColor} />;
      })}
    </div>
  );
};

const TrendingCard = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await fetch("/api/trending"); // Or "/api/top-rated" if applicable
        const data = await res.json();
        if (Array.isArray(data)) {
          setVideos(data);
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
    <div className="flex flex-row flex-wrap justify-start gap-6 w-full px-4 py-10">
      {videos.slice(0, 10).map((video) => (
        <div
          key={video._id}
          className="basis-[90%] sm:basis-[48%] md:basis-[31%] lg:basis-[23%] xl:basis-[18%] bg-gradient-to-b from-[#00A5CF]/30 via-[#FFFFFF]/30 to-[#00A5CF]/5 text-[#003F5C] rounded-2xl p-4 shadow-md flex flex-col items-center"
        >
          <Image
            src={video.link}
            alt={video.title}
            width={1000}
            height={500}
            className="rounded-md object-cover w-full h-[150px]"
          />
          <p className="mt-4 text-left font-semibold line-clamp-2 text-sm w-full">
            {video.title}
          </p>
          <p className="mt-5 font-lato font-normal md:font-semibold text-[16px] bg-[#00A897] rounded-2xl py-1 px-3 text-center w-fit text-white self-start">
            Date:{" "}
            {new Date(video.valid_from).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          {/* <StarRating rating={video.trendingScore} /> */}
        </div>
      ))}
    </div>
  );
};

export default TrendingCard;
