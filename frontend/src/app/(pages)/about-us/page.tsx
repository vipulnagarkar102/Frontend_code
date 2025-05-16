import Image from 'next/image'
import React from 'react'
import HeroImage from '@/assets/AboutUS.png'
import storyImg from '@/assets/about-us.png'
import { PlugIcon, ThumbsUp } from 'lucide-react'
import { GiOpenBook } from 'react-icons/gi'
import { BsPeople } from 'react-icons/bs'
import Footer from '@/app/_components/Footer'

const AboutUs = () => {
  return (
    <div className='text-[#003F5C]'>
      <div className='flex flex-col md:flex-row gap-10 mt-36 md:mt-50 h-fit items-center justify-center px-4 md:px-12 lg:px-16 xl:px-24 2xl:px-28 p-4'>
        
        {/* left div */}
        <div className='md:w-[60%]'>
          <p className='font-lato font-extrabold text-[36px] md:text-[50px] [@media(min-width:1750px)]:text-[64px] leading-[42px] md:leading-[55px] [@media(min-width:1750px)]:leading-[75px] tracking-[1%] text-center md:text-left'>Bringing you the future of healthcare with emerging technologies and <span className='text-[#FFB74D]'>AI-driven solutions</span></p>
        </div>

        {/* right div */}
        <div className='md:w-[40%]'>
          <Image
          src={HeroImage}
          alt='Hero Image'
          // layout='fill' // Use layout='fill' to make the image cover the entire div
          objectFit='cover' // Important for responsiveness
          height={436}
          width={693}
          />
        </div>
      </div>

      {/* <div className='mt-24 mb-4 px-8 md:px-12 lg:px-24 xl:px-64 gap-6 flex flex-col items-center justify-center text-center'>
        <div>
          <p className='font-poppins font-bold text-[32px] md:text-[50px] [@media(min-width:1750px)]:text-[64px] md:text-center leading-[42px] md:leading-[55px] [@media(min-width:1750px)]:leading-[75px] tracking-[1%] text-center '>Building innovative solutions is at the core of everything we do.</p>
        </div>
        <div>
          <p className='font-lato font-normal text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[28px] leading-[120%] [@media(min-width:1750px)]:leading-[140%] tracking-[0%] md:text-center text-center'>At VtexAI, we are driven by resilience and a passion for innovation, leveraging cutting-edge technology to transform patient care. We challenge conventional thinking, unlocking new possibilities to improve health outcomes worldwide. Our mission is clear: The VtexAI Collective—driving groundbreaking innovations for a healthier future.</p>
        </div>
      </div> */}

      {/* Our values */}

      <div className='mt-20 bg-[#E0F7FA] py-10'>
        <p className='font-poppins font-bold text-[32px] md:text-[50px] [@media(min-width:1750px)]:text-[64px] leading-[100%] tracking-[0%] px-12 text-center md:text-center'>Our Core Values</p>

          <div className='mt-12 px-12 gap-10 grid grid-cols-1 lg:grid-cols-2 items-center justify-between'>
            <div className='rounded-[30px] flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] min-h-[260px]'>
              {/* Icon Container */}
              <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
                <PlugIcon size={30} color='white'/>
              </div>

              {/* Heading */}
              <div>
                <p className="font-poppins text-[22px] [@media(min-width:1750px)]:text-[28px] font-semibold"
                  >
                    Innovative Solutions Through Technology
                  </p>
              </div>
              
              {/* Description */}
              <div>
                  <p className="font-lato font-medium leading-[24px] text-[18px] [@media(min-width:1750px)]:text-[22px] [@media(min-width:1750px)]:leading-[32px]">Committed to pushing boundaries, we deliver cutting-edge content that bridges the gap between advanced technologies and real-world applications, inspiring learners to lead with innovation.</p>
                </div>

            </div>

            <div className='rounded-[30px] flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] min-h-[260px]'>
            {/* Icon Container */}
            <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
              <ThumbsUp size={30} color='white'/>
            </div>

            {/* Heading */}
            <div>
               <p className="font-poppins text-[22px] font-semibold [@media(min-width:1750px)]:text-[28px]"
                >
                  Commitment to Excellence
                </p>
            </div>
            
             {/* Description */}
             <div>
                <p className="font-lato font-medium leading-[24px] text-[18px] [@media(min-width:1750px)]:text-[22px] [@media(min-width:1750px)]:leading-[32px]">Dedicated to offering premium, high-quality educational content that is tailored to the evolving needs of industries like healthcare and enterprise technology</p>
              </div>

            </div>

            <div className='rounded-[30px] flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] min-h-[260px]'>
              {/* Icon Container */}
              <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
                <GiOpenBook size={30} color='white'/>
              </div>

              {/* Heading */}
              <div>
                <p className="font-poppins text-[22px] font-semibold [@media(min-width:1750px)]:text-[28px]"
                  >
                    Adaptability and Continuous Learning
                  </p>
              </div>
              
              {/* Description */}
              <div>
                  <p className="font-lato font-medium leading-[24px] text-[18px] [@media(min-width:1750px)]:text-[22px] [@media(min-width:1750px)]:leading-[32px]">Embracing the ever-changing landscape of technology and education, we champion lifelong learning to help professionals stay ahead in their fields.</p>
                </div>

            </div>

            <div className='rounded-[30px] flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] min-h-[260px]'>
              {/* Icon Container */}
              <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
                <BsPeople size={30} color='white'/>
              </div>

              {/* Heading */}
              <div>
                <p className="font-poppins text-[22px] font-semibold [@media(min-width:1750px)]:text-[28px]"
                  >
                    Customer-Centricity and Collaboration
                  </p>
              </div>
              
              {/* Description */}
              <div>
                  <p className="font-lato font-medium leading-[24px] text-[18px] [@media(min-width:1750px)]:text-[22px] [@media(min-width:1750px)]:leading-[32px]">Prioritizing the needs of learners and enterprises, we cultivate partnerships and provide solutions that deliver measurable value and impact.</p>
                </div>

            </div>
        

        </div>




      </div>

      {/* Our Story */}

      <div className='flex flex-col md:flex-row gap-8 mt-16 mb-20 px-10 md:ml-10 items-center justify-center'>

        <div className='md:w-[40%]'>
          <Image
          src={storyImg}
          alt='Hero Image'
          // layout='fill' // Use layout='fill' to make the image cover the entire div
          objectFit='cover' // Important for responsiveness
          height={300}
          width={403}
          />
        </div>
        
        <div className='md:w-[60%]'>
          <p className='font-poppins text-[40px] [@media(min-width:1750px)]:text-[56px] [@media(min-width:1750px)]:leading-[75px] font-semibold leading-[55px] mb-6 md:text-left text-center'>Our Story</p>
          <p className='font-lato font-normal leading-[120%] [@media(min-width:1750px)]:text-[28px] [@media(min-width:1750px)]:leading-[140%] text-[20px] md:text-[22px] md:text-left text-center'>With 20+ years of digital transformation expertise, we’ve been the driving force behind Fortune 500 companies’ innovation. Born in EdTech, we harness cutting-edge technology to create powerful learning experiences that inspire and elevate.Recognized since 2017 as a top leader in transformative education, we blend deep industry insights with bold creativity—empowering learners not just to embrace the future, but to shape it.</p>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default AboutUs