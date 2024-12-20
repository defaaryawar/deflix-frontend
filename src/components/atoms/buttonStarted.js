"use client"

import { useLanguage } from "../contexts/LanguageContext"; // Menggunakan useLanguage dari context

const ButtonStarted = () => {
    const { bahasa, text } = useLanguage(); // Mengambil teks berdasarkan bahasa

    return (
        <button className="bg-deflixRed hover:bg-red-700 text-white py-2 px-8 rounded-full text-lg font-semibold transition-all duration-300">
            {text[bahasa]?.buttonStarted}
        </button>
    );
}

export default ButtonStarted;
