import React, { useEffect, useState } from "react";
import { ReactComponent as Radial2 } from "../assets/radial2.svg";
import PACLogo from "../assets/PAC-HOLD.-LOGO-2018.png";
import AppListBox from "../Components/AppListBox";
import AppAutoComplete from "../Components/AppAutoComplete";
import AppRadioGroup from "../Components/AppRadioGroup";
import { getVisitors, addVisitor, addVisit } from "../firebase/index.ts";
import { Visitor } from "../models";
import MassageDialogue from "../Components/MassageDialogue.tsx";
import ThankYou from "./ThankYou.tsx";
import WelcomeBack from "./WelcomeBack.tsx";

export default function Homepage() {
  const [vistors, setVistors] = useState<Visitor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [returningVisitor, setReturningVisitor] = useState<Visitor | null>(
    null
  );
  const [addingVisit, setAddingVisit] = useState(false);
  const [addingVisitor, setAddingVisitor] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberMeUser, setRememberMeUser] = useState<Visitor | null>(null);

  useEffect(() => {
    const loadVisitors = async () => {
      const visitorsList = await getVisitors().catch(() => {});
      setVistors(visitorsList);
    };
    loadVisitors();

    const rememberMeUserData = window.localStorage.getItem("visitor");
    if (rememberMeUserData) {
      setRememberMeUser(JSON.parse(rememberMeUserData));
      setStep(STEPS.VISITING_AGAIN);
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [host, setHost] = useState<string>("");
  const [purposeOfVisit, setPurposeOfVisit] = useState("");
  const [hasAppointment, setHasAppointment] = useState(true);

  enum STEPS {
    AUTH,
    VISIT_DETAILS,
    THANK_YOU,
    VISITING_AGAIN,
  }
  const [step, setStep] = useState(STEPS.AUTH);
  const handleAddVisitor = async () => {
    setAddingVisitor(true);
    const returningVisitorData = vistors.find((i) => i.email === email);
    if (!returningVisitorData) {
      await addVisitor({ name, email, company });
      setVisitor({ name, email, company });
    } else {
      setVisitor(returningVisitor);
    }
    setAddingVisitor(false);
    if (rememberMe) {
      window.localStorage.setItem(
        "visitor",
        JSON.stringify(returningVisitorData || { name, email, company })
      );
    }
    setStep(STEPS.VISIT_DETAILS);
  };
  const handleAddVisit = async () => {
    setAddingVisit(true);
    const visitData = {
      visitor: visitor.email,
      hasAppointment,
      host,
      time: new Date().getTime(),
    };

    await addVisit(visitData);

    setAddingVisit(false);
    setStep(STEPS.THANK_YOU);
  };

  return (
    <>
      {step === STEPS.THANK_YOU ? (
        <ThankYou visitor={visitor} />
      ) : step === STEPS.VISITING_AGAIN ? (
        <WelcomeBack
          visitor={rememberMeUser}
          onClick={() => {
            setVisitor(rememberMeUser);
            setStep(STEPS.VISIT_DETAILS);
          }}
        />
      ) : (
        <section className="relative pt-16 pb-36 bg-gradient-gray2 overflow-hidden min-h-screen">
          <Radial2 className="absolute top-0 transform left-1/2 -translate-x-1/2" />
          <Radial2 className="absolute bottom-0 transform left-1/2 -translate-x-1/2 rotate-180" />
          <div className="relative z-10 container mx-auto px-4">
            <a href="https://panafricancapitalholdings.com/">
              <img
                src={PACLogo}
                width={200}
                className="mx-auto lg:mb-20 mb-10"
              />
            </a>
            <div className="flex flex-wrap -m-6">
              <div className="w-full p-6">
                <div className="md:max-w-xl text-center mx-auto">
                  <h2 className="mb-4 font-heading font-bold text-gray-900 text-6xl sm:text-7xl">
                    Welcome to PAC Holdings {visitor && visitor.name}
                  </h2>
                  <p className="mb-11 text-lg text-gray-500">
                    {visitor
                      ? "One more step to go."
                      : "Kindly fill the visitor's form below."}
                  </p>
                  {step === STEPS.AUTH && (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const returningVisitorData = vistors.find(
                          (i) => i.email === email
                        );
                        if (returningVisitorData) {
                          setReturningVisitor(returningVisitorData);
                          return setIsOpen(true);
                        }

                        handleAddVisitor();
                      }}
                      className="flex flex-wrap max-w-md mx-auto -m-2 mb-5"
                    >
                      <div className="w-full p-2 text-left">
                        <small className="">Full Name</small>
                        <input
                          className="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"
                          type="text"
                          required
                          placeholder="Full name"
                          name="full-name"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>

                      <div className="w-full p-2 text-left">
                        <small className="">Email Address</small>
                        <input
                          className="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"
                          type="email"
                          required
                          placeholder="Email Address"
                          name="email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="w-full p-2 text-left">
                        <small className="">Name Of Company</small>
                        <input
                          className="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"
                          type="text"
                          required
                          placeholder="Name Of Company"
                          name="company"
                          onChange={(e) => {
                            setCompany(e.target.value);
                          }}
                        />
                      </div>
                      <div className="w-full p-2 text-left flex items-center">
                        <input
                          className=" mr-3 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"
                          type="checkbox"
                          onChange={(e) => {
                            setRememberMe(e.target.checked);
                          }}
                        />
                        <small className="">Remember me on this device</small>
                      </div>

                      <div className="w-full p-2">
                        <div className="group relative">
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-blue opacity-0 group-hover:opacity-50 rounded-lg transition ease-out duration-300"></div>
                          <button className="p-1 w-full font-heading font-medium text-base text-white overflow-hidden rounded-md">
                            <div className="relative py-4 px-9 bg-gradient-blue overflow-hidden rounded-md flex justify-center">
                              <div className="absolute top-0 left-0  h-full w-full bg-gray-900 transition ease-in-out duration-500"></div>
                              <p className="relative z-10">Proceed</p>
                              {addingVisitor && (
                                <svg
                                  className="animate-spin h-5 w-5 mr-3  rounded-full border-white border-t-2 mx-2"
                                  viewBox="0 0 24 24"
                                ></svg>
                              )}
                            </div>
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                  {step === STEPS.VISIT_DETAILS && (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (!host) {
                          return alert("Select a host");
                        }
                        if (!purposeOfVisit) {
                          return alert("Select a purpose of visit");
                        }

                        handleAddVisit();
                      }}
                      className="flex flex-wrap max-w-md mx-auto -m-2 mb-5"
                    >
                      <div className="w-full p-2 text-left">
                        <small className="">Whom to see</small>
                        <input
                          className="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"
                          type="text"
                          required
                          placeholder="Whom to see"
                          name="host"
                          onChange={(e) => {
                            setHost(e.target.value);
                          }}
                        />
                      </div>
                      <div className="w-full p-2 text-left">
                        <small className="">Purpose Of Visit</small>
                        <AppListBox
                          data={[
                            { name: "Official" },
                            { name: "Personal" },
                            { name: "Interview" },
                            { name: "Vendor" },
                            { name: "Other" },
                          ]}
                          placeholder="Purpose Of Visit"
                          onSelect={(value) => {
                            setPurposeOfVisit(value.name);
                          }}
                        />
                      </div>
                      <div className="w-full text-left">
                        <small className="p-2">
                          Do You Have An Appointment?
                        </small>
                        <AppRadioGroup
                          onSelect={(value) => setHasAppointment(value)}
                        />
                      </div>

                      <div className="w-full p-2">
                        <div className="group relative">
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-blue opacity-0 group-hover:opacity-50 rounded-lg transition ease-out duration-300"></div>
                          <button className="p-1 w-full font-heading font-medium text-base text-white overflow-hidden rounded-md">
                            <div className="relative py-4 px-9 bg-gradient-blue overflow-hidden rounded-md flex justify-center">
                              <div className="absolute top-0 left-0  h-full w-full bg-gray-900 transition ease-in-out duration-500"></div>
                              {addingVisit && (
                                <svg
                                  className="animate-spin h-5 w-5 mr-3  rounded-full border-white border-t-2 mx-2"
                                  viewBox="0 0 24 24"
                                ></svg>
                              )}
                              <p className="relative z-10">Submit</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  <MassageDialogue
                    closeModal={() => setIsOpen(false)}
                    openModal={() => setIsOpen(true)}
                    isOpen={isOpen}
                    visitor={returningVisitor}
                    onYes={() => {
                      setVisitor(returningVisitor);
                      handleAddVisitor();
                    }}
                    onNo={() => {
                      handleAddVisitor();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
