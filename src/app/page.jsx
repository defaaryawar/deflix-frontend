"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

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
          <CardFilmTrending />
        </section>
        <section>
          <CardFilmPopular />
        </section>
        <section>
          <CardFilmTopRated />
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
