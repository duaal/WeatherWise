"use client";
import React from "react";
import { Icon } from "@iconify/react";
//type for typescript
type props = {
  handleSubmit: (event: any) => void;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};
//passed  props from the main page
function Input({ handleSubmit, setLocation }: props) {
  return (
    <form className="flex items-center justify-center  md:w-[25%] ">
      <input
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleSubmit}
        placeholder="type your city here "
        className="focus:outline-none placeholder-[#484848]  text-black px-4 py-2  bg-[#F6AB2B]/50  rounded-[28px] md:w-full"
      />
      <Icon
        onClick={handleSubmit}
        icon="bi:search"
        className="text-slate-800 ml-[-25px] cursor-pointer"
      />
    </form>
  );
}

export default Input;
