"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchTMBD } from "@/libs/libsApi";
import { FaRegCalendarAlt, FaStar } from "react-icons/fa";

const Page = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const [movieDetails, setMovieDetails] = useState(null);
    const [officialTrailer, setOfficialTrailer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchMovieDetailsAndTrailer = async () => {
            try {
                // Fetch movie details
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch movie details: ${response.status}`);
                }

                const movieData = await response.json();
                setMovieDetails(movieData);

                // Fetch trailer for the specific movie
                const trailerData = await fetchTMBD("movie", id, "videos");
                const official = trailerData?.find(
                    (trailer) =>
                        trailer.type === "Trailer" &&
                        trailer.official === true &&
                        trailer.site === "YouTube"
                );
                setOfficialTrailer(official || null);
            } catch (error) {
                console.error("Error fetching movie details or trailers:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetailsAndTrailer();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <p className="text-white text-lg">Loading...</p>
            </div>
        );
    }

    if (!movieDetails) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <p className="text-white text-lg">Failed to load movie details</p>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center text-white p-6"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path})`,
            }}
        >
            <div className="bg-black/70 p-6 rounded-lg">
                {/* Back Button */}
                <button
                    className="text-sm bg-white text-black px-4 py-2 rounded mb-4"
                    onClick={() => router.back()}
                >
                    Back
                </button>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <img
                        className="w-full md:w-64 rounded-lg"
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        alt={movieDetails.title}
                    />
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-bold">{movieDetails.title}</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <FaRegCalendarAlt className="text-deflixRed" />
                                <span>{movieDetails.release_date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaStar className="text-deflixRed" />
                                <span>{movieDetails.vote_average.toFixed(1)} / 10</span>
                            </div>
                        </div>
                        <p className="text-gray-300">{movieDetails.overview}</p>
                        {movieDetails.production_companies?.length > 0 && (
                            <div className="mt-2">
                                <h2 className="text-xl font-semibold mb-4">Production Companies</h2>
                                <div className="bg-white/70 rounded-sm backdrop-blur-md flex flex-row gap-10 px-4 py-1 justify-start items-center">
                                    {movieDetails.production_companies.map((company) => (
                                        <div key={company.id} className="flex flex-col items-center">
                                            {company.logo_path && (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                                                    alt={company.name}
                                                    className="w-full max-w-28 h-20 object-contain mb-2"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Trailer Section */}
                {officialTrailer ? (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Watch Trailer</h2>
                        <div className="relative pb-[56.25%] h-0">
                            <iframe
                                className="absolute inset-0 w-full h-full rounded-lg"
                                src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                                title={officialTrailer.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                ) : (
                    <p className="mt-8 text-gray-300">No official trailer available.</p>
                )}
            </div>
        </div>
    );
};

export default Page;
