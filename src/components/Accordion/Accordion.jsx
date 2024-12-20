"use client"

import { useState } from "react";
import { AccordionItem } from '../Accordion/AccordionAtoms/AccordionItem';
import { NestedAccordion } from '../Accordion/AccordionAtoms/NestedAccordion';
import { useLanguage } from "../contexts/LanguageContext"; // Menggunakan useLanguage dari context

export default function Accordion() {
    const [isExpanded1, setIsExpanded1] = useState(false);
    const [nestedIsExpanded1, setNestedIsExpanded1] = useState(false);
    const [nestedIsExpanded2, setNestedIsExpanded2] = useState(false);
    const [nestedIsExpanded3, setNestedIsExpanded3] = useState(false);
    const { bahasa, text } = useLanguage(); // Mengambil teks berdasarkan bahasa

    const toggleExpand = (setter) => {
        setter((prev) => !prev);
    };

    return (
        <div id="accordion-nested-parent" className="px-16 py-5 mx-auto">
            <h1 className="text-white text-start text-2xl ml-4 mb-2 font-semibold">{text[bahasa].FAQ}</h1>
            <div className="bg-black/75 rounded-lg shadow-lg overflow-hidden">
                {/* Main Accordion Item */}
                <AccordionItem
                    label={text[bahasa].FaqDeflix}
                    isExpanded={isExpanded1}
                    toggleExpand={() => toggleExpand(setIsExpanded1)}
                >
                    <p className="text-gray-300">
                        {text[bahasa].FaqAnsDeflix}
                    </p>
                    {/* Nested Accordion */}
                    <NestedAccordion
                        items={[
                            {
                                label: text[bahasa].FaqQualityVideo,
                                isExpanded: nestedIsExpanded1,
                                toggleExpand: () => toggleExpand(setNestedIsExpanded1),
                                content: (
                                    <>
                                    <h1 className="faq-sub font-semibold mb-1">{text[bahasa].FaqQualityVideo1}</h1>
                                        <p className="faq-text">
                                            {text[bahasa].FaqQualityVideo2}
                                        </p>
                                    </>
                                ),
                            },
                            {
                                label: text[bahasa].FaqDefLang,
                                isExpanded: nestedIsExpanded2,
                                toggleExpand: () => toggleExpand(setNestedIsExpanded2),
                                content: (
                                    <>
                                        <h1 className="faq-sub mb-1 font-semibold">{text[bahasa].FaqDefLang1}</h1>
                                        <p className="faq-text">
                                            {text[bahasa].FaqDefLang2}
                                        </p>
                                    </>
                                ),
                            },
                            {
                                label: text[bahasa].FaqWhereWatch,
                                isExpanded: nestedIsExpanded3,
                                toggleExpand: () => toggleExpand(setNestedIsExpanded3),
                                content: (
                                    <>
                                    <h1 className="faq-sub mb-1 font-semibold">{text[bahasa].FaqWhereWatch1}</h1>
                                        <p className="faq-text">
                                            {text[bahasa].FaqWhereWatch2}
                                        </p>
                                    </>
                                ),
                            },
                        ]}
                    />
                </AccordionItem>
            </div>
        </div>
    );
}
