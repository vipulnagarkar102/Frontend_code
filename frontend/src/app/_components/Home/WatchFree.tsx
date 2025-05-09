"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React from "react";

const WatchFree = () => {
  return (
    <div className="bg-[#E0F7FA] w-full xl:h-[600px] [@media(min-width:1750px)]:h-[480px] relative">
      {/* Flex container with sidebar and content */}
      <div className="flex flex-col xl:flex-row w-full h-full">
        {/* LEFT SIDEBAR */}
        <div className="hidden xl:flex items-center justify-center w-[100px] bg-[#00A5CF]">
          <p className="transform -rotate-90 text-white font-poppins font-semibold text-[32px] whitespace-nowrap">
            START FOR FREE
          </p>
        </div>

        {/* FOR SMALL SCREENS */}
        <div className="xl:hidden w-full bg-[#00A5CF] py-4 text-center">
          <p className="text-white font-poppins font-semibold text-[28px]">
            START FOR FREE
          </p>
        </div>

        {/* MAIN CARD SECTION */}
        <div className="flex-1 w-full px-4 md:px-8 py-6 flex flex-wrap justify-center gap-6">
          {/* CARD 1 */}
          <div className="w-full sm:w-[48%] lg:w-[45%] bg-white rounded-[10px] shadow-md overflow-hidden">
            <div
              className="w-full h-[280px] bg-cover bg-center"
              style={{
                backgroundImage: "url('/Fibrosis predictions.png')",
              }}
            />
            <div className="p-6 flex flex-col gap-4">
              <p className="font-lato text-[22px] text-[#1A1A1A]">
                Predicting Fibrosis Stages in NAFLD Using Advanced AI
                Models
              </p>
              <Link
                href="https://iframe.dacast.com/vod/9900da50-f739-dfb2-d77e-a292aac8b47f/d28e41cb-3e2d-48c7-b6b2-1c02b7368324"
                target="_blank"
              >
                <Button
                  variant="secondary"
                  className="bg-[#00A5CF] text-white hover:scale-105 duration-150 hover:bg-[#00A5CF] font-lato font-semibold text-[16px] [@media(min-width:1750px)]:text-[20px]"
                >
                  WATCH NOW
                  <span className="rotate-225 ml-2">
                    <ArrowDown size={30} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="w-full sm:w-[48%] lg:w-[45%] bg-white rounded-[10px] shadow-md overflow-hidden">
            <div
              className="w-full h-[280px] bg-cover bg-center"
              style={{
                backgroundImage: "url('/Generative AI for DevOps.png')",
              }}
            />
            <div className="p-6 flex flex-col gap-4">
              <p className="font-lato text-[22px] text-[#1A1A1A]">
                Revolutionizing DevSecOps: AI and Generative AI in Action Models
                Models
              </p>
              <Link
                href="https://iframe.dacast.com/vod/9900da50-f739-dfb2-d77e-a292aac8b47f/22e74208-fa8c-44dc-b5d1-540ffbc68c5b4"
                target="_blank"
              >
                <Button
                  variant="secondary"
                  className="bg-[#00A5CF] text-white hover:scale-105 duration-150 hover:bg-[#00A5CF] font-lato font-semibold text-[16px] [@media(min-width:1750px)]:text-[20px]"
                >
                  WATCH NOW
                  <span className="rotate-225 ml-2">
                    <ArrowDown size={30} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchFree;
