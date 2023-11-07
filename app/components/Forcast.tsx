import React from "react";
import { motion } from "framer-motion";
// type fo typescript
type forcast = {
  date: string;
  day: {
    condition: {
      icon: string;
      text: string;
    };
    mintemp_c: number;
    maxtemp_c: number;
    avgtemp_c: number;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
  };
};
type date = {
  data: {
    forecast: {
      forecastday: forcast[];
    };
  };
};
function Forcast({ data }: date) {
  return (
    <motion.div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-12 lg:w-[70%] w-full py-6 font-bold">
      {/* maping throug the data */}
      {data.forecast.forecastday.map((day: forcast, index: number) => {
        return (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 20,
            }}
            className={`text-white flex flex-col  items-center bg-gradient-to-b w-full  ${
              // changing the bg cololr depending on the weather
              day.day.daily_chance_of_rain >= 50 ||
              day.day.daily_chance_of_snow >= 50
                ? "from-[#4D5962] to-[#befff79c]"
                : " from-[#0088FF] to-[#55cec0be]"
            }   h-fit rounded-[10px] md:p-6 p-2`}
          >
            <h1 className="md:text-3xl text-2xl">
              {/* seting the date by day */}
              {new Date(day.date).toLocaleString("en-US", { weekday: "short" })}
            </h1>
            <div className="flex justify-center items-center md:text-2xl text-xl">
              <h2>{day.day.avgtemp_c}</h2>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
            </div>
            <h2>{day.day.condition.text}</h2>
            <div className="flex justify-between ">
              <div className="p-4 ">
                <h3>min</h3>
                <h3>{day.day.mintemp_c}</h3>
              </div>
              <div className="p-4 ">
                <h3>max</h3>
                <h3>{day.day.maxtemp_c}</h3>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default Forcast;
