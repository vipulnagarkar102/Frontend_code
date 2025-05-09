'use client';
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';
import UpsellImage from '@/assets/upsell4.png'
import UpsellImage5 from '@/assets/upsell5.png'
import { Button } from '@/components/ui/button'
import { ArrowDown, CheckCircle, Lightbulb, Globe, Laptop, Monitor, Package, Settings, UsersRound, ThumbsUp, } from 'lucide-react'
import FeatureCard from '../../customer-dashboard/_components/FeatureCard'
import Footer from '@/app/_components/Footer'

const Partners = () => {

  const features = [
    {
      icon: <ThumbsUp size={24} color="white" />,
      title: "Thrive from the Start",
      description: "Empower your growth journey—achieve reliable results, increase revenue, and expand into new markets with impactful, on-demand AI and tech insights."
    },
    {
      icon: <UsersRound size={24} color="white" />,
      title: "Partner with the Experts",
      description: "Step into a trusted partnership—enhance your sales and marketing efforts with our support, and equip your team with expert, hands-on training in AI and tech."
    },
    {
      icon: <Lightbulb size={24} color="white" />,
      title: "Drive Innovation Effortlessly",
      description: "Our cutting-edge hands-on practical demos give you a competitive advantage. Leverage them to deliver unique services and custom integrations that drive market growth."
    },
  ];

  const features2 = [
    {
      icon: <Monitor size={24} color="white" />,
      title: "Healthcare Partnership",
      description: "Ongoing guidance on AI adoption, architecture, and scaling"
    },
    {
      icon: <Laptop size={24} color="white" />,
      title: "Sales Partnership ",
      description: "Continuous assistance in deploying and optimizing AI solutions"
    },
    {
      icon: <Globe size={24} color="white" />,
      title: "Technology Partnership ",
      description: "Long-term collaboration for innovation, governance, and growth"
    },
    {
      icon: <Settings size={24} color="white" />,
      title: "Corporate Training and eLearning Partnership ",
      description: "Expert assessments to enhance efficiency, security, and performance"
    }
  ];

  const partnerships = [
    {
      title: "Healthcare Partnership",
      points: [
        "Educational or Research Content Provider",
        "HealthTech Solutioning Using AI Technology",
        "Product Co-Development and Pilots",
      ],
    },
    {
      title: "Sales Partnership",
      points: [
        "Keynote and Speaker Collaborations",
        "Client Proposals and Workshop Partnerships",
        "AI Hackathons and Competitions",
      ],
    },
    {
      title: "Technology Partnership",
      points: [
        "LMS (Learning Management System Integrations)",
        "White labeling solutioning and licensing",
        "Enterprise Software Integration",
      ],
    },
    {
      title: "Corporate Training and eLearning Partnership",
      points: [
        "Instructor-Led Sessions",
        "Team-Based Workshops",
        "Corporate or Industry Event-Driven Training",
      ],
    },
  ];


  const router = useRouter();

  const handleClick = () => {
    router.push('/contact-us'); // <-- opens another page
  };


  return (
    <div className='font-lato text-[#003F5C] '>
      <div className='bg-[#003F5C]/5 flex flex-col md:flex-row gap-10 mt-26 h-fit items-center justify-center px-4 md:px-12 lg:px-16 2xl:px-28 p-4'>

        {/* left div */}


        <div className='md:w-[55%] '>
          <p className='font-lato font-extrabold  pl-8 text-[36px] md:text-[50px] leading-[55px] [@media(min-width:1750px)]:text-[64px] tracking-[1%]'>Partners Program</p>
        </div>

        {/* right div */}
        <div className='md:w-[45%] my-10 '>
          <Image
            src={UpsellImage}
            alt='Hero Image'
            // layout='fill' // Use layout='fill' to make the image cover the entire div
            objectFit='cover' // Important for responsiveness
            height={436}
            width={693}
          />
        </div>

      </div>

      <div className='mt-10 m-4 text-center px-4 md:px-32'>
        <p className='font-extrabold text-[36px] md:text-[50px] [@media(min-width:1750px)]:text-[56px] mb-4'>Achieve More, Together</p>
      </div>
      {/* Feature Cards */}
      <div className="md:mt-10 mt-16 mb-16 mx-auto px-10 place-items-center grid grid-cols-1 md:grid-cols-2 [@media(min-width:1200px)]:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon} 
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      <div className='bg-[#E0F7FA]  max-w-screen p-4 pb-20'>
        <div className='flex flex-col md:flex-row-reverse gap-10 mt-20 h-fit items-center justify-center px-6 p-4'>

          {/* left div */}


          <div className='md:w-[60%] flex flex-col gap-10'>
            <p className='font-poppins font-semibold text-[36px] md:text-[50px] leading-[55px] [@media(min-width:1750px)]:text-[56px] tracking-[1%]'>Ways to partner</p>
            <p className='text-[18px] md:text-[20px] [@media(min-width:1750px)]:text-[26px] font-normal'>
              Vtex.ai partners across healthcare, sales, technology, and corporate training to drive AI innovation. From enhancing patient care and sales performance to co-developing AI solutions and transforming learning, we empower organizations with intelligent, scalable AI-driven solutions. Partner with Vtex.ai to shape the future of AI.
            </p>
            <div>
              {/* <Button className="font-lato py-4 px-6 font-semibold text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%] flex items-center rounded">
                REQUEST FOR CONSULTATION
                <span className="ml-2 rotate-225">
                  <ArrowDown size={20} />
                </span>
              </Button> */}
            </div>
          </div>

          {/* right div */}
          <div className='md:w-[35%]'>
            <Image
              src={UpsellImage5}
              alt='Hero Image'
              // layout='fill' // Use layout='fill' to make the image cover the entire div
              objectFit='cover' // Important for responsiveness
              height={400}
              width={591}
              className='rounded-4xl'
            />
          </div>

        </div>

        {/* Feature Cards */}
        <div className=" py-12 px-4 md:px-15 lg:px-10 bg-[#E0F7FA]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#E0F7FA]">
            {partnerships.map((partnership, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl ">
                <h3 className="text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[30px] font-semibold mb-4 font-poppins ">{partnership.title}</h3>
                <ul className=" font-lato space-y-4 text-[16px] md:text-[18px] [@media(min-width:1750px)]:text-[24px] font-normal">
                  {partnership.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700 ">
                      <CheckCircle className=" text-white fill-[#00A897]" size={20} /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className= 'text-center mt-10'>
            <Button onClick={handleClick} className=' font-lato py-4 font-semibold text-[16px] [@media(min-width:1750px)]:text-[24px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%] '>CONTACT US<span className='rotate-225'><ArrowDown size={30} /></span></Button>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default Partners