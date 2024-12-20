"use client"

import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

const ButtonSignIn = () => {
    const { bahasa, text } = useLanguage(); // Mengambil teks berdasarkan bahasa
    return (
        <Link href="/login">
            <button
                className="bg-deflixRed hover:bg-red-700 text-white text-xs py-2 px-6 rounded-md  font-semibold transition-all duration-300 w-full"
            >
                {text[bahasa].buttonSignIn}
            </button>
        </Link>
    );
}

export default ButtonSignIn;
