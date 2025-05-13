import Image from "next/image";
import React from "react";
import HeroImage from "@/assets/contactus.png";
import { ThumbsUp, SquareUserRound, CircleHelp, MapPin } from "lucide-react";
import Footer from "@/app/_components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowDown, Check, HeartPulse } from "lucide-react";
import FaqAccordion from "../../(pages)/contact-us/components/FaqAccordian";
import Link from "next/link";

const ContactUs = () => {
  return (
    <div className="text-[#003F5C]">
      {/* Hero Section - Made more responsive */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-9 mt-26 h-fit items-center justify-center px-4 md:px-12 lg:px-16 xl:px-24 2xl:px-28 py-8 md:py-4 bg-[#003F5C]/5">
        {/* left div */}
        <div className="w-full md:w-[55%] mt-4 md:mt-22 pb-8 md:pb-20">
          <p className="font-lato font-extrabold text-[28px] sm:text-[36px] md:text-[50px] [@media(min-width:1750px)]:text-[64px] leading-tight md:leading-[55px] tracking-[1%] mb-3 md:mb-5 [@media(min-width:1750px)]:mb-10">
            Get In Touch
          </p>
          <p className="font-lato font-medium text-[18px] md:text-[22px] [@media(min-width:1750px)]:text-[28px] leading-[22px] md:leading-[32px] tracking-[0%]">
            We're here to help! Whether you have questions about our services,
            need technical support, or want to share feedback, our team is ready
            to assist you. Please reach out to us through the communication
            channels listed below—we'll get back to you as soon as possible.
          </p>
        </div>

        {/* right div */}
        <div className="w-full md:w-[45%] mt-4 md:mt-22 pb-8 md:pb-20">
          <div className="relative w-full h-auto">
            <Image
              src={HeroImage}
              alt="Hero Image"
              className="w-full h-auto object-cover"
              height={436}
              width={693}
              priority
            />
          </div>
        </div>
      </div>

      {/* Our values - FAQ Section */}
      <div className="bg-[#FFFFFF] py-8 md:py-15 px-2 md:px-10">
        <p className="font-poppins font-bold text-[32px] md:text-[40px] [@media(min-width:1750px)]:text-[56px] leading-[100%] tracking-[0%] text-center mb-6 md:mb-0">
          FAQ's
        </p>
        <FaqAccordion />
      </div>

      {/* Connect with us */}
      <div className="bg-[#E0F7FA] py-8 md:py-15 px-4 md:px-20">
        <p className="font-poppins font-bold text-[32px] md:text-[40px] [@media(min-width:1750px)]:text-[56px] leading-[100%] tracking-[0%] text-center mb-6 md:mb-0">
          Connect With Us
        </p>

        <div className="mt-6 md:mt-12 px-2 md:px-12 gap-6 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-between">
          {/* Card 1 */}
          <div className="rounded-[10px] flex flex-col justify-between p-6 md:p-8 gap-4 md:gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] h-[400px] ">
            {/* Icon Container */}
            <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
              <ThumbsUp size={24} color="white" />
            </div>

            {/* Heading */}
            <div>
              <p className="font-poppins text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[28px] font-semibold">
                Emerging Tech Plan
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="font-lato font-medium leading-[24px] text-[16px] md:text-[18px] [@media(min-width:1750px)]:text-[22px] [@media(min-width:1750px)]:leading-[32px]">
                Need a helping hand? Our team is just a click away! We're here
                to make your experience smooth and enjoyable.
              </p>
              <Link href="form/support-form">
              <Button className="mt-4 md:mt-5 font-lato py-3 md:py-4 px-3 md:px-4 font-semibold text-[11px] md:text-[12px] [@media(min-width:1750px)]:text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%] w-full sm:w-auto flex items-center justify-center">
                CONTACT FOR SUPPORT
                <span className="rotate-225 ml-2">
                  <ArrowDown size={20} />
                </span>
              </Button>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-[10px] flex flex-col justify-between p-6 md:p-8 gap-4 md:gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] h-[400px] ">
            {/* Icon Container */}
            <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
              <SquareUserRound size={24} color="white" />
            </div>

            {/* Heading */}
            <div>
              <p className="font-poppins text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[28px] font-semibold">
                HealthTech AI Plan
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="font-lato font-medium leading-[24px] text-[16px] md:text-[18px] [@media(min-width:1750px)]:text-[22px] [@media(min-width:1750px)]:leading-[32px]">
                Need a helping hand? Our team is just a click away! We're here
                to make your experience smooth and enjoyable.
              </p>
              <Link href="form/support-form">
              <Button className="mt-4 md:mt-5 font-lato py-3 md:py-4 px-3 md:px-4 font-semibold text-[11px] md:text-[12px] [@media(min-width:1750px)]:text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%] w-full sm:w-auto flex items-center justify-center">
                CONTACT FOR SUPPORT
                <span className="rotate-225 ml-2">
                  <ArrowDown size={20} />
                </span>
              </Button>
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-[10px] flex flex-col justify-between p-6 md:p-8 gap-4 md:gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] h-[400px] ">
            {/* Icon Container */}
            <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
              <SquareUserRound size={24} color="white" />
            </div>

            {/* Heading */}
            <div>
              <p className="font-poppins text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[28px] font-semibold">
                FlexPick<br className="hidden md:block"></br> Plan
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="font-lato font-medium leading-[24px] text-[16px] md:text-[18px] [@media(min-width:1750px)]:text-[22px] [@media(min-width:1750px)]:leading-[32px]">
                Need a helping hand? Our team is just a click away! We're here
                to make your experience smooth and enjoyable.
              </p>
              <Link href="form/support-form">
              <Button className="mt-4 md:mt-5 font-lato py-3 md:py-4 px-3 md:px-4 font-semibold text-[11px] md:text-[12px] [@media(min-width:1750px)]:text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%] w-full sm:w-auto flex items-center justify-center">
                CONTACT FOR SUPPORT
                <span className="rotate-225 ml-2">
                  <ArrowDown size={20} />
                </span>
              </Button>
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-[10px] flex flex-col justify-between p-6 md:p-8 gap-4 md:gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] h-[400px] ">
            {/* Icon Container */}
            <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
              <SquareUserRound size={24} color="white" />
            </div>

            {/* Heading */}
            <div>
              <p className="font-poppins text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[28px] font-semibold">
                General Support<br className="hidden md:block"></br>&
                Partnership
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="font-lato font-medium leading-[24px] text-[16px] md:text-[18px] [@media(min-width:1750px)]:text-[22px] [@media(min-width:1750px)]:leading-[32px]">
                Need a helping hand? Our team is just a click away! We're here
                to make your experience smooth and enjoyable.
              </p>
              <Link href="form/support-form">
                <Button className="mt-4 md:mt-5 font-lato py-3 md:py-4 px-3 md:px-4 font-semibold text-[11px] md:text-[12px] [@media(min-width:1750px)]:text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%] w-full sm:w-auto flex items-center justify-center">
                  CONTACT FOR SUPPORT
                  <span className="rotate-225 ml-2">
                    <ArrowDown size={20} />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Our Address */}
      <div className="bg-[#ffffff] py-8 md:py-15 px-4 md:px-20">
        <p className="font-poppins font-bold text-[32px] md:text-[40px] [@media(min-width:1750px)]:text-[56px] leading-[100%] tracking-[0%] text-center mb-6 md:mb-0">
          Our Address
        </p>

        <div className="border rounded-[20px] md:rounded-[30px] mt-6 md:mt-12 px-4 md:px-12 gap-4 md:gap-10 grid grid-cols-1 items-center justify-between">
          <div className="rounded-[10px] flex flex-col justify-between py-6 md:p-8 gap-4 md:gap-6 bg-[#FFFFFF] items-center">
            {/* Icon Container */}
            <div className="rounded-full mb-0 h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
              <MapPin size={24} color="white" />
            </div>
            <div>
              <p className="text-center font-lato font-medium leading-[26px] md:leading-[30px] text-[16px] md:text-[18px] [@media(min-width:1750px)]:text-[24px]">
                Pristine Square, 4th Floor, 401A Unit,
                <br />
                Shankar Kalate Nagar Road,
                <br />
                Wakad, Pune 411057
                <br />
                Ph - 9607500086
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
