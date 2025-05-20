"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";

interface PricingsPlanProps {
  title: string;
  price: number;
  desc: string[];
  isAnnual: boolean;
}

const PricingsPlan: React.FC<PricingsPlanProps> = ({
  title,
  price,
  desc,
  isAnnual,
}) => {
  const router = useRouter();

  // Format price
  const formattedPrice = `$${price.toFixed(2)}`;

  // 🚀 Split comma-separated description if only 1 string is present
  const parsedDesc =
    desc.length === 1 ? desc[0].split(",").map((item) => item.trim()) : desc;

  const handleClick = () => {
    if (title === "FlexPick") {
      router.push("/flexpick-plan");
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
      {/* Plan Title */}
      <div>
        <p className="pl-2 bg-gradient-to-r from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#FFFFFF]/5">
          {title}
        </p>
      </div>

      {/* Price */}
      <div>
        <p className="font-poppins text-[22px] [@media(min-width:1750px)]:text-[30px] font-semibold">
          {formattedPrice}
          <span className="text-[18px] [@media(min-width:1750px)]:text-[24px] font-normal">
            / {isAnnual ? "Year" : "Month"}
          </span>
        </p>
      </div>

      {/* Description as bullet points */}
      <div>
        <ul className="list-disc list-inside text-left font-lato text-[16px] [@media(min-width:1750px)]:text-[22px] space-y-1">
          {parsedDesc.map((item, index) => (
            <li key={index} className="marker:text-[#00A5CF]">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
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
