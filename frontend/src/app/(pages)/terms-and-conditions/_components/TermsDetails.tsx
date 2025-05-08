"use client";

import React from 'react';
import termsJsonData from '@/app/data/terms.json'

interface Term {
  id: string;
  title: string;
  introductoryLines: string[];
  sections: {
    sectionTitle: string;
    content: string[];
  }[];
  icon: string;
}

const termsData: Term[] = termsJsonData as Term[];

export const TermsDetails = ({ termId }: { termId: string }) => {
  // Find the term in the JSON data
  const term = termsData.find((t: Term) => t.id === termId);

  if (!term) {
    return (
      <div className="mt-30 flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Term Not Found</h1>
        <p className="mt-4">The term you're looking for doesn't exist or may have been removed.</p>
      </div>
    );
  }

  return (
    <div className="mt-30 max-w-8xl px-3 md:px-6 py-10 font-lato text-[#003F5C]">
      <div className="flex flex-col gap-4">

        <h1 className="text-4xl md:text-5xl [@media(min-width:1750px)]:text-[56px] text-center font-poppins font-semibold mb-6">
          {term.title}
        </h1>

        {term.id === "terms-of-use-preamble" && (
          <div>
            <p className="text-[15px] md:text-[18px] [@media(min-width:1750px)]:text-[22px] font-lato font-normal leading-relaxed">
            This entire legal document shall be known as "Terms of Use" and shall comprise of eight legal sub-documents, namely, (1) <a href="/terms-and-conditions/terms-of-use-preamble"><span className="text-[#00A5CF] underline">Terms of Use Preamble</span></a>; (2) <a href="/terms-and-conditions/user-agreements"><span className="text-[#00A5CF] underline">User Agreement</span></a>; (3) <a href="/terms-and-conditions/payment-terms-and-conditions"><span className="text-[#00A5CF] underline">Payment Terms and Conditions</span></a>; (4) <a href="/terms-and-conditions/third-party-affiliation-terms-and-conditions"><span className="text-[#00A5CF] underline">Third Party Affiliates Terms and Conditions</span></a>; (5) <a href="/terms-and-conditions/refund-policies"><span className="text-[#00A5CF] underline">Refund Policy</span></a>; (6) <a href="/terms-and-conditions/privacy-policies"><span className="text-[#00A5CF] underline">Privacy Policy</span></a>; (7) <a href="/terms-and-conditions/cookies-policies"><span className="text-[#00A5CF] underline">Code Policy</span></a>; and (8) <a href="/terms-and-conditions/intellectual-property-policy-and-procedures"><span className="text-[#00A5CF] underline">Intellectual Property Policy and Procedures</span></a><a href="/terms-and-conditions/copyright-takedown-notice-form"><span className="text-[#00A5CF] underline"></span></a>; and may also comprise additionally, such other legal documents, as may be declared to become a part of it or as may be incorporated herein by reference, as updated from time to time. This Terms of Use provides the various terms and conditions pertaining to use/service; confers rights and obligations upon the parties bound by it; regulates the activities of the users; and protects the rights conferred by law of third parties affected by the actions/omissions of both parties in this behalf. This Terms of Use shall, unless it is declared to be void or unenforceable, either completely or in part, continue to govern the rights conferred (legal or contractual), and the various aspects of law and regulatory compliances in this behalf, as applicable. This Terms of Use shall be deemed as the primary document forming the basis of contractual relations between the parties bound by it unless the parties hereto have entered into any separate agreement which excludes the applicability of any provisions herein or has special provisions inserted therein to address the relevant issues. In case any or all of the provisions in such other separate agreement directly conflict with any or all of the corresponding provisions contained herein, such provisions set forth in such separate agreement shall, to that extent, take precedence and prevail over such corresponding provisions contained herein.
          </p>
          <p className='text-center mt-8 text-[18px] [@media(min-width:1750px)]:text-[22px]'> -----End of Terms of Use Preamble-----</p>
        </div>
        )}
        


        {term.id !== "terms-of-use-preamble" && (
          <div className="flex flex-col gap-2">
             {/* Render Introductory Lines */}
            {term.introductoryLines?.map((line, index) => (
              <p key={`intro-${index}`} className="text-[15px] md:text-[18px] font-lato font-normal leading-relaxed text-gray-600"> {/* Added text color */}
                {line}
              </p>
            ))}

            {/* Render Sections */}
            {term.sections?.map((section, sectionIndex) => (
              <React.Fragment key={`section-${sectionIndex}`}>
                {/* Section Title */}
                <h3 className="text-[18px] md:text-[22px] font-poppins font-bold mt-4 mb-2 text-[#003F5C]"> {/* Added margins and color */}
                  ({sectionIndex+1}) {section.sectionTitle}
                </h3>

                {/* Section Content Paragraphs */}
                {section.content.map((paragraph, paraIndex) => (
                  <p key={`para-${sectionIndex}-${paraIndex}`} className="text-[15px] md:text-[18px] font-lato font-normal leading-relaxed text-gray-700 mb-2">
                    {paragraph.startsWith('.') ? (
                      <span className="ml-4">{paragraph.substring(1).trim()}</span>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}

              </React.Fragment>
            ))}

            <p className='text-center mt-8 text-[18px]'> -----End of {term.title}-----</p>
          </div>
        )}
      </div>
    </div>
  );
};