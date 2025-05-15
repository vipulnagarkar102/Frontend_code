"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";

interface PricingsPlanProps {
  title: string; // e.g. "Emerging tech"
  price: number; // e.g. 600
  desc: string;
  isAnnual: boolean; // toggle state
}

const PricingsPlan: React.FC<PricingsPlanProps> = ({
  title,
  price,
  desc,
  isAnnual,
}) => {
  const router = useRouter();
  // Format the numeric price as dollars
  const formattedPrice = `$${price.toFixed(2)}`;

  const handleClick = () => {
    if (title === "FlexPick") {
      router.push("/flexpick-plan"); // Only redirect if plan is FlexPick
    }
  };

  return (
    <div
      className="w-[280px] h-[400px] [@media(min-width:1750px)]:w-[380px]
                 [@media(min-width:1750px)]:h-[480px] rounded-[30px]
                 text-[#003F5C] font-poppins font-semibold text-[32px]
                 [@media(min-width:1750px)]:text-[42px] flex flex-col
                 justify-between p-8 gap-6 hover:scale-105 transition-transform
                 duration-200 bg-white border border-[#00A5CF]/20 shadow-md"
    >
      {/* 1) Plan Title */}
      <div>
        <p className="pl-2 bg-gradient-to-r from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#FFFFFF]/5">
          {title}
        </p>
      </div>

      {/* 2) Price Display */}
      <div>
        <p className="font-poppins text-[22px] [@media(min-width:1750px)]:text-[30px] font-semibold">
          {formattedPrice}
          <span className="text-[18px] [@media(min-width:1750px)]:text-[24px] font-normal">
            / {isAnnual ? "Year" : "Month"}
          </span>
        </p>
      </div>

      {/* 1) desc */}
      <div>
        <ul className="list-inside text-left font-lato text-[16px] [@media(min-width:1750px)]:text-[22px] space-y-1">
          {desc.split(",").map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      </div>

      {/* 3) Call-to-Action Button */}
      <div>
        <Button
          onClick={handleClick}
          className="w-full bg-[#00A5CF] hover:bg-[#00A5CF] text-white font-lato py-4 font-semibold cursor-pointer"
        >
          START SUBSCRIPTION{" "}
          <ArrowDown size={24} className="inline-block rotate-225" />
        </Button>
      </div>
    </div>
  );
};

export default PricingsPlan;
