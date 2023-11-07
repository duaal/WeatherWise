import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 20,
      }}
      className="w-full flex-wrap  flex justify-around items-end bg-[#F7AF35] text-white p-6"
    >
      <div className="">
        <div className="flex text-5xl p-2 ">
          <Icon className=" font-bold" icon={"ph:cloud"} />
          <h1>WeatherWise</h1>
        </div>

        <h1>
          powerd by{" "}
          <a
            href="https://www.weatherapi.com/"
            className="text-blue-400 font-bold"
          >
            weatherapi
          </a>
        </h1>
      </div>
      <h1>Copyright © duaa mohammed 2023</h1>
    </motion.div>
  );
}

export default Footer;
