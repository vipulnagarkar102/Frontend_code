/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";
import { useUserStore } from "../../../../store/userStore";

// Define API base URL
const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2000';
console.log("URL:",apiBase)

interface PricingsPlanProps {
  title: string;        // e.g. "Emerging tech"
  price: number;        // e.g. 600
  desc: string | string[];
  isAnnual: boolean;
}

const PricingsPlan: React.FC<PricingsPlanProps> = ({
  title,
  price,
  desc,
  isAnnual,
}) => {
  const router = useRouter();
  const { profile, getUserProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile when component mounts
  useEffect(() => {
    if (!profile) {
      getUserProfile();
    }
  }, [profile, getUserProfile]);

  useEffect(() => {
    // Test API connectivity
    const testApiConnection = async () => {
      try {
        const response = await fetch(`${apiBase}/api/test`);
        console.log("Response:",response)
        if (!response.ok) {
          throw new Error(`API test failed with status: ${response.status}`);
        }
        const data = await response.json();
        console.log("API test successful:", data);
      } catch (error) {
        console.error("API test failed:", error);
      }
    };

    testApiConnection();
  }, []);

  const formattedPrice = `$${price.toFixed(2)}`;

  const handleCheckout = async () => {
  try {
    setIsLoading(true);
    setError(null);

    const planTitle = title;
    const userEmail = profile?.email || 'guest@example.com';
    const userId = profile?.id || 'guest';

    console.log("Sending checkout request with:", {
      title: planTitle,
      email: userEmail,
      userId: userId
    });

    const response = await fetch(`${apiBase}/api/create-checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: planTitle,
        email: userEmail,
        userId: userId,
      }),
    });

    console.log("Checkout response status:", response.status);

    if (!response.ok) {
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || `Checkout failed with status: ${response.status}`;
      } catch (e) {
        errorMessage = `Checkout failed with status: ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Checkout response data:", data);

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL received');
    }
  } catch (error: any) {
    console.error('Checkout failed:', error);
    setError(error.message || 'Payment processing failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  const descList = Array.isArray(desc)
    ? desc
    : typeof desc === "string"
      ? desc.split(',')
      : [];

  return (
    <div
      className="w-[280px] h-[400px] [@media(min-width:1750px)]:w-[380px]
                 [@media(min-width:1750px)]:h-[480px] rounded-[30px]
                 text-[#003F5C] font-poppins font-semibold text-[32px]
                 [@media(min-width:1750px)]:text-[42px] flex flex-col
                 justify-between p-8 gap-6 hover:scale-105 transition-transform
                 duration-200 bg-white border border-[#00A5CF]/20 shadow-md"
    >
      {/* Title */}
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

      {/* Description */}
      <div>
        <p className="text-[18px] [@media(min-width:1750px)]:text-[22px] font-normal">
          Auto-Renews, Cancel Anytime, Full Content Access
        </p>
        <ul className="list-inside text-left font-lato text-[16px] [@media(min-width:1750px)]:text-[22px] space-y-1">
          {descList.map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-500 text-sm font-normal mb-2">
          {error}
        </div>
      )}

      {/* Button */}
      <div>
        <Button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-[#00A5CF] hover:bg-[#00A5CF] text-white font-lato py-4 font-semibold cursor-pointer"
        >
          {isLoading ? "PROCESSING..." : "START SUBSCRIPTION"}{" "}
          {!isLoading && <ArrowDown size={24} className="inline-block rotate-225" />}
        </Button>
      </div>
    </div>
  );
};

export default PricingsPlan;