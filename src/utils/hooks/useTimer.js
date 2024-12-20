import { useState, useEffect, useRef } from "react";

export const useTimer = (initialTime = 30) => {
    const [timer, setTimer] = useState(initialTime);
    const [canResend, setCanResend] = useState(false);
    const countdownRef = useRef(null);

    useEffect(() => {
        countdownRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    setCanResend(true);
                    clearInterval(countdownRef.current);
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdownRef.current);
    }, []);

    const resetTimer = () => {
        setTimer(initialTime);
        setCanResend(false);
    };

    return { timer, canResend, resetTimer };
};
