"use client"

import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

const ButtonCodeMasuk = () => {
    const { bahasa, text } = useLanguage(); // Mengambil teks berdasarkan bahasa
    return (
        <Link href="/login">
            <button
                className="bg-gray-600 bg-opacity-65 hover:bg-opacity-45 text-white text-xs py-2 px-6 rounded-sm  font-semibold transition-all duration-300 w-full"
            >
                {text[bahasa].buttonCodeMasuk}
            </button>
        </Link>
    );
}

export default ButtonCodeMasuk;
