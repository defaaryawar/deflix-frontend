export const getTitleAndReleaseDate = (movie) => {
    const title = movie.title || movie.name;
    const releaseDate = movie.release_date || movie.first_air_date;
    return { title, releaseDate };
};

export const getGenres = (movie, text, bahasa) => {
    return movie.genre_ids
        .map((id) => text[bahasa]?.genres?.[id])
        .filter(Boolean)
        .join(" | ");
};

export const getMediaType = (movie, text, bahasa) => {
    return movie.title
        ? text[bahasa].mediaTypes.movie || "Film"
        : text[bahasa].mediaTypes.tv || "Acara TV";
};
