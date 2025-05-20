"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Footer from '@/app/_components/Footer';
import VideoDetailPage from '../_components/VideoDetails';
import MostPurchase from '../_components/MostPurchase';

interface VideoDetails {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  course_category?: string;
  course_benefits: string;
  course_requirements: string;
}

export default function Page() {
  const params = useParams();
  const videoId = params.id as string;
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_USER_API_URL || '';
        const response = await axios.get(`${apiUrl}/videosFromDB/fetch-course-details/${videoId}`);
        setVideoDetails(response.data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!videoDetails) {
    return <p>Error loading video details.</p>;
  }

  return (
    <div>
      <div>
        <VideoDetailPage 
          videoId={videoDetails.videoId} 
          title={videoDetails.title} 
          description={videoDetails.description} 
          thumbnail={videoDetails.thumbnail} 
          tags={videoDetails.tags}
          course_category={videoDetails.course_category} 
          course_benefits={videoDetails.course_benefits}
          course_requirements={videoDetails.course_requirements}
        />
        <MostPurchase />
      </div>
      <Footer />
    </div>
  );
}