"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { storeEmail, getEmail, removeEmail } from "@/utils/helpers/storageHelpers";
import { sendOtp, verifyOtp } from "@/utils/helpers/otpHelpers";
import { useTimer } from "@/utils/hooks/useTimer";
import ButtonDaftar from "@/components/atoms/buttonDaftar";
import zxcvbn from "zxcvbn";

const OtpPage = () => {
    const { bahasa, text } = useLanguage();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { timer, canResend, resetTimer } = useTimer();
    const [isLoadng, setIsLoading] = useState(false)

    useEffect(() => {
        const email = getEmail();
        if (!email) {
            router.replace("/");
        }
    }, [router]);

    const handleSubmitOtp = async () => {
        try {
            const email = getEmail();
            const otpNumber = parseInt(otp, 10);

            if (isNaN(otpNumber)) {
                setError("OTP harus berupa angka 6 digit.");
                setIsOtpValid(false);
                return;
            }

            const response = await verifyOtp(email, otpNumber);
            console.log("Respon dari server:", response);

            if (response.isValid) {
                setIsOtpValid(true);
                setFormStep(2);
            } else {
                setIsOtpValid(false);
                setError(response.message || "OTP tidak valid. Silakan coba lagi.");
            }
        } catch (error) {
            setError(error.message || "OTP tidak valid. Silakan coba lagi.");
            setIsOtpValid(false);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const strength = zxcvbn(value).score;
        setPasswordStrength(strength + 1);
    };

    const isPasswordValid = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 8;
        return hasUpperCase && hasLowerCase && hasMinLength;
    };

    const handleSubmitRegistration = async (e) => {
        e.preventDefault();
    
        if (!isPasswordValid(password)) {
            setError("Password harus minimal 8 karakter, mengandung 1 huruf besar dan 1 huruf kecil.");
            return;
        }
    
        if (password !== confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            return;
        }
    
        if (!name || !password) {
            setError("Nama dan password harus diisi.");
            return;
        }
    
        try {
            setIsLoading(true);
            const email = getEmail();

            const response = await fetch("https://naughty-emogene-deflix-67da416e.koyeb.app/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, name, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Gagal mendaftar. Silakan coba lagi.");
            }
    
            const tokenResponse = await fetch("https://naughty-emogene-deflix-67da416e.koyeb.app/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const tokenData = await tokenResponse.json();
    
            if (!tokenResponse.ok) {
                throw new Error(tokenData.message || "Gagal mendapatkan token. Silakan coba lagi.");
            }
    
            // Simpan token ke localStorage
            localStorage.setItem("token", tokenData.token);
    
            // Arahkan pengguna ke dashboard
            router.push("/dashboard");
        } catch (error) {
            setError(error.message || "Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };    

    const handleOtpChange = (e) => {
        const value = e.target.value;

        if (/[^0-9]/.test(value)) return;
        setOtp(value);
        setIsOtpValid(false);
        setError("");
    };

    const resendOtp = async () => {
        try {
            const email = getEmail();
            if (!email) {
                setError("Anda harus melakukan registrasi terlebih dahulu.");
                return;
            }

            await sendOtp(email);
            resetTimer();
            alert("OTP baru telah dikirim.");
        } catch (error) {
            setError(error.message || "Gagal mengirim OTP. Coba lagi.");
        }
    };

    useEffect(() => {
        if (otp.length === 6 && !isOtpValid) {
            handleSubmitOtp();
        }
    }, [otp, isOtpValid]);

    return (
        <div className="backgroundDeflix">
            <div className="flex justify-center items-center min-h-screen bg-black/80 backdrop-blur-md">
                <div className="bg-black/80 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-center text-white mb-8">
                        {formStep === 1 ? text[bahasa].otpTitle : text[bahasa].usrTitle}
                    </h2>

                    {formStep === 1 && (
                        <p className="text-center text-white mb-6">{text[bahasa].otpMessage}</p>
                    )}

                    {formStep === 1 ? (
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            <div className="flex flex-col px-10 justify-center items-center">
                                <label htmlFor="otp" className="text-lg font-medium text-white">Masukkan OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    className={`flex w-full px-4 py-3 text-center tracking-widest text-white space-x-5 mt-2 border-4 ${error ? "border-yellow-500" : "border-b-deflixRed"} border-t-0 border-r-0 border-l-0 focus:outline-none bg-transparent ${error ? "animate-shake" : ""}`}
                                    placeholder="Masukkan OTP 6 digit"
                                    maxLength={6}
                                />
                                {error && <p className="text-yellow-500 text-sm mt-2">{error}</p>}
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmitRegistration} className="space-y-6">
                            <div className="relative flex flex-col px-10 justify-start">
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="peer flex w-full px-4 py-3 text-white mt-2 border border-deflixRed focus:outline-none bg-transparent rounded-md"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="name" className="absolute left-11 top-2 text-white text-md transition-all duration-300 transform -translate-y-3.5 scale-75 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 bg-black px-3">
                                    Nama
                                </label>
                            </div>

                            <div className="relative flex flex-col px-10">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="peer flex w-full px-4 py-3 text-white mt-2 border border-deflixRed focus:outline-none bg-transparent rounded-md"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-11 top-2 text-white text-md transition-all duration-300 transform -translate-y-3.5 scale-75 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 bg-black px-3"
                                >
                                    Password
                                </label>
                                {/* Strength Meter */}
                                <div className="absolute right-11 -bottom-3 flex items-center space-x-1">
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 w-3 rounded ${i < passwordStrength
                                                ? passwordStrength <= 2
                                                    ? "bg-yellow-500"
                                                    : passwordStrength <= 4
                                                        ? "bg-blue-500"
                                                        : "bg-red-500"
                                                : "bg-gray-400"
                                                }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative flex flex-col px-10 pb-4 justify-start">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="peer flex w-full px-4 py-3 text-white mt-2 border border-deflixRed focus:outline-none bg-transparent rounded-md"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="confirmPassword" className="absolute left-11 top-2 text-white text-md transition-all duration-300 transform -translate-y-3.5 scale-75 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 px-3 bg-black">
                                    Konfirmasi Password
                                </label>
                                {error && <p className="absolute text-yellow-500 text-xs font-sans -bottom-4 left-11 right-10">{error}</p>}
                            </div>
                            <div className="mt-4 px-10">
                                <ButtonDaftar />
                            </div>
                        </form>
                    )}

                    <div className="mt-4 text-center">
                        {formStep === 1 && (
                            <>
                                <p className="text-sm text-white">{text[bahasa].resendOtp}</p>
                                {canResend ? (
                                    <button onClick={resendOtp} className="text-deflixRed hover:text-red-800 underline mt-2">
                                        {text[bahasa].resendButton}
                                    </button>
                                ) : (
                                    <p className="text-deflixRed mt-2">{timer} detik</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpPage;
