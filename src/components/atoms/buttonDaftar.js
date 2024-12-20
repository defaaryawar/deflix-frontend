"use client"

import { useLanguage } from "../contexts/LanguageContext"; // Menggunakan useLanguage dari context

const ButtonDaftar = () => {
    const { bahasa, text } = useLanguage();

    return (
        <button 
        type="submit"
        className="bg-deflixRed hover:bg-red-700 text-white py-2 px-8 rounded-full text-lg font-semibold transition-all duration-300 w-full">
            {text[bahasa]?.buttonDaftar}
        </button>
    );
}

export default ButtonDaftar;
