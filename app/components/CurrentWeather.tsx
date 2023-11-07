import React from "react";
import { currentDate2 } from "../utlites/currentDate";
import { motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
// data type for typescript
type data = {
  data: {
    location: {
      name: string;
    };
    current: {
      is_day: number;
      cloud: number;
      temp_c: number;
      feelslike_c: number;
      wind_kph: number;
      humidity: number;
      condition: {
        icon: string;
        text: string;
      };
    };
  };
};

function CurrentWeather({ data }: data) {
  // selecting the car bg color depending on the weather
  let colors = "";
  try {
    if (data.current.is_day === 0 && data.current.cloud < 50) {
      colors = "bg-gradient-to-b w-[70%] from-[#180D5B] to-[#29205b8f]";
    } else if (data.current.cloud >= 50) {
      colors = "bg-gradient-to-b w-[70%] from-[#4D5962] to-[#befff79c] ";
    } else {
      colors = "bg-gradient-to-b w-[70%] from-[#0088FF] to-[#55cec0be]";
    }
    throw new Error();
  } catch (error) {
    console.log(error);
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 20,
      }}
      className={`h-fit flex flex-col justify-between w-full px-5 md:px-10 md:w-[70%] rounded-[10px] text-white ${colors} py-4`}
    >
      <div className="flex flex-wrap justify-between items-center py-2">
        <h1 className="text-white font-semibold md:text-5xl text-3xl ">
          {data.location.name}
        </h1>
        <h3 className="text-white font-semibold md:text-2xl text-lg ">
          {currentDate2.replace(",", "")}
        </h3>
      </div>
      <div className="w-full flex justify-between items-end h-fit ">
        <div className="py-6 md:flex justify-between items-center w-full">
          <div className="flex items-center ">
            <Image
              src={"https:" + data.current.condition.icon}
              alt="weather icon"
              width={90}
              height={90}
            />
            <h1 className="font-semibold text-6xl">{data.current.temp_c}°</h1>
          </div>
          <h2 className="font-semibold md:text-4xl text-2xl bg-[#d9d9d96a] md:p-4 p-2  rounded-[20px]">
            {data.current.condition.text}
          </h2>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center w-full pb-5 font-semibold md:text-2xl">
        <div>
          <h2>feels like</h2>
          <span className="md:text-xl">{data.current.feelslike_c}°</span>
        </div>
        <div>
          <h2 className="flex items-center">
            wind <Icon icon={"ph:wind"} />
          </h2>
          <span className="md:text-xl">{data.current.wind_kph}km/hr</span>
        </div>
        <div>
          <h2 className="flex items-center">
            humidity{" "}
            <Icon icon={"material-symbols:humidity-percentage-outline"} />
          </h2>
          <span className="md:text-xl">{data.current.humidity}%</span>
        </div>
      </div>
    </motion.div>
  );
}

export default CurrentWeather;
