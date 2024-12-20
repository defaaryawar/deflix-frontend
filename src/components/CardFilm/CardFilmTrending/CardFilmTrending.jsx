"use client"

import CardFilm from "../CardFilm"
import { useLanguage } from "../../contexts/LanguageContext";

const CardFilmTrending = () => {
  const { bahasa, text } = useLanguage();
  return (
    <CardFilm
      title={text[bahasa].Trending}
      head="trending"
      item="day"
      category={null}
    />
  )
}
export default CardFilmTrending