"use client";

import { createContext, useContext, useState, useEffect } from "react";
import ButtonCodeMasuk from "../atoms/buttonCodeMasuk";

// Membuat Context untuk bahasa
const LanguageContext = createContext();

// Hook untuk menggunakan Context
export const useLanguage = () => {
    return useContext(LanguageContext);
};

// Provider untuk membungkus aplikasi dan menyediakan state bahasa
export const LanguageProvider = ({ children }) => {
    const [bahasa, setBahasa] = useState(null); // Mulai dengan null untuk menghindari SSR mismatch
    const [isOpen, setIsOpen] = useState(false);

    // Gunakan useEffect untuk memastikan setBahasa hanya terjadi di sisi klien
    useEffect(() => {
        // Mengatur bahasa default di sisi klien
        if (bahasa === null) {
            setBahasa("Indonesia"); // Atau ambil dari localStorage atau preferensi pengguna
        }
    }, [bahasa]);

    const handleBahasaChange = (newBahasa) => {
        setBahasa(newBahasa);
        setIsOpen(false);
    };

    const text = {
        Indonesia: {
            pelajari : "Pelajari selengkapnya.",
            privacyPolicy: "Halaman ini dilindungi oleh reCAPTCHA Google untuk memastikan kamu bukan bot.",
            linkRegisterLogin : "Daftar Sekarang.",
            PregisterLogin : "Baru di Deflix?",
            forgotPassword : "Lupa Sandi",
            buttonCodeMasuk : "atau masuk dengan kode",
            subModalLogin : "Masuk",
            placeLoginEmail : "Masukan Email",
            placeLoginPass : "Masukan Sandi",
            message: "Siap untuk menonton? Masukkan email Anda untuk membuat atau melanjutkan langganan Anda.",
            buttonSignIn :"Masuk",            
            buttonStarted: "Memulai",
            buttonDaftar: "Daftar",
            InputEmail: "Alamat Email",
            ValidateEmail: "Email diperlukan",
            ValidateEmail1: "Silakan masukkan alamat email yang valid",
            MenuItems2: "Acara Tv",
            MenuItems21: "Film",
            MenuItems1: "Indonesia",
            MenuItems12: "Seluruh Dunia",
            Trending: "Sedang Trending Sekarang",
            Popular: "Sedang Populer Sekarang",
            TopRated: "Peringkat Teratas",
            PButtonModal: "Gabung dengan kami sekarang!",
            buttonModal: "Nonton Sekarang",
            FAQ: "Tanya Jawab Umum",
            FaqDeflix: "Apa itu Deflix",
            FaqDefLang: "Bagaimana cara mengubah bahasa di Deflix?",
            FaqDefLang1: "Untuk mengubah bahasa di Deflix:",
            FaqDefLang2: (
                <>
                    •  Buka situs web Deflix. <br />
                    •  Pilih ikon profil di pojok kanan atas. <br />
                    •  Pilih "Bahasa", kini tersedia 2, Indoneisa dan Englsih. <br />
                    •  Pilih bahasa yang diinginkan, kemudian simpan perubahan.
                </>
            ),
            FaqQualityVideo: "Kenapa kualitas streaming saya buruk?",
            FaqQualityVideo1: "Jika kualitas streaming Netflix buruk, beberapa faktor mungkin menjadi penyebabnya:",
            FaqQualityVideo2: (
                <>
                    •  Koneksi internet lambat. <br />
                    •  Pengaturan kualitas streaming di aplikasi. <br />
                    •  Pilih Tinggi untuk kualitas terbaik. <br />
                    •  Gangguan jaringan atau perangkat lain yang menggunakan bandwidth. <br />
                    •  Coba periksa koneksi internet Anda, atau coba mulai ulang perangkat Anda.
                </>
            ),
            FaqWhereWatch2: (
                <>
                    •  Smart TV: Deflix tersedia di sebagian besar model Smart TV. <br />
                    •  Ponsel dan Tablet: Unduh aplikasi Deflix dari Google Play Store (Android) atau App Store (iOS). <br />
                    •  Komputer: Akses Deflix melalui browser di situs resmi
                </>
            ),
            FaqAnsDeflix: "Deflix adalah layanan streaming video yang menyediakan film, serial TV, dan dokumenter melalui internet dengan sistem berlangganan. Pengguna dapat menonton konten kapan saja tanpa iklan di berbagai perangkat.",
            banner: {
                heading: "Movie Tak terbatas, TV Shows, dan lebih banyak lagi",
                subheading: "Mulai dari IDR 54,000. Batalkan kapan saja",
            },
            FaqWhereWatch : "Di mana saya bisa menonton Deflix?",
            FaqWhereWatch1 : "Anda bisa menonton Deflix di berbagai perangkat, termasuk:",
            mediaTypes: {
                movie: "Film",
                tv: "Acara TV",
            },
            genres: {
                28: "Aksi",
                12: "Petualangan",
                16: "Animasi",
                35: "Komedi",
                80: "Kejahatan",
                99: "Dokumenter",
                18: "Drama",
                10751: "Keluarga",
                14: "Fantasi",
                36: "Sejarah",
                27: "Horor",
                10402: "Musik",
                9648: "Misteri",
                10749: "Romantis",
                878: "Fiksi Ilmiah",
                10770: "Film TV",
                53: "Cerita Menegangkan",
                10752: "Perang",
                37: "Barat",
                10759: "Aksi & Petualangan",
                10762: "Anak-anak",
                10763: "Berita",
                10764: "Realitas",
                10765: "Sci-Fi & Fantasi",
                10766: "Sinetron",
                10767: "Acara Bincang-bincang",
                10768: "Perang & Politik",
                10770: "Film TV",
            },
            overviewPlaceholder: "Deskripsi film atau acara TV akan muncul di sini.",
            otpMessage: "Masukkan kode OTP yang telah kami kirimkan ke email Anda.",
            otpTitle: "Verifikasi OTP",
            usrTitle: "Verifikasi User",
            resendOtp: "Jika Anda tidak menerima kode, coba lagi dalam beberapa detik.",
            resendButton: "Kirim Ulang OTP",
        },
        English: {
            pelajari : "Learn more.",
            privacyPolicy: "This page is protected by Google's reCAPTCHA to ensure you are not a bot.",
            linkRegisterLogin : "Register now.",
            PregisterLogin : "New to Deflix?",
            forgotPassword : "Forgot Password",
            buttonCodeMasuk : "or sign in with code",
            subModalLogin : "Sign In",
            placeLoginEmail : "Enter Email",
            placeLoginPass : "Enter Password",
            message: "Ready to watch? Enter your email to create or restart your membership.",
            buttonStarted: "Get Started",
            buttonDaftar: "Sign Up",
            buttonSignIn :"Sign In", 
            InputEmail: "Email Address",
            ValidateEmail: "Email is required",
            ValidateEmail1: "Please enter a valid email address",
            MenuItems2: "Tv Shows",
            MenuItems21: "Movie",
            MenuItems1: "Indonesia",
            MenuItems12: "Global",
            Trending: "Is Trending Now",
            Popular: "Is Popular Now",
            TopRated: "Top Rated",
            PButtonModal: "Join us now!",
            buttonModal: "Watch Now",
            FAQ: "General FAQ",
            FaqDeflix: "What is Deflix",
            FaqDefLang: "How do I change the language on Deflix?",
            FaqDefLang1: "To change the language on Deflix:",
            FaqDefLang2: (
                <>
                    •  Go to the Deflix website. <br />
                    •  Select the profile icon in the top right corner. <br />
                    •  Select "Language", now 2 are available, Indonesian and English. <br />
                    •  Select the desired language, then save changes.
                </>
            ),
            FaqQualityVideo: "Why is my streaming quality bad?",
            FaqQualityVideo1: "If Netflix streaming quality is poor, several factors may be to blame:",
            FaqQualityVideo2: (
                <>
                    •  Slow internet connection. <br />
                    •  Streaming quality settings in the app. <br />
                    •  Select High for best quality. <br />
                    •  Network interference or other devices using bandwidth. <br />
                    •  Try to check your internet connection, or try restarting your device.
                </>
            ),
            FaqAswDeflix: "Deflix is ​​a video streaming service that provides films, TV series and documentaries via the internet with a subscription system. Users can watch content anytime without ads on various devices.",
            banner: {
                heading: "Unlimited Movie, TV Shows, and more",
                subheading: "Starts at IDR 54,000. Cancel Anytime",
            },
            FaqWhereWatch : "Where can I watch Deflix?",
            FaqWhereWatch1 : "You can watch Deflix on a variety of devices, including:",
            FaqWhereWatch2: (
                <>
                    •  Smart TV: Deflix is ​​available on most Smart TV models. <br />
                    •  Phones and Tablets: Download the Deflix app from Google Play Store (Android) or App Store (iOS). <br />
                    •  Computer: Access Deflix via browser on the official website.
                </>
            ),
            mediaTypes: {
                movie: "Movie",
                tv: "TV Show",
            },
            genres: {
                28: "Action", // Aksi
                12: "Adventure", // Petualangan
                16: "Animation", // Animasi
                35: "Comedy", // Komedi
                80: "Crime", // Kejahatan
                99: "Documentary", // Dokumenter
                18: "Drama", // Drama
                10751: "Family", // Keluarga
                14: "Fantasy", // Fantasi
                36: "History", // Sejarah
                27: "Horror", // Horor
                10402: "Music", // Musik
                9648: "Mystery", // Misteri
                10749: "Romance", // Romantis
                878: "Science Fiction", // Sci-Fi
                10770: "TV Movie", // Film TV
                53: "Thriller", // Thriller
                10752: "War", // Perang
                37: "Western", // Western
                10759: "Action & Adventure", // Aksi & Petualangan
                10762: "Kids", // Anak-anak
                10763: "News", // Berita
                10764: "Reality", // Reality
                10765: "Sci-Fi & Fantasy", // Sci-Fi & Fantasi
                10766: "Soap", // Sinetron
                10767: "Talk Show", // Talk
                10768: "War & Politics", // Perang & Politik
            },
            overviewPlaceholder: "Movie or TV show description will appear here.",
            otpMessage: "Enter the OTP code that we have sent to your email.",
            otpTitle: "OTP verification",
            usrTitle: "User verification",
            resendOtp: "If you don't receive the code, try again in a few seconds.",
            resendButton: "Resend OTP",
        },
    };

    // Tampilkan children hanya setelah bahasa sudah diatur
    if (bahasa === null) {
        return null; // Tidak menampilkan apa pun sampai state bahasa sudah terinisialisasi
    }

    return (
        <LanguageContext.Provider value={{ bahasa, text, handleBahasaChange }}>
            {children}
        </LanguageContext.Provider>
    );
};
