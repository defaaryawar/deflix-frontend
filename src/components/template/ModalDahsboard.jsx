"use client";

import { useState, useEffect } from "react";
import { fetchTMBD } from "@/libs/libsApi";
import { FaRegCalendarAlt, FaStar } from "react-icons/fa";

const ModalDashboard = ({ onClose, movie }) => {
    const [officialTrailer, setOfficialTrailer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const data = await fetchTMBD("movie", movie.id, "videos");
                const official = data?.find(
                    (trailer) =>
                        trailer.type === "Trailer" &&
                        trailer.official === true &&
                        trailer.site === "YouTube"
                );
                setOfficialTrailer(official || null);
            } catch (error) {
                console.error("Error fetching trailers:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrailers();
    }, [movie.id]);

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
            <div className="relative w-[400px] h-[400px] bg-black/90 rounded-lg shadow-lg p-0.5">
                {/* Close Button */}
                <button
                    className="absolute bottom-2 right-2 bg-white font-sans font-semibold tracking-widest text-black px-2 py-1 text-xs rounded-sm flex items-center justify-center hover:bg-slate-100 transition focus:outline-none z-10"
                    onClick={onClose}
                >
                    Close
                </button>

                {/* Content */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-6 text-white text-lg">
                        <p>Loading trailer...</p>
                    </div>
                ) : officialTrailer ? (
                    <div>
                        {/* Video Section */}
                        <div className="relative pb-[75%] bg-black">
                            <iframe
                                className="absolute inset-0 w-full h-full rounded-t-lg"
                                src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                                title={officialTrailer.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Movie Info */}
                        <div className="px-3 py-2 text-white justify-start items-center">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-md font-semibold">{movie.title}</h2>
                                <p className="POverviewDashboard">{`${movie.overview?.substring(0, 149)}...`}</p>
                            </div>
                            <div className="flex text-white font-bold text-xs mt-1 items-center gap-1">
                                <FaRegCalendarAlt className="text-deflixRed"/>
                                <p>{movie.release_date}</p>
                                <FaStar className="text-deflixRed ml-3"/>
                                <p>{movie.popularity}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-white text-center">
                        <p className="text-lg">No official trailer available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalDashboard;
