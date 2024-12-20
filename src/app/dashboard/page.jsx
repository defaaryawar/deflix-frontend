"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Deflix from "@/components/atoms/Title";
import { fetchTMBD } from "@/libs/libsApi";

const Dashboard = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/login");
            return;
        }

        const validateToken = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/auth/validate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Token tidak valid");
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Error validating token:", error);
                localStorage.removeItem("token");
                router.replace("/login");
            }
        };

        validateToken();
    }, [router]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await fetchTMBD("", "movie", "upcoming");
                setMovies(data || []);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        if (!isLoading) {
            fetchMovies();
        }
    }, [isLoading]);

    const handleMovieClick = (movie) => {
        router.push(`/card/${movie.id}`);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.replace("/");
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-white text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="backgroundDeflix">
            <div className="bg-black/80 backdrop-blur-md text-white min-h-screen px-8 py-4">
                <div className="flex flex-row justify-between items-center mb-8">
                    <Deflix />
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Upcoming Movies</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="relative group cursor-pointer"
                                onClick={() => handleMovieClick(movie)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="rounded-lg w-full h-full object-cover transform group-hover:scale-105 transition duration-300 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-center transition duration-300 ease-in-out rounded-lg">
                                    <p className="text-lg font-bold">{movie.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
