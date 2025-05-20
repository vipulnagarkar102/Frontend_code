import Image from 'next/image'
import React from 'react'
import HeroImage from '@/assets/Hero.png'
import Offers from './Home/Offers'
import WatchFree from './Home/WatchFree'
import AiSolution from './Home/AiSolution'
import image from '@/assets/home.png'
import Testimonials from './Home/Testimonials'

import Footer from './Footer'
import Certifications from './Home/Certifications'

const Home = () => {
  return (
    <div>
      <div className='relative top-[104px] [@media(min-width:1750px)]:top-[120px] inset-0 z-0 overflow-hidden h-[240px] md:h-[540px] [@media(min-width:1750px)]:h-[680px] [@media(min-width:2000px)]:h-[720px]'>
        <Image
          src={HeroImage}
          alt='Hero Image'
         layout='fill' // Use layout='fill' to make the image cover the entire div
        // Important for responsiveness//
        />

        <div className="absolute inset-0 flex items-center">
          <div className="w-1/2 flex justify-start items-center pl-4 md:pl-8 lg:pl-12">
            <div className="text-[#FFFFFF] font-lato font-bold text-[22px] leading-[30px] md:leading-[70px] md:text-[36px] lg:text-[48px] [@media(min-width:1750px)]:text-[60px] [@media(min-width:2000px)]:text-[68px] tracking-[2%]">
            Next-Gen AI Solutions for Healthcare
            </div>
          </div>
        </div>
      </div>

      {/* What We Offers */}
      <Offers />

      {/* Watch Free Videos */}
      <WatchFree />

      {/* Ai Solution */}
      <AiSolution />

      <div className='bg-[#E0F7FA] max-w-screen mx-auto gap-8 mt-16 my-4 flex flex-col lg:flex-row justify-between md:items-center px-4 md:px-8 py-6'>
        <div className='flex flex-col gap-4 p-4 text-[#003F5C] lg:w-1/2'>
          <p className='font-poppins font-semibold text-[24px] md:text-[40px] [@media(min-width:1750px)]:text-[56px]'>Supported Platforms, Tools and Technologies</p>
          <p className='font-lato font-normal text-[18px] md:text-[20px] [@media(min-width:1750px)]:text-[26px]'>At Vtex.ai, our solutions are designed for seamless integration and operational efficiency, leveraging the latest technologies in AI, software development, and API-driven architectures. Each solution is built for real-world application, ensuring users can easily deploy, customize, and scale their implementations with modern development frameworks and tools.</p>
        </div>
        <div>
          <Image className='md:h-[350px] [@media(min-width:1750px)]:h-[420px] [@media(min-width:1750px)]:w-[700px]' src={image} alt='Tools pictures' />
        </div>
      </div>
      {/* Testimonials */}
     <Certifications/>
      {/* Testimonials */}
      <Testimonials />



      <Footer />
    </div>

  )
}

export default Home