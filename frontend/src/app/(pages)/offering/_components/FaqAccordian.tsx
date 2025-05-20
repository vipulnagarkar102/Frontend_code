'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>();

  const faqData: FaqItem[] = [
    {
      id: 1,
      question: 'What subscription plans does Vtex.ai offer?',
      answer: 'Vtex.ai offers several subscription plans including Emerging Tech, HealthTech AI, FlexPicks, and Enterprise Plans. Each plan is tailored to specific needs with varying features and pricing options.',
    },
    {
      id: 2,
      question: 'Can I try Vtex.ai before committing to a plan?',
      answer: 'Yes! We offer a free introductory video for visitors. This video allows you to experience the quality and focus of our content, helping you decide which plan best suits your needs.',
    },
    {
      id: 3,
      question: 'How does the subscription work?',
      answer: 'Our subscription provides full access to all premium content. Billing occurs monthly or annually, depending on your chosen plan. You can manage or cancel your subscription anytime through your account settings.',
    },
    {
      id: 4,
      question: 'What if I need to cancel my subscription?',
      answer: 'You can cancel your subscription at any time through your account dashboard. We offer hassle-free cancellation with no hidden fees. Your access will continue until the end of your current billing period.',
    },
    {
      id: 5,
      question: 'Do you offer subscriptions for organizations or teams?',
      answer: 'Yes, we offer special organizational plans with volume discounts and advanced team management features. Please contact our sales team for tailored quotes and enterprise-level solutions.',
    },
    {
      id: 6,
      question: 'Do I need any prior knowledge to benefit from Vtex.ai\'s videos?',
      answer: 'Prior exposure to the healthcare industry and technology is recommended, as it will help you grasp the concepts more effectively. While we provide clear explanations, a foundational understanding will enhance your learning experience.',
    },
    {
      id: 7,
      question: 'How often does Vtex.ai publish new videos?',
      answer: 'We release new content approximately every 2 to 4 weeks, ensuring you stay up to date with the latest information and technologies.',
    },
    {
      id: 8,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and certain regional payment methods. For enterprise plans, we also offer invoice payment options.',
    },
    {
      id: 9,
      question: 'Can I switch between plans?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle, and price differences will be prorated accordingly.',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="p-4 md:p-8 bg-[#E0F7FA] text-[#003F5C] my-20">
      <h2 className="text-center text-3xl [@media(min-width:1750px)]:text-[56px] font-bold mb-8 text-[#003F5C]">Pricing FAQ's</h2>
      
      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.id}
              className={`
                border-b border-gray-200 p-2 last:border-b-0 
                ${isOpen ? 'bg-white pb-4' : 'pb-0'}
              `}
            >
              <div
                onClick={() => handleToggle(index)}
                className="flex justify-between items-center w-full text-left py-4 hover:cursor-pointer"
              >
                <span className="text-[#003F5C] font-normal font-poppins text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[28px]">
                  {item.question}
                </span>
                {isOpen ? (
                  <Minus className="h-5 w-5 text-[#003F5C]" />
                ) : (
                  <Plus className="h-5 w-5 text-[#003F5C]" />
                )}
              </div>

              {/* Answer Panel */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="pb-2 text-[18px] md:text-[20px] [@media(min-width:1750px)]:text-[28px] font-lato font-normal">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqAccordion;