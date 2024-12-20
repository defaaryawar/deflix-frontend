"use client"
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext"; // Menggunakan useLanguage dari context

const ButtonModal = () => {
    const { bahasa, text } = useLanguage(); // Mengambil teks berdasarkan bahasa
    return (
        <Link href="/login">
            <button className="bg-deflixRed hover:bg-red-700 text-white py-2 px-6 rounded-full text-sm font-semibold transition-all duration-300">
                {text[bahasa]?.buttonModal}
            </button>
        </Link>
    );
}

export default ButtonModal;
