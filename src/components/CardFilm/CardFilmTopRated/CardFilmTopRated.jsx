"use client"

import CardFilm from "../CardFilm"
import { useLanguage } from "../../contexts/LanguageContext";

const CardFilmTopRated = () => {
    const { bahasa, text } = useLanguage();
    return (
        <CardFilm
            title={text[bahasa].TopRated}
            item="top_rated"
            category={null}
        />
    )
}
export default CardFilmTopRated