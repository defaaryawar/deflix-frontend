"use client"

import { useLanguage } from "../contexts/LanguageContext"; // Menggunakan useLanguage dari context

const Banner = () => {
    const { bahasa, text } = useLanguage(); // Mengambil teks berdasarkan bahasa

    // Memecah heading menjadi variabel untuk menghindari pemanggilan split() berulang kali
    const headingParts = text[bahasa].banner.heading.split(",");

    return (
        <div className="px-10 pb-4">
            <div className="relative bg-[url('/background/background.jpeg')] bg-cover bg-center border-2 border-white rounded-2xl h-[550px]">
                {/* Efek overlay gelap */}
                <div className="absolute inset-0 bg-black opacity-70 rounded-2xl z-10"></div>
                {/* Konten lainnya */}
                <div className="p-5 absolute z-20 text-white text-center bottom-4 left-0 right-0">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                        <div>{headingParts[0]}</div>
                        <div>{headingParts[1]} {headingParts[2]}</div>
                    </h1>
                    <p className="text-lg sm:text-xl font-semibold mt-5">
                        {text[bahasa].banner.subheading}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
