'use client';

import React from 'react';
import AiSolutionCard from './AiSolutionCard';
import HighRatedCard from './SolutionHighRatedCard';
import TrendingCard from './SolutionTrendingCard';
import WorksCard from './SolutionWorksCard';

const AiSolution = () => {
  return (
    <div className="my-10 flex justify-center flex-col items-center">
      {/* Highest Rated AI Solutions */}
      <AiSolutionCard
        highlightedText="Highest Rated "
        mainText="AI Solutions"
        subText="That Deliver Results"
      />
      <HighRatedCard />

      {/* Trending AI Solutions */}
      <AiSolutionCard
        highlightedText="Trending "
        mainText="AI Solutions"
        subText="What’s Changing the Game"
      />
      <TrendingCard />

      {/* AI That Works */}
      <AiSolutionCard
        highlightedText="AI "
        mainText="That Works"
        subText="Top Reviewed Solutions You Should Know"
      />
      <WorksCard />
    </div>
  );
};

export default AiSolution;
