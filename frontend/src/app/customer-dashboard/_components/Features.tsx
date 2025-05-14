'use client'
import React, { useState } from 'react';
import { Check, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlanFeature {
  name: string;
  entitledPlan: React.ReactNode;
  payPerCode: React.ReactNode;
}

const PlanFeatures: React.FC = () => {
  const [activePlan, setActivePlan] = useState<string>("entitledPlan");
  
  const features: PlanFeature[] = [
    {
      name: "Code access for completed videos & quizzes",
      entitledPlan: <Check className="h-8 w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
      payPerCode: <Check className="h-8 w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
    },
    {
      name: "Continuous Solution Code",
      entitledPlan: "Start with One Code — Unlock Your Next Code After 35 Days",
      payPerCode: "Access Two Codes Now — Eligible for Next Code in 35 Days"
    },
    {
      name: "Auto-deployment pipeline guide video",
      entitledPlan: <Check className="h-8 w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
      payPerCode: <Check className="h-8 w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
    },
    {
      name: "SaaS product enablement (Beyond video-specific code access)",
      entitledPlan: "-",
      payPerCode: "-"
    },
    {
      name: "Faster access to additional code (even for incomplete video)",
      entitledPlan: "-",
      payPerCode: <Check className="h-8 w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
    },
    {
      name: "Priority support for code-related queries",
      entitledPlan: "Email Support",
      payPerCode: "Email Support"
    },
    {
      name: "Complimentary Access to All Future Code Updates",
      entitledPlan: <Check className="h-8 w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />,
      payPerCode: <Check className="h-8 w-8 text-white p-2 rounded-full bg-[#00A897] mx-auto" />
    }
  ];

  const plans = [
    { id: "entitledPlan", name: "Already Entitled: Your Code is Ready" },
    { id: "payPerCode", name: "Pay-Per-Code" }
  ];

  return (
    <div className='mx-4 mt-12'>
        <div className="max-w-[1360px] my-4 mx-auto font-poppins font-medium text-[18px] border-2 border-dashed bg-[#F8F7F2] border-gray-400 rounded-lg">
        {/* Desktop Version */}
        <div className="hidden lg:block overflow-x-auto ">
            <table className="w-full border-collapse rounded-lg">
            <thead>
                <tr className="bg-[#003F5C] text-white font-lato">
                <th className="p-4 text-left border-b border-gray-200 w-1/3">Features</th>
                <th className="p-4 text-center border-b border-gray-200 w-1/3">Already Entitled: Your Code is Ready</th>
                <th className="p-4 text-center border-b border-gray-200 w-1/3">Pay-Per-Code</th>
                </tr>
            </thead>
            <tbody className=''>
                {features.map((feature, index) => (
                <tr 
                    key={index} 
                    className=''
                >
                    <td className="p-4 border-b border-gray-200 text-[#4C4243] font-medium">{feature.name}</td>
                    <td className="p-4 border-b border-gray-200 text-center text-[#00A897]">{feature.entitledPlan}</td>
                    <td className="p-4 border-b border-gray-200 text-center text-[#00A897]">{feature.payPerCode}</td>
                </tr>
                ))}
            </tbody>
            </table>
            
            <div className="flex justify-end mt-6 mb-10 pr-4">
            <Button className="font-lato py-4 px-6 font-semibold text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%] flex items-center rounded">
                CONTACT US
                <span className="ml-2 rotate-225">
                <ArrowDown size={20}/>
                </span>
            </Button>
            </div>
        </div>

        {/* Mobile Version with plan selector */}
        <div className="lg:hidden ">
            <div className="flex overflow-x-auto mb-4  rounded-lg">
            {plans.map(plan => (
                <button
                key={plan.id}
                className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
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

            <div className=" rounded-lg shadow">
            <div>
                {features.map((feature, index) => (
                <div 
                    key={index}
                    className={`p-4 flex justify-between items-center border-b`}
                >
                    <span className="text-[#4C4243] font-medium">{feature.name}</span>
                    <span className="text-[#00A897]">
                    {feature[activePlan as keyof PlanFeature]}
                    </span>
                </div>
                ))}
            </div>
            </div>
            
            <div className="flex justify-center mt-6 mb-4">
            <Button className="font-lato py-4 px-6 font-semibold text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%] flex items-center rounded">
                CONTACT US
                <span className="ml-2 rotate-225">
                <ArrowDown size={20}/>
                </span>
            </Button>
            </div>
        </div>
        </div>
    </div>
  );
};

export default PlanFeatures;