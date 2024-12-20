import { useLanguage } from "../contexts/LanguageContext";

export const InputPassword = () => {
    const { bahasa, text } = useLanguage(); // Mengambil teks berdasarkan bahasa
    return (
        <input
            type="text"
            placeholder={text[bahasa].placeLoginPass}
            className="px-3 py-3 text-xs text-white bg-transparent border border-gray-500 rounded-md w-full h-auto" />
    )
}

export const InputEmail = () => {
    const { bahasa, text } = useLanguage(); // Mengambil teks berdasarkan bahasa
    return (
        <input
            type="text"
            placeholder={text[bahasa].placeLoginEmail}
            className="px-3 py-3 text-xs text-white bg-transparent border border-gray-500 rounded-md w-full h-auto" />
    )
}