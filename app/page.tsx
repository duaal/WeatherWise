"use client";
import React, { useState, useEffect, useRef } from "react";
import Input from "./components/Input";
import { motion } from "framer-motion";
import CurrentWeather from "./components/CurrentWeather";
import { Icon } from "@iconify/react/dist/iconify.js";
import NoResult from "./components/NoResult";
import Forcast from "./components/Forcast";
import Footer from "./components/Footer";
export default function Home() {
  //creating states
  const [locationHolder, setLocationHolder] = useState("london");
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroe, setError] = useState("");
  //our api url
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${
    process.env.NEXT_PUBLIC_API_KEY_WEATHER
  }&q=${location === "" ? locationHolder : location}&days=7&aqi=yes&alerts=yes
  `;
  //ref for scrolling
  const ref = useRef(null);
  //a handle function for the input for fetching data from the api
  const handleSubmit = async (e: any) => {
    console.log(e.type);
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      setLoading(true);
      try {
        const respone = await fetch(url);
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        if (!respone.ok) {
          throw new Error();
        }
        const result = await respone.json();
        setData(result);
        setLocation("");
        setLoading(false);
        setError("");

        console.log(data);
      } catch (error) {
        console.error("Something bad happened");
        console.error(error);
        setLocation("");
        setLoading(false);
        setError("City not found");
        setData({});
      }
    }
  };
  //use effect for setting the user initial location
  useEffect(() => {
    fetch(url)
      .then((respone) => {
        return respone.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
    navigator.geolocation.getCurrentPosition((position) => {
      setLocationHolder(
        `${position.coords.latitude},${position.coords.longitude}`
      );
    });
  }, [locationHolder]);
  //creating a content depending the data fetched
  let content;
  if (Object.keys(data).length === 0) {
    content = <NoResult />;
  } else {
    content = (
      <div className="flex flex-col justify-center items-center">
        <CurrentWeather data={data} />
        <Forcast data={data} />
      </div>
    );
  }

  return (
    <div className="h-full w-full ">
      <div className="h-screen bg-white/25">
        {/* website nav bar */}
        <nav className="fixed top-0 w-screen  overflow-x-hidden bg-white  ">
          <div className="flex flex-col items-center justify-center md:justify-between md:p-4 py-4 md:flex-row md:w-[90%] w-fit   ">
            <h1 className="text-[#F7AF35] font-bold text-3xl flex ">
              <span>
                <Icon className="text-3xl font-bold" icon={"ph:cloud"} />
              </span>{" "}
              WeatherWise
            </h1>
            <Input handleSubmit={handleSubmit} setLocation={setLocation} />
          </div>
        </nav>
        <div />
        {/* website hero section */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 20,
          }}
          className="flex flex-col md:flex-row w-full h-screen  justify-around  items-center md:px-14 lg:px-40 "
        >
          <div className="flex flex-col ">
            <Icon
              className="text-[200px] md:hidden"
              icon={"meteocons:thunderstorms-day-fill"}
            />
            <span className="border-[#F7AF35] mb-4 px-2 text-[#F7AF35] border-solid border-l-4 font-bold md:text-2xl text-xl">
              Weekly weather forecast
            </span>
            <h1 className="font-black  md:text-6xl text-4xl">WeatherWise</h1>
            <p className="font-medium text-xl  md:text-2xl mt-2 md:w-[80%] lg:w-[60%] ">
              we provide you with accurate and real-time weather forecasts
              tailored to your location.
            </p>
            <div
              onClick={() => {
                ref.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="border-4 border-solid text-[#403C3C]  border-[#F7AF35] w-fit mt-2 hover:text-white hover:bg-[#F7AF35] cursor-pointer"
            >
              <h1 className="p-3 font-bold text-xl ">Forecast</h1>
            </div>
          </div>
          <Icon
            className="text-[400px] hidden md:block"
            icon={"meteocons:thunderstorms-day-fill"}
          />
        </motion.div>
        {/* contant we've created to show depending on the result of data fetching */}
        <div ref={ref}>{content}</div>
        <Footer />
      </div>
    </div>
  );
}
