import { ArrowDown, Box, BoxIcon, Component, HeartPulse, Settings } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Offers = () => {
        return (
                <div className='mt-36 [@media(min-width:1750px)]:mt-36'>
                        <div className=' mb-20 px-8 md:px-12 lg:px-24 xl:px-64 gap-6 flex flex-col items-center justify-center text-center'>
                                <div>
                                        <p className='mt-20 font-poppins font-semibold text-[40px] text-[#003F5C] md:text-[34px] [@media(min-width:1750px)]:text-[56px] md:text-center leading-[42px] md:leading-[55px] [@media(min-width:1750px)]:leading-[75px] tracking-[1%] text-center '>Building innovative solutions is at the core of everything we do.</p>
                                </div>
                                <div>
                                        <p className='font-lato font-normal text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[28px] leading-[120%] [@media(min-width:1750px)]:leading-[140%] tracking-[0%] md:text-center text-center text-[#003F5C]'>At VtexAI, we are driven by resilience and a passion for innovation, leveraging cutting-edge technology to transform patient care. We challenge conventional thinking, unlocking new possibilities to improve health outcomes worldwide. Our mission is clear: The VtexAI Collective driving groundbreaking innovations for a healthier future.</p>
                                </div>
                        </div>
                        {/* <div className='flex justify-center items-center'>
            <ArrowDown className="w-[32px] h-[32px] text-[#003F5C]" />
        </div> */}
                        <p className='font-poppins mt-2 text-center relative text-[#003F5C] text-[40px] [@media(min-width:1750px)]:text-[56px] font-semibold'>What We Offers</p>

                        {/* Offers Cards */}

                        <div className="mx-8 my-12 flex flex-wrap gap-10 [@media(min-width:2000px)]:gap-26 items-center justify-center text-[#003F5C]">


                                <div className="w-[290px] h-[475px] [@media(min-width:1750px)]:w-[380px] [@media(min-width:1750px)]:h-[600px] rounded-[30px] opacity-75 flex flex-col justify-between p-8 gap-6  hover:scale-105 duration-200 bg-gradient-to-b from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#00A5CF]/5">
                                        {/* Icon Container */}
                                        <div className="rounded-full h-11 w-11 bg-white flex items-center justify-center">
                                                <HeartPulse size={30} color='#00A5CF' />
                                        </div>

                                        {/* Heading */}
                                        <div>
                                                <p className="font-poppins text-[22px] [@media(min-width:1750px)]:text-[32px] font-semibold text-[#00A5CF]"
                                                >
                                                        HealthTech AI Plan
                                                </p>
                                        </div>

                                        {/* Description */}
                                        <div>
                                                <p className="font-lato font-normal leading-[24px] text-[18px] [@media(min-width:1750px)]:text-[24px]">Explore AI-powered healthcare solutions—from diagnostics to precision therapies—enhancing efficiency, accuracy, and personalized care</p>
                                        </div>

                                        {/* Button */}
                                        <div>
                                                <Link href='/'>
                                                        <Button variant='secondary' className='font-lato font-semibold text-[16px] cursor-pointer bg-[#FFFFFF] text-[#003F5C] leading-[100%]'>EXPLORE PLAN <span className='rotate-225'><ArrowDown size={30} /></span></Button>
                                                </Link>
                                        </div>
                                </div>

                                <div className="w-[290px] h-[475px] [@media(min-width:1750px)]:w-[380px] [@media(min-width:1750px)]:h-[600px] rounded-[30px] opacity-75 flex flex-col justify-between p-8 gap-6  hover:scale-105 duration-200 bg-gradient-to-b from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#00A5CF]/5">
                                        {/* Icon Container */}
                                        <div className="rounded-full h-11 w-11 bg-white flex items-center justify-center">
                                                <Settings size={30} color='#1FD2FF' />
                                        </div>

                                        {/* Heading */}
                                        <div>
                                                <p className="font-poppins text-[22px] [@media(min-width:1750px)]:text-[32px] font-semibold text-[#0093B8]"
                                                >
                                                        Emerging Technology Plan
                                                </p>
                                        </div>

                                        {/* Description */}
                                        <div>
                                                <p className="font-lato font-normal leading-[24px] text-[18px] [@media(min-width:1750px)]:text-[24px]">Stay ahead with AI-driven solutions in emerging tech, security, and process optimization. Explore real-world use cases and hands-on applications to drive innovation and excellence</p>
                                        </div>

                                        {/* Button */}
                                        <div>
                                                <Link href='/'>
                                                        <Button variant='secondary' className='font-lato font-semibold text-[16px] cursor-pointer bg-[#FFFFFF] text-[#003F5C] leading-[100%]'>EXPLORE PLAN <span className='rotate-225'><ArrowDown size={30} /></span></Button>
                                                </Link>
                                        </div>
                                </div>

                                <div className="w-[290px] h-[475px] [@media(min-width:1750px)]:w-[380px] [@media(min-width:1750px)]:h-[600px] rounded-[30px] opacity-75 flex flex-col justify-between p-8 gap-6  hover:scale-105 duration-200 bg-gradient-to-b from-[#0093B8]/30 via-[#0093B8]/15 to-[#0093B8]/5">
                                        {/* Icon Container */}
                                        <div className="rounded-full h-11 w-11 bg-white flex items-center justify-center">
                                                <BoxIcon size={30} color='#0093B8' />
                                        </div>

                                        {/* Heading */}
                                        <div>
                                                <p className="font-poppins text-[22px] [@media(min-width:1750px)]:text-[32px] font-semibold text-[#0093B8]"
                                                >
                                                        FlexPicks
                                                </p>
                                        </div>

                                        {/* Description */}
                                        <div>
                                                <p className="font-lato font-normal leading-[24px] text-[18px] [@media(min-width:1750px)]:text-[24px]">Vtex FlexPicks lets you buy individual Emerging Tech and HealthTech AI videos—no subscription needed. Get expert insights on demand!</p>
                                        </div>

                                        {/* Button */}
                                        <div>
                                                <Link href='/flexpick-plan'>
                                                        <Button variant='secondary' className='font-lato font-semibold text-[16px] cursor-pointer bg-[#FFFFFF] text-[#003F5C] leading-[100%]'>EXPLORE PLAN <span className='rotate-225'><ArrowDown size={30} /></span></Button>
                                                </Link>
                                        </div>
                                </div>

                                <div className="w-[290px] h-[475px] [@media(min-width:1750px)]:w-[380px] [@media(min-width:1750px)]:h-[600px] rounded-[30px] opacity-75 flex flex-col justify-between p-8 gap-6  hover:scale-105 duration-200 bg-gradient-to-b from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#00A5CF]/5">
                                        {/* Icon Container */}
                                        <div className="rounded-full h-11 w-11 bg-white flex items-center justify-center">
                                                <Component size={30} color='#70E2FF' />
                                        </div>

                                        {/* Heading */}
                                        <div>
                                                <p className="font-poppins text-[22px] [@media(min-width:1750px)]:text-[32px] font-semibold text-[#0093B8]"
                                                >
                                                        Enterprise Plan
                                                </p>
                                        </div>

                                        {/* Description */}
                                        <div>
                                                <p className="font-lato font-normal leading-[24px] text-[18px] [@media(min-width:1750px)]:text-[24px]">Accelerate workforce growth with a white-labeled platform for AI-driven learning in Emerging Tech and HealthTech.</p>
                                        </div>

                                        {/* Button */}
                                        <div>
                                                <Link href='/'>
                                                        <Button variant='secondary' className='font-lato font-semibold text-[16px] cursor-pointer bg-[#FFFFFF] text-[#003F5C] leading-[100%]'>EXPLORE PLAN <span className='rotate-225'><ArrowDown size={30} /></span></Button>
                                                </Link>
                                        </div>
                                </div>
                        </div>


                </div>
        )
}

export default Offers