"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Deflix from "../atoms/Title";
import ButtonSignIn from "../atoms/buttonSignIn";

const Navbar = () => {
    const { bahasa, text, handleBahasaChange } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Mengubah bahasa dan menutup dropdown dalam satu fungsi
    const handleLanguageSelect = useCallback((newBahasa) => {
        handleBahasaChange(newBahasa);
        setIsOpen(false);
    }, [handleBahasaChange]);

    // Toggle dropdown
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    // Jangan render komponen jika belum di-render di klien
    if (!isClient) return null;

    return (
        <div className="flex flex-row top-0 z-20 px-6 py-4 items-center justify-between w-full">
            <div className="flex items-center">
                <Deflix />
            </div>
            <div className="menu dropdown text-xs relative items-center">
                <div className="relative flex md:flex-row  lg:flex-row sm:flex-row flex-row gap-4">
                    <button
                        onClick={toggleDropdown}
                        className="text-white hover:text-red-500 bg-transparent border border-gray-300 px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-200"
                    >
                        {bahasa}
                    </button>
                    {isOpen && (
                        <ul className="absolute bg-white shadow-lg rounded-md mt-2 w-32 z-20">
                            <li>
                                <a
                                    className="px-4 py-2 text-black hover:bg-gray-200 hover:text-red-500 transition-all duration-150"
                                    onClick={() => handleLanguageSelect("Indonesia")}
                                >
                                    Indonesia
                                </a>
                            </li>
                            <li>
                                <a
                                    className="px-4 py-2 text-black hover:bg-gray-200 hover:text-red-500 transition-all duration-150"
                                    onClick={() => handleLanguageSelect("English")}
                                >
                                    English
                                </a>
                            </li>
                        </ul>
                    )}
                    <ButtonSignIn/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
