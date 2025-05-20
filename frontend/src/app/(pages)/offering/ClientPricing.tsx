"use client";

import React, { useState, useEffect } from "react";
import ToggleSwitch from "./_components/ToggleSwitch";
import PricingsPlan from "./_components/PricingsPlan";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";

type RawApiResponse = {
  success: boolean;
  data: Record<
    string,
    Array<{
      plan_type: string;
      price: number;
      currency: string;
      desc: string[] | string;
    }>
  >;
};

export default function ClientPricing({
  initialAnnual,
  onToggle,
}: {
  initialAnnual: boolean;
  onToggle: (v: boolean) => void;
}) {
  const [isAnnual, setIsAnnual] = useState(initialAnnual);
  const [plans, setPlans] = useState<
    Array<{ title: string; price: number; desc: string[] }>
  >([]);

  const handleToggle = () => {
    const newState = !isAnnual;
    setIsAnnual(newState);
    onToggle(newState);
  };

  const router = useRouter();

  useEffect(() => {
    async function fetchPlans() {
      const priceType = isAnnual ? "Annual" : "Monthly";
      const res = await fetch(
        `https://paymentapi-95i1.onrender.com/api/prices?priceType=${priceType}`
      );
      const json: RawApiResponse = await res.json();

      const flat = Object.values(json.data)
        .flat()
        .map((p) => ({
          title: p.plan_type,
          price: p.price,
          desc: Array.isArray(p.desc) ? p.desc : [p.desc],
        }));

      setPlans(flat);
    }

    fetchPlans();
  }, [isAnnual]);

  return (
    <>
      {/* Toggle */}
      <div className="flex justify-center items-center gap-4 my-6">
        <span
          className={`font-semibold ${
            !isAnnual ? "text-[#003F5C]" : "text-gray-400"
          }`}
        >
          Monthly
        </span>
        <ToggleSwitch checked={isAnnual} onChange={handleToggle} />
        <span
          className={`font-semibold ${
            isAnnual ? "text-[#003F5C]" : "text-gray-400"
          }`}
        >
          Annually
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="mx-8 my-12 flex flex-wrap gap-10 items-center justify-center">
        {/* Free Plan Card (Aligned with PricingsPlan) */}
        <div
          className="w-[280px] h-[400px] [@media(min-width:1750px)]:w-[380px]
                     [@media(min-width:1750px)]:h-[480px] rounded-[30px]
                     text-white font-poppins font-semibold text-[32px]
                     [@media(min-width:1750px)]:text-[42px] flex flex-col
                     justify-between p-8 gap-6 hover:scale-105 transition-transform
                     duration-200 bg-[#003F5C] border border-[#00A5CF]/20 shadow-md"
        >
          {/* Title */}
          <div>
            <p className=" bg-gradient-to-r from-white/10 via-white/5 to-white/0">
              Advanced AI solutions
            </p>
          </div>

          {/* Price */}
          <div>
            <p className="font-poppins text-[22px] [@media(min-width:1750px)]:text-[30px] font-semibold">
              $0
              <span className="text-[18px] [@media(min-width:1750px)]:text-[24px] font-normal">
                / Forever
              </span>
            </p>
          </div>

          {/* Description */}
          <div>
            <ul className="list-disc list-inside text-left font-lato text-[16px] [@media(min-width:1750px)]:text-[22px] space-y-1">
              <li className="marker:text-white">No credit card required</li>
              <li className="marker:text-white">No registration required</li>
            </ul>
          </div>

          {/* Button */}
          <div>
            <Button
              onClick={() => router.push("/flexpick-plan")}
              className="w-full bg-[#00A5CF] hover:bg-[#00A5CF] cursor-pointer text-white font-lato py-4 font-semibold"
            >
              START FOR FREE{" "}
              <ArrowDown size={24} className="inline-block rotate-225" />
            </Button>
          </div>
        </div>

        {/* Paid Plans */}
        {plans.map((plan, idx) => (
          <PricingsPlan
            key={idx}
            title={plan.title}
            price={plan.price}
            desc={plan.desc}
            isAnnual={isAnnual}
          />
        ))}
      </div>
    </>
  );
}
