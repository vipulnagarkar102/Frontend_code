'use client'
import React, { useState } from 'react';
import { Check, CheckCircle } from 'lucide-react';

interface PlanFeature {
  name: string;
  emergingTech: React.ReactNode;
  healthTechAI: React.ReactNode;
  flexPicks: React.ReactNode;
  enterprisePlan: React.ReactNode;
}

const PlanFeatures: React.FC = () => {
  const [activePlan, setActivePlan] = useState<string>("emergingTech");
  
  const features: PlanFeature[] = [
    {
      name: "Extensive Video Library",
      emergingTech: "Technology focused",
      healthTechAI: "Healthcare focused",
      flexPicks: "Pick & Learn",
      enterprisePlan: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
    },
    {
      name: "Hands-On Demos",
      emergingTech: "Technology focused",
      healthTechAI: "Healthcare focused",
      flexPicks: "Pick & Learn",
      enterprisePlan: "Unlimited"
    },
    {
        name: "Hassle-Free Cancellation",
        emergingTech: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        healthTechAI: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        flexPicks: "-",
        enterprisePlan: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
      },
      {
        name: "Dedicated Customer Support",
        emergingTech: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        healthTechAI: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        flexPicks: "-",
        enterprisePlan: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
      },
      {
        name: "Anywhere, Anytime Access",
        emergingTech: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        healthTechAI: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        flexPicks: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        enterprisePlan: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
      },
      {
        name: "Access to New Content and updates",
        emergingTech: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        healthTechAI: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        flexPicks: "-",
        enterprisePlan: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
      },
      {
        name: "Trend & Latest Tech Focus",
        emergingTech: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        healthTechAI: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        flexPicks: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        enterprisePlan: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
      },
      {
        name: "Real-World Contextual Learning",
        emergingTech: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        healthTechAI: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        flexPicks: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        enterprisePlan: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
      },
      {
        name: "Pay per code",
        emergingTech: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        healthTechAI: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        flexPicks: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        enterprisePlan: "Unlimited"
      },
      {
        name: "Real-Life Scenario Simulations",
        emergingTech: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        healthTechAI: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        flexPicks: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        enterprisePlan: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
      },
      {
        name: "Recurring Billing",
        emergingTech: "Monthly or Annual Auto Renewal",
        healthTechAI: "Monthly or Annual Auto Renewal",
        flexPicks: "One time purchase",
        enterprisePlan: "-"
      },
      {
        name: "Refund",
        emergingTech: "-",
        healthTechAI: "-",
        flexPicks: "-",
        enterprisePlan: "-"
      },
      {
        name: "Discounts, Deals and Promotions",
        emergingTech: <span className="text-teal-500">Eligible</span>,
        healthTechAI: <span className="text-teal-500">Eligible</span>,
        flexPicks: <span className="text-teal-500">Eligible</span>,
        enterprisePlan: "-"
      },
      {
        name: "Auto Renewal",
        emergingTech: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        healthTechAI: <Check className="h-8  w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
        flexPicks: "Not applicable",
        enterprisePlan: "-"
      }
  ];

  const plans = [
    { id: "emergingTech", name: "Emerging Tech" },
    { id: "healthTechAI", name: "HealthTech AI" },
    { id: "flexPicks", name: "FlexPicks" },
    { id: "enterprisePlan", name: "Enterprise Plan" }
  ];

  return (
    <div className="max-w-[1360px] [@media(min-width:1750px)]:max-w-[1700px] my-4 mx-auto font-poppins font-medium text-[14px] sm:text-[18px] [@media(min-width:1750px)]:text-[24px] border-2 border-dashed border-gray-400 rounded-lg">
      {/* Desktop Version */}
      <div className="hidden lg:block overflow-x-auto">
        {/* Full table from the previous component */}
        <table className="w-full border-collapse rounded-lg">
          <thead>
            <tr className="bg-[#003F5C] text-white font-lato">
              <th className="p-4 text-left border-b border-gray-200 w-1/5">Features</th>
              <th className="p-4 text-center border-b border-gray-200 w-1/5">Emerging Tech</th>
              <th className="p-4 text-center border-b border-gray-200 w-1/5">HealthTech AI</th>
              <th className="p-4 text-center border-b border-gray-200 w-1/5">FlexPicks</th>
              <th className="p-4 text-center border-b border-gray-200 w-1/5">Enterprise Plan</th>
            </tr>
          </thead>
          <tbody className=''>
            {features.map((feature, index) => (
              <tr 
                key={index} 
                    className='bg-[#F8F7F2]'
              >
                <td className="p-4 border-b border-gray-200 text-[#4C4243] font-medium">{feature.name}</td>
                <td className="p-4 border-b border-gray-200 text-center text-[#00A897]">{feature.emergingTech}</td>
                <td className="p-4 border-b border-gray-200 text-center text-[#00A897]">{feature.healthTechAI}</td>
                <td className="p-4 border-b border-gray-200 text-center text-[#00A897]">{feature.flexPicks}</td>
                <td className="p-4 border-b border-gray-200 text-center text-[#00A897]">{feature.enterprisePlan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Version with plan selector */}
      <div className="lg:hidden">
        <div className="flex overflow-x-auto mb-4 bg-[#F8F7F2] rounded-lg">
          {plans.map(plan => (
            <button
              key={plan.id}
              className={`flex-1 py-3 px-2 sm:px-4 text-sm font-medium text-center ${
                activePlan === plan.id 
                  ? "bg-[#003F5C] text-white" 
                  : "bg-gray-100 text-[#4C4243] hover:bg-gray-200"
              }`}
              onClick={() => setActivePlan(plan.id)}
            >
              {plan.name}
            </button>
          ))}
        </div>

        <div className="bg-[#F8F7F2] rounded-lg shadow">
          {/* <div className="p-4 bg-[#003F5C] text-white font-medium">
            {plans.find(p => p.id === activePlan)?.name}
          </div> */}
          
          <div>
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-4 flex justify-between items-center border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <span className="text-[#4C4243] font-medium">{feature.name}</span>
                <span className="text-[#00A897]">
                  {feature[activePlan as keyof PlanFeature]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanFeatures;