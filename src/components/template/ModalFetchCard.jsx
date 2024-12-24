import { useState, useEffect } from "react";
import { FaCalendarAlt, FaStar, FaFilm, FaLanguage } from "react-icons/fa";
import { formatTitle } from "../../utils/hooks/utils";
import ButtonModal from "../atoms/buttonModal";
import { useLanguage } from "../contexts/LanguageContext";
import { getTitleAndReleaseDate, getGenres, getMediaType } from "../../utils/hooks/modalUtils";
import { countryMapping } from "../../Mapping/CountryMapping/countryMapping";

const ModalFetchCard = ({ movie, onClose }) => {
  const { bahasa, text } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile jika lebar layar < 768px
    };

    // Set kondisi awal dan tambahkan event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup event listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const mainContent = document.querySelector("#main-content");
    if (movie) {
      setIsVisible(true);
      // Nonaktifkan scroll dan interaksi pada elemen lain
      document.body.style.overflow = "hidden";
      if (mainContent) {
        mainContent.setAttribute("aria-hidden", "true");
      }
    } else {
      setIsVisible(false);
      // Pulihkan scroll dan interaksi
      document.body.style.overflow = "auto";
      if (mainContent) {
        mainContent.removeAttribute("aria-hidden");
      }
    }
    return () => {
      // Cleanup untuk mencegah efek residual
      document.body.style.overflow = "auto";
      if (mainContent) {
        mainContent.removeAttribute("aria-hidden");
      }
    };
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

  const { title, releaseDate } = getTitleAndReleaseDate(movie);
  const genres = getGenres(movie, text, bahasa);
  const mediaType = getMediaType(movie, text, bahasa);
  const overview = movie.overview || text[bahasa].overviewPlaceholder;

  const originalLanguage = movie.original_language || "N/A";
  const popularity = movie.popularity || "N/A";

  const countryCode = originalLanguage.toUpperCase();
  const country = countryMapping[countryCode];
  const countryName = country ? country : originalLanguage;

  return (
    <div
      id="modal-fetch-card"
      tabIndex="0"
      className={`fixed inset-0 z-50 flex flex-col px-4 justify-center items-center bg-black bg-opacity-70 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`relative flex flex-col md:flex-row bg-black/95 backdrop-blur-md rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto transition-all duration-700 ease-in-out transform ${
          isVisible ? "scale-100 opacity-100 shadow-xl" : "scale-95 opacity-0 shadow-none"
        }`}
      >
        <div
          className={`relative flex flex-row bg-black/95 backdrop-blur-md rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto transition-all duration-700 ease-in-out transform ${isVisible ? "scale-100 opacity-100 shadow-xl" : "scale-95 opacity-0 shadow-none"
            }`}
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white hover:bg-gray-700 transition-all"
            onClick={handleClose}
          >
            ✕
          </button>

          <img
            className="md:w-64 sm:w-64 w-48 h-full shadow-lg"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={title}
          />

          <div className="flex-1 px-5 mt-4 text-white">
            <div className="mb-4 font-sans">
              <h1 className="md:text-3xl sm:text-xl text-lg font-semibold md:mb-3 sm:mb-2 mb-0">{formatTitle(title)}</h1>
              <div className="flex md:flex-row flex-col items-start md:items-center gap-2 md:gap-4 md:text-sm text-xs md:py-2 py-0">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-yellow-400" />
                  <span>{releaseDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaFilm className="text-blue-400" />
                  <span>{mediaType}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span>{popularity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaLanguage className="text-green-400" />
                  <span>{countryName.toUpperCase()}</span>
                </div>
              </div>
              <p className="md:text-sm text-xs text-gray-400 md:mt-2 mt-1">{genres}</p>
            </div>

            {/* Overview Section */}
            <p className="md:py-4 py-0 md:text-sm text-xs text-gray-300">
              {`${overview.substring(0, isMobile ? 120 : 500)}..`}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-col py-4 text-center items-center">
        <ButtonModal />
        <p className="ml-2 mt-2 md:text-sm text-xs text-white">{text[bahasa].PButtonModal}</p>
      </div>
    </div>

  );
};

const InfoItem = ({ icon, label }) => (
  <div className="flex items-center md:gap-1 gap-1 md:text-sm text-xs">
    {icon}
    <span>{label}</span>
  </div>
);

export default ModalFetchCard;
