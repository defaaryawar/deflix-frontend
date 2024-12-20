"use client";

import { useState, useEffect } from "react";
import { FaCalendarAlt, FaStar, FaFilm, FaLanguage } from "react-icons/fa";
import { formatTitle } from "../../utils/hooks/utils";
import ButtonModal from "../atoms/buttonModal";
import { useLanguage } from "../contexts/LanguageContext";
import { getTitleAndReleaseDate, getGenres, getMediaType } from "../../utils/hooks/modalUtils"; // Impor fungsi
import { countryMapping } from "../../Mapping/CountryMapping/countryMapping"; // Impor countryMapping

const ModalFetchCard = ({ movie, onClose, position }) => {
  const { bahasa, text } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (movie) {
      setIsVisible(true);
    }
  }, [movie]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  if (!movie) {
    return null;
  }

  // Menggunakan fungsi utilitas
  const { title, releaseDate } = getTitleAndReleaseDate(movie);
  const genres = getGenres(movie, text, bahasa);
  const mediaType = getMediaType(movie, text, bahasa);
  const overview = movie.overview || text[bahasa].overviewPlaceholder;

  // Mengambil data dari film atau TV show
  const originalLanguage = movie.original_language || "N/A";
  const popularity = movie.popularity || "N/A";

  const countryCode = originalLanguage.toUpperCase();

  const country = countryMapping[countryCode];

  const countryName = country ? country : originalLanguage;

  return (
    <div
      className={`fixed z-50 bg-transparent bg-opacity-65 flex justify-center items-center rounded-lg transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translate(-50%, 0)",
      }}
    >
      <div
        className={`relative flex flex-row bg-black/95 backdrop-blur-md rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto transition-all duration-700 ease-in-out transform ${isVisible
            ? "scale-100 opacity-100 shadow-xl translate-y-0"
            : "scale-95 opacity-0 shadow-none translate-y-10"
          }`}
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white hover:bg-gray-700 transition-all"
          onClick={handleClose}
        >
          ✕
        </button>

        <img
          className="w-72 max-h-[50vh] h-full shadow-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title}
        />

        <div className="flex-1 px-5 mt-4 text-white">
          <div className="mb-4 font-sans">
            <h1 className="text-3xl font-semibold mb-2">{formatTitle(title)}</h1>
            <div className="flex items-center gap-3 text-sm">
              <InfoItem
                icon={<FaCalendarAlt className="text-yellow-400" />}
                label={releaseDate}
              />
              <InfoItem
                icon={<FaFilm className="text-blue-400" />}
                label={mediaType}
              />
              <InfoItem
                icon={<FaStar className="text-yellow-500" />}
                label={popularity}
              />
              <InfoItem
                icon={<FaLanguage className="text-green-400" />}
                label={countryName.toUpperCase()}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">{genres}</p>
          </div>

          {/* Overview Section */}
          <p className="py-4 text-sm text-gray-300">{overview}</p>
          <div className="flex-col py-4 jus">
            <ButtonModal />
            <p className="ml-2 mt-2">{text[bahasa].PButtonModal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label }) => (
  <div className="flex items-center gap-1">
    {icon}
    <span>{label}</span>
  </div>
);

export default ModalFetchCard;
