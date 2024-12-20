export const getTitleAndReleaseDate = (movie) => {
    // Mengambil title dan release_date atau first_air_date
    const title = movie.title || movie.name;
    const releaseDate = movie.release_date || movie.first_air_date;
    return { title, releaseDate };
};

export const getGenres = (movie, text, bahasa) => {
    // Mengambil genre berdasarkan genre_ids
    return movie.genre_ids
        .map((id) => text[bahasa]?.genres?.[id]) // Map ID ke terjemahan
        .filter(Boolean)
        .join(" | ");
};

export const getMediaType = (movie, text, bahasa) => {
    // Tentukan mediaType berdasarkan ada atau tidaknya title
    return movie.title
        ? text[bahasa].mediaTypes.movie || "Film"
        : text[bahasa].mediaTypes.tv || "Acara TV";
};
