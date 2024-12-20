"use client"

import CardFilm from "../CardFilm"
import { useLanguage } from "../../contexts/LanguageContext";

const CardFilmPopular = () => {
  const { bahasa, text } = useLanguage();
  return (
    <CardFilm
      title={text[bahasa].Popular}
      item="popular"
      category={null}
    />
  )
}
export default CardFilmPopular