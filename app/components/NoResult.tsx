import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

function NoResult() {
  //for null search result
  return (
    <div className="w-full flex justify-center items-center flex-col h-screen text-[#D9D9D9] font-bold">
      <Icon className=" text-[200px]" icon={"ph:cloud"} />
      <h1 className="text-4xl">Sorry :( no result </h1>
    </div>
  );
}

export default NoResult;
