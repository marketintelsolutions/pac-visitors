import React from "react";
import { ReactComponent as Radial } from "../assets/radial.svg";
import PACLogo from "../assets/PAC-HOLD.-LOGO-2018.png";

export default function ThankYou({ visitor }) {
  return (
    <section className="relative pt-28 bg-gradient-gray2 overflow-hidden min-h-screen">
      <a href="https://panafricancapitalholdings.com/">
        <img src={PACLogo} width={200} className="mx-auto lg:mb-20 mb-10" />
      </a>{" "}
      <Radial className="absolute left-0 top-0 h-full" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="md:max-w-lg">
          <h2 className="mb-5 font-heading font-semibold text-6xl sm:text-7xl text-gray-900">
            We&rsquo;re here to help {visitor?.name}!
          </h2>
          <p className="text-gray-600 text-lg">
            Take your time to settle in and reach out when you are in need.
          </p>
        </div>
        <div className="flex flex-wrap -m-6 pb-24 md:pb-0">
          <div className="flex w-full md:w-1/2 p-6 md:pb-0">
            <img
              className="self-end"
              src="gradia-assets/images/contact/woman.png"
              alt=""
            />
          </div>
          <div className="flex w-full md:w-1/2 p-6">
            <div className="self-end flex flex-wrap -m-4 md:pb-24">
              <div className="w-full p-4">
                <div className="md:max-w-lg px-8 py-7 bg-white rounded-10">
                  <div className="max-w-xs">
                    <h3 className="mb-3 font-heading font-bold text-xl text-gray-900">
                      Reach out to Reception desk
                    </h3>
                    <p className="mb-8 text-gray-600 text-lg">
                      Contact us anytime, from anywhere in the building. Get in
                      touch.
                    </p>
                    <a
                      className="group inline-block font-heading font-medium text-gray-900 hover:text-gray-800 text-base overflow-hidden"
                      href="tel:+23412718630"
                    >
                      <p className="mb-1">📞 +234 (1) 271 8630</p>
                      <div className="w-full transform -translate-x-0 group-hover:translate-x-full h-0.5 bg-gradient-cyan transition ease-in-out duration-500"></div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full p-4">
                <div className="md:max-w-lg px-8 py-7 bg-white rounded-10">
                  <div className="max-w-xs">
                    <h3 className="mb-3 font-heading font-bold text-xl text-gray-900">
                      Call IT for any tech glitch
                    </h3>
                    <p className="mb-8 text-gray-600 text-lg">
                      Contact us anytime, from anywhere. Get in touch.
                    </p>
                    <a
                      className="group inline-block font-heading font-medium text-gray-900 hover:text-gray-800 text-base overflow-hidden"
                      href="tel:+23412718630"
                    >
                      <p className="mb-1">📞 +234 (1) 271 8630</p>
                      <div className="w-full transform -translate-x-0 group-hover:translate-x-full h-0.5 bg-gradient-cyan transition ease-in-out duration-500"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
