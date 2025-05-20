"use client";
import Image from "next/image";
import React, { useState } from "react";
import HeroImage from "@/assets/Request for new feature image.png";

export default function SupportForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    solution: "",
    instructions: "",
    captcha: "",
    githubId: "",
    method: "github",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here directly
    console.log("Form submitted:", formData);
    // Add your submission logic here
  };

  return (
    <div className="flex flex-col md:flex-row w-full mt-26">
      {/* Left Side - Image (Desktop only) */}
      <div className="hidden md:block md:w-2/5">
        <Image
          src={HeroImage}
          alt="Pay Per Code Image"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Mobile Hero Image */}
      <div className="md:hidden w-full h-48 relative mb-4">
        <Image
          src={HeroImage}
          alt="Pay Per Code Image"
          className="w-full h-full object-cover"
          layout="fill"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-4 md:p-6 bg-white">
        <div className="bg-white p-4 md:p-8 rounded-lg w-full">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-5">
            Support Request
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >

             {/* Preferred method */}
            <div className="col-span-full">
              <label className="font-bold text-sm md:text-base block mb-1">
                Are You Acrive User?
              </label>
              <div className="flex flex-wrap gap-4 md:gap-6 mt-1">
                {/* GitHub Radio */}
                <label className="flex items-center gap-2 font-normal text-sm md:text-base cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="github"
                    checked={formData.method === "github"}
                    onChange={handleChange}
                  />
                  Yes
                </label>

                {/* Email Radio */}
                <label className="flex items-center gap-2 font-normal text-sm md:text-base cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="email"
                    checked={formData.method === "email"}
                    onChange={handleChange}
                  />
                No
                </label>
              </div>
            </div>

            {/* Name */}
            <div className="col-span-1">
              <label className="font-bold text-sm md:text-base block mb-1">
                Name*
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="border p-2 rounded w-full font-normal text-sm md:text-base"
              />
            </div>

            {/* Email */}
            <div className="col-span-1">
              <label className="font-bold text-sm md:text-base block mb-1">
                Email*
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="border p-2 rounded w-full font-normal text-sm md:text-base"
              />
            </div>

            {/* phone */}
            <div className="col-span-1">
              <label className="font-bold text-sm md:text-base block mb-1">
                Phone*
              </label>
              <input
                name="name"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
                className="border p-2 rounded w-full font-normal text-sm md:text-base"
              />
            </div>


            {/* Instructions */}
            <div className="col-span-full">
              <label className="font-bold text-sm md:text-base block mb-1">
               Request for New Feature
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Additional instructions (optional)"
                className="border p-2 rounded w-full font-normal text-sm md:text-base min-h-24"
                rows={3}
              />
            </div>

           

            {/* Captcha */}
            <div className="col-span-1">
              <label className="font-bold text-sm md:text-base block mb-1">
                Enter Captcha*
              </label>
              <input
                name="captcha"
                value={formData.captcha}
                onChange={handleChange}
                required
                placeholder="Enter shown captcha"
                className="mb-2 border p-2 rounded w-full font-normal text-sm md:text-base"
              />
              <div className="bg-gray-200 text-center px-1 py-1 rounded-md font-normal text-sm md:text-base">
                AB12CD
              </div>
            </div>

            {/* Submit */}
            <div className="col-span-full md:col-span-2 text-center md:text-right mt-2">
              <button
                type="submit"
                className="border p-2 px-6 rounded bg-[#00A5CF] text-white transition duration-200 font-normal text-sm md:text-base w-full md:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
