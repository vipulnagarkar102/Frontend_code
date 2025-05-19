import React, { useState, useEffect } from "react";

interface CustomCarouselProps {
  children: React.ReactNode[];
  visibleCards: number;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ children, visibleCards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = children.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % totalCards;
      console.log(`Shifting to next index: ${newIndex}`); // Debugging log
      return newIndex;
    });
  };

  useEffect(() => {
    console.log(`Autoplay started with currentIndex: ${currentIndex}`); // Debugging log
    const autoplay = setInterval(() => {
      handleNext();
    }, 1500); // Shift every 2 seconds

    return () => clearInterval(autoplay);
  }, [currentIndex]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % totalCards;
      items.push(children[index]);
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="relative w-full overflow-hidden flex justify-center">
      <div className="flex gap-4">
        {visibleItems.map((child, index) => (
          <div key={index} className="flex-shrink-0 w-[300px]">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
