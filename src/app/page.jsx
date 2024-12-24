"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Banner from "@/components/banner/banner";
import Navbar from "@/components/Navbar/Navbar";
import BtnDanEmail from "@/components/template/BtnDanEmail";
import CardFilmTrending from "@/components/CardFilm/CardFilmTrending/CardFilmTrending";
import CardFilmPopular from "@/components/CardFilm/CardFilmPopular/CardFilmPopular";
import CardFilmTopRated from "@/components/CardFilm/CardFilmTopRated/CardFilmTopRated";
import Accordin from "@/components/Accordion/Accordion";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  useEffect(() => {
    const rootElement = document.querySelector(".backgroundDeflix");
    if (isModalOpen && rootElement) {
      rootElement.classList.add("no-scroll");
    } else if (rootElement) {
      rootElement.classList.remove("no-scroll");
    }

    return () => {
      if (rootElement) rootElement.classList.remove("no-scroll");
    };
  }, [isModalOpen]);

  return (
    <div className="backgroundDeflix">
      <div className="backdrop-blur-md bg-black/70 select-none">
        <section>
          <Navbar />
        </section>
        <section>
          <Banner />
        </section>
        <section>
          <BtnDanEmail />
        </section>
        <section>
          <CardFilmTrending setIsModalOpen={setIsModalOpen} />
        </section>
        <section>
          <CardFilmPopular setIsModalOpen={setIsModalOpen} />
        </section>
        <section>
          <CardFilmTopRated setIsModalOpen={setIsModalOpen} />
        </section>
        <section>
          <Accordin />
        </section>
        <section>
          <Footer />
        </section>
      </div>
    </div>
  );
}
