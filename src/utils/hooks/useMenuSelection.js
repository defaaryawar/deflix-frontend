import { useState, useEffect } from 'react';
import { useLanguage } from '../../components/contexts/LanguageContext'; // Mengambil konteks bahasa

const useMenuSelection = () => {
    const { bahasa, text } = useLanguage();
    const [selectedMenu1, setSelectedMenu1] = useState("Indonesia");
    const [selectedMenu2, setSelectedMenu2] = useState("Film");

    useEffect(() => {
        if (bahasa === "English") {
            setSelectedMenu2(text[bahasa].MenuItems21);
        } else if (bahasa === "Indonesia") {
            setSelectedMenu2(text[bahasa].MenuItems21);
        }
    }, [bahasa, text]);

    const menu1Items = [
        { text: text[bahasa].MenuItems1, href: "#" },
        { text: text[bahasa].MenuItems12, href: "#" },
    ];

    const menu2Items = [
        { text: text[bahasa].MenuItems21, href: "#" },
        { text: text[bahasa].MenuItems2, href: "#" },
    ];

    const handleMenu1Select = (text) => {
        setSelectedMenu1(text);
    };

    const handleMenu2Select = (text) => {
        setSelectedMenu2(text);
    };

    return {
        selectedMenu1,
        selectedMenu2,
        menu1Items,
        menu2Items,
        handleMenu1Select,
        handleMenu2Select,
    };
};

export default useMenuSelection;
