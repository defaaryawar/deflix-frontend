"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { getEmailError } from "../Validation/ValidationEmail";

const { default: ButtonStarted } = require("../atoms/buttonStarted");
const { default: InputEmail } = require("../atoms/inputEmailLand");

const BtnDanEmail = () => {
  const { bahasa, text } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = getEmailError(email, text, bahasa);
    if (isEmailValid) {
      setError(isEmailValid);
      return;
    }

    try {

      const response = await fetch("deflix-backend-production.up.railway.app/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        sessionStorage.setItem("email", email);
        console.log(email)
        router.push("/otp");
      } else {
        alert("Failed to submit email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative text-center pb-16 md:pb-20 sm:pb-16 lg:pb-20">
      <p className="px-8 text-white text-sm font-normal">{text[bahasa].message}</p>
      <div className="">
        <form onSubmit={handleSubmit} className="flex md:flex-row sm:flex-row lg:flex-row flex-col justify-center gap-4 items-center mt-4">
          {/* Kirimkan setEmail dan error ke InputEmail */}
          <InputEmail email={email} setEmail={setEmail} error={error} setError={setError} />
          <ButtonStarted />
        </form>
      </div>
    </div>
  );
};

export default BtnDanEmail;
