// hooks/useScrollNavigation.js
import { useState, useRef } from "react";

const useScrollNavigation = () => {
    const scrollContainerRef = useRef(null);
    const itemsRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        const scrollPosition = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        setShowLeftButton(scrollPosition > 0);
        setShowRightButton(scrollPosition < maxScroll);
    };

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return {
        showLeftButton,
        showRightButton,
        scrollLeft,
        scrollRight,
        handleScroll,
        scrollContainerRef,
        itemsRef,
    };
};

export default useScrollNavigation;
