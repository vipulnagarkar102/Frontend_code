'use client';

import React from 'react';
import AiSolutionCard from './AiSolutionCard';
import HighRatedCard from './SolutionHighRatedCard';
import TrendingCard from './SolutionTrendingCard';
import WorksCard from './SolutionWorksCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const AiSolution = () => {
  return (
    <div className="my-10 w-full">
      {/* Highest Rated AI Solutions */}
      <AiSolutionCard
        highlightedText="Highest Rated "
        mainText="AI Solutions"
        subText="That Deliver Results"
      />
      <div className="w-[1400] overflow-x-hidden mt-5 px-4">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="flex gap-6">
            {[...Array(10)].map((_, index) => (
              <CarouselItem key={index} className="w-[300px] flex-shrink-0">
                <HighRatedCard />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Trending AI Solutions */}
      <AiSolutionCard
        highlightedText="Trending "
        mainText="AI Solutions"
        subText="What’s Changing the Game"
      />
      <div className="w-[1400] overflow-x-hidden mt-5 px-4">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="flex gap-6">
            {[...Array(10)].map((_, index) => (
              <CarouselItem key={index} className="w-[300px] flex-shrink-0">
                <TrendingCard />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* AI That Works */}
      <AiSolutionCard
        highlightedText="AI "
        mainText="That Works"
        subText="Top Reviewed Solutions You Should Know"
      />
      <div className="w-[1400] overflow-x-hidden mt-5 px-4">
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="flex gap-6">
            {[...Array(10)].map((_, index) => (
              <CarouselItem key={index} className="w-[300px] flex-shrink-0">
                <WorksCard />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default AiSolution;
