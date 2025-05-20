import {
  ArrowDown,
  BoxIcon,
  Component,
  HeartPulse,
  Settings,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Offers = () => {
  return (
    <div className="mt-36 [@media(min-width:1750px)]:mt-36">
      {/* Top Section */}
      <div className="mb-20 px-8 md:px-12 lg:px-24 xl:px-64 gap-6 flex flex-col items-center justify-center text-center">
        <p className="mt-20 font-poppins font-semibold text-[40px] text-[#003F5C] md:text-[34px] [@media(min-width:1750px)]:text-[56px] leading-[42px] md:leading-[55px] [@media(min-width:1750px)]:leading-[75px] tracking-[1%] text-center">
          Building innovative solutions is at the core of everything we do.
        </p>
        <p className="font-lato font-normal text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[28px] leading-[120%] [@media(min-width:1750px)]:leading-[140%] tracking-[0%] text-[#003F5C] text-center">
          At Vtex.ai, we are driven by resilience and a passion for innovation,
          leveraging cutting-edge technology to transform patient care. We
          challenge conventional thinking, unlocking new possibilities to
          improve health outcomes worldwide. Our mission is clear: The Vtex.ai
          Collective driving groundbreaking innovations for a healthier future.
        </p>
      </div>

      {/* Section Heading */}
      <p className="font-poppins mt-2 text-center text-[#003F5C] text-[40px] [@media(min-width:1750px)]:text-[56px] font-semibold">
        What We Offers
      </p>

      {/* Cards Section */}
      <div className="mx-8 my-12 flex flex-wrap gap-10 [@media(min-width:2000px)]:gap-26 items-stretch justify-center text-[#003F5C]">
        {[
          {
            icon: <HeartPulse size={30} color="#00A5CF" />,
            title: "HealthTech AI Plan",
            description:
              "Explore AI-powered healthcare solutions—from diagnostics to precision therapies—enhancing efficiency, accuracy, and personalized care.",
            link: "/",
            color: "#00A5CF",
          },
          {
            icon: <Settings size={30} color="#1FD2FF" />,
            title: "Emerging Technology Plan",
            description:
              "Stay ahead with AI-driven solutions in emerging tech, security, and process optimization. Explore real-world use cases and hands-on applications to drive innovation and excellence.",
            link: "/",
            color: "#00A5CF",
          },
          {
            icon: <BoxIcon size={30} color="#0093B8" />,
            title: "FlexPick Marketplace",
            description:
              "Vtex FlexPicks lets you buy individual Emerging Tech and HealthTech AI videos—no subscription needed. Get expert insights on demand!",
            link: "/flexpick-plan",
            color: "#0093B8",
          },
          {
            icon: <Component size={30} color="#70E2FF" />,
            title: "Enterprise Plan",
            description:
              "Accelerate workforce growth with a white-labeled platform for AI-driven learning in Emerging Tech and HealthTech.",
            link: "/",
            color: "#0093B8",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="w-[290px] h-[475px] [@media(min-width:1750px)]:w-[380px] [@media(min-width:1750px)]:h-[600px] rounded-[30px] flex flex-col p-8 gap-6 hover:scale-105 duration-200 bg-gradient-to-b from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#00A5CF]/5"
          >
            {/* Icon */}
            <div className="rounded-full h-11 w-11 bg-white flex items-center justify-center">
              {item.icon}
            </div>

            {/* Heading - 2 lines max */}
            <div className="min-h-[56px] [@media(min-width:1750px)]:min-h-[72px]">
              <p
                className="font-poppins text-[22px] [@media(min-width:1750px)]:text-[32px] font-semibold"
                style={{ color: item.color }}
              >
                <span className="line-clamp-2">{item.title}</span>
              </p>
            </div>

            {/* Description */}
            <div className="flex-grow">
              <p className="font-lato font-normal leading-[24px] text-[18px] [@media(min-width:1750px)]:text-[24px] text-[#003F5C]">
                {item.description}
              </p>
            </div>

            {/* Button */}
            <div>
              <Link href={item.link}>
                <Button
                  variant="secondary"
                  className="w-full font-lato font-semibold text-[16px] bg-white text-[#003F5C]"
                >
                  EXPLORE PLAN{" "}
                  <span className="ml-2 rotate-225">
                    <ArrowDown size={24} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
