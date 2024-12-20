"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getEmailError } from "../Validation/ValidationEmail";

const InputEmailLand = ({ email, setEmail, error, setError }) => {
    const { bahasa, text } = useLanguage();
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        if (isTouched && email) {
            const errorMessage = getEmailError(email, text, bahasa);
            setError(errorMessage); // Memperbarui error menggunakan setError dari komponen induk
        }
    }, [email, isTouched, text, bahasa, setError]);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleBlur = () => {
        setIsTouched(true);
    };

    const borderColorClass = error
        ? "border-red-500"
        : email && !error
            ? "border-green-500"
            : "border-white";

    return (
        <div className="relative max-w-72 w-full">
            <input
                id="email"
                type="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={text[bahasa].InputEmail}
                className={`peer py-2 px-4 rounded-full bg-gray-950 text-white border-2 ${borderColorClass} bg-opacity-40 w-full focus:ring-2 ring-white focus:outline-none`}
            />
            {isTouched && error && (
                <p className="absolute text-red-500 text-xs mt-1 ml-3">{error}</p>
            )}
        </div>
    );
};

export default InputEmailLand;
