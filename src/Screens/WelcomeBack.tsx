import React from "react";
import { ReactComponent as Radial } from "../assets/radial.svg";
import PACLogo from "../assets/PAC-HOLD.-LOGO-2018.png";

export default function WelcomeBack({ visitor, onClick, onReset }) {
  return (
    <section className="relative pt-28 bg-gradient-gray2 overflow-hidden min-h-screen">
      <a href="https://panafricancapitalholdings.com/">
        <img src={PACLogo} width={200} className="mx-auto lg:mb-20 mb-10 " />
      </a>{" "}
      <Radial className="absolute left-0 top-0 h-full" />
      <div className="relative z-10 container mx-auto px-4 ">
        <div className="md:max-w-3xl mx-auto text-center">
          <h2 className="mb-5 font-heading font-semibold text-6xl sm:text-7xl text-gray-900">
            Welcome back to PAC Holdings {visitor?.name}!
          </h2>
          <p className="text-gray-600 text-lg">
            Who and why are you visting today?
          </p>
        </div>
      </div>
      <div className="w-[300px] mx-auto p-2">
        <div className="group relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-blue opacity-0 group-hover:opacity-50 rounded-lg transition ease-out duration-300"></div>
          <button
            onClick={onClick}
            className="mt-10 p-1 w-full font-heading font-medium text-base text-white overflow-hidden rounded-md"
          >
            <div className="relative py-4 px-9 bg-gradient-blue overflow-hidden rounded-md flex justify-center">
              <div className="absolute top-0 left-0  h-full w-full bg-gray-900 transition ease-in-out duration-500"></div>
              <p className="relative z-10">Proceed</p>
            </div>
          </button>
          <p className="relative z-10 text-center py-3 cursor-pointer">
            Not {visitor?.name}?{" "}
            <span className="text-green-600" onClick={onReset}>
              Continue as someone else.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
