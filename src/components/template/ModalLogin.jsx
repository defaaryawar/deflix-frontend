"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ButtonCodeMasuk from "../atoms/buttonCodeMasuk";
import { useLanguage } from "../contexts/LanguageContext"; // Menggunakan useLanguage dari context

const ModalLogin = () => {
    const { bahasa, text } = useLanguage(); // Mengambil teks berdasarkan bahasa
    const router = useRouter();

    // Tambahkan state untuk email dan password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
    
        try {
            const response = await fetch("https://deflix-backend-production.up.railway.app/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Login gagal. Silakan coba lagi.");
            }
    
            // Simpan token JWT di localStorage
            localStorage.setItem("token", data.token);
    
            // Tampilkan token JWT di konsol
            console.log("Token JWT:", data.token);
    
            // Arahkan pengguna ke halaman dashboard
            router.push("/dashboard");
        } catch (error) {
            setError(error.message);
            console.error("Login error:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-transparent min-h-screen flex flex-col justify-center items-center font-sans">
            <div className="bg-black/70 px-12 py-8 rounded-lg flex-col flex gap-4 w-[350px]">
                <div>
                    <p className="text-white font-bold text-2xl font-sans">{text[bahasa].subModalLogin}</p>
                </div>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    {/* Input Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 rounded bg-gray-800/50 text-white text-sm"
                        required
                    />

                    {/* Input Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 rounded bg-gray-800/50 text-white text-sm"
                        required
                    />

                    {/* Tampilkan error jika ada */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Tombol Sign In */}
                    <button
                        type="submit"
                        className="bg-deflixRed hover:bg-red-700 text-white font-bold py-2 rounded text-xs"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : text[bahasa].buttonSignIn}
                    </button>
                </form>

                <div className="flex items-center space-x-4">
                    <div className="flex-1 border-t border-gray-400"></div>
                    <span className="text-gray-400 text-sm">atau</span>
                    <div className="flex-1 border-t border-gray-400"></div>
                </div>
                <ButtonCodeMasuk />

                <Link
                    className="text-gray-300 text-xs text-center hover:underline"
                    href="/forgotPassword"
                >
                    {text[bahasa].forgotPassword}?
                </Link>
                <p className="text-gray-300 text-xs font-sans">
                    {text[bahasa].PregisterLogin}
                    <Link
                        className="font-bold hover:underline"
                        href="/"
                    >
                        {" "}{text[bahasa].linkRegisterLogin}
                    </Link>
                </p>
                <p className="text-xs text-gray-500">
                    {text[bahasa].privacyPolicy}<br />
                    <Link
                        className="text-blue-500"
                        href="/pelajariSelengkapnya"
                    >
                        {text[bahasa].pelajari}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ModalLogin;
