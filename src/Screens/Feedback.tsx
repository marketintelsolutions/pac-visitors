import React, { useEffect, useState } from "react";
import { ReactComponent as Radial } from "../assets/radial.svg";
import PACLogo from "../assets/PAC-HOLD.-LOGO-2018.png";
import { addFeedback, getVisitor } from "../firebase/index.ts";
import { useSearchParams } from "react-router-dom";

enum RATING {
  ZERO,
  POOR,
  FAIR,
  AVERAGE,
  GOOD,
  EXELLENT,
}
enum STEPS {
  RATING,
  FEEDBACK,
  GET_EMAIL,
  DONE,
}
export default function Feedback() {
  const [rating, setRating] = useState<{
    text: string;
    emoji: string;
    ratingValue: RATING;
  } | null>(null);
  const [step, setStep] = useState<STEPS>(STEPS.RATING);
  const [feedback, setFeedback] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [purposeAchieved, setPurposeAchieved] = useState<"Yes" | "No">("Yes");
  function changeRating(ratingValue: {
    text: string;
    emoji: string;
    ratingValue: RATING;
  }) {
    setRating(ratingValue);
    setStep(STEPS.FEEDBACK);
  }
  const ratings: { text: string; emoji: string; ratingValue: RATING }[] = [
    { text: "Excellent", emoji: "😍", ratingValue: RATING.EXELLENT },
    { text: "Good", emoji: "😘", ratingValue: RATING.GOOD },
    { text: "Average", emoji: "🙂", ratingValue: RATING.AVERAGE },
    { text: "Fair", emoji: "😏", ratingValue: RATING.FAIR },
    { text: "Poor", emoji: "😡", ratingValue: RATING.POOR },
  ];
  const [addingFeedback, setAddingFeedback] = useState(false);
  useEffect(() => {
    if (step === STEPS.DONE) {
      setTimeout(() => {
        setStep(STEPS.RATING);
      }, 15000);
    }
  }, [step]);

  const getAndAddFeedbackData = async () => {
    setAddingFeedback(true);
    const feedbackData = {
      feedback,
      rating: rating?.ratingValue,
      purposeAchieved,
      userEmail,
      userName,
      userId,
    };

    await addFeedback(feedbackData);
    setAddingFeedback(false);
  };
  const handleAddFeedback = async () => {
    if (!userEmail || !userName) {
      setStep(STEPS.GET_EMAIL);
    } else {
      await getAndAddFeedbackData();
      setStep(STEPS.DONE);
    }
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    //get user
    let id = searchParams.get("id");
    if (id) {
      setUserId(id);
    } else {
      const rememberMeUserData = window.localStorage.getItem("visitor");

      if (rememberMeUserData && JSON.parse(rememberMeUserData)?.id) {
        id = JSON.parse(rememberMeUserData).id;
        setUserName(JSON.parse(rememberMeUserData).name);
        setUserEmail(JSON.parse(rememberMeUserData).email);
        setUserId(JSON.parse(rememberMeUserData).id);
      }
    }
    (async () => {
      const visitor = await getVisitor(id);
      setUserName(visitor.name);
      setUserEmail(visitor.email);
      setUserId(visitor.id);
    })();
    return () => {};
  }, []);

  return (
    <section className="relative pt-28 bg-gradient-gray2 overflow-hidden min-h-screen">
      <a href="https://panafricancapitalholdings.com/">
        <img src={PACLogo} width={200} className="mx-auto lg:mb-20 mb-10" />
      </a>{" "}
      <Radial className="absolute left-0 top-0 h-full" />
      {step === STEPS.RATING && (
        <div className="relative z-10 container mx-auto px-4">
          <div className="md:max-w-xl px-8 py-7 mx-auto text-center bg-white bg-opacity-30 shadow-lg rounded-3xl">
            <h3 className="mb-3 font-heading  text-lg text-gray-600">
              Trust you had a good time
            </h3>
            <p className="my-4 text-gray-900 font-bold text-xl">
              Was the purpose of your visit achieved?
            </p>
            <div className="flex flex-wrap justify-center">
              <button
                onClick={() => setPurposeAchieved("Yes")}
                type="submit"
                className="p-1  font-heading font-medium text-base text-white overflow-hidden rounded-3xl mt-3"
              >
                <div className="relative py-4 px-9 bg-gradient-blue overflow-hidden rounded-3xl flex justify-center">
                  <div className="absolute top-0 left-0  h-full w-full bg-gray-900 transition ease-in-out duration-500"></div>
                  <p className="relative z-10">
                    Yes {purposeAchieved === "Yes" && <span>✔️</span>}
                  </p>
                </div>
              </button>{" "}
              <button
                type="button"
                className="p-1  font-heading font-medium text-base text-white overflow-hidden  mt-3"
                onClick={() => setPurposeAchieved("No")}
              >
                <div className="relative py-4 px-9  rounded-3xl flex justify-center">
                  <div className="absolute top-0 left-0  h-full w-full border overflow-hidden rounded-3xl border-gray-900 transition ease-in-out duration-500"></div>
                  <p className="relative z-10 text-gray-900">
                    No {purposeAchieved === "No" && <span>✔️</span>}
                  </p>
                </div>
              </button>
            </div>
            <p className="my-4 text-gray-900 font-bold text-xl">
              Please rate your overall experience.
            </p>
            <div className="flex justify-around flex-wrap">
              {ratings.map((r, index) => (
                <div
                  key={index}
                  className="m-3 cursor-pointer"
                  onClick={() => {
                    changeRating(r);
                  }}
                >
                  <p className="text-5xl mb-3">{r.emoji}</p>
                  <span className="text-gray-600 text-lg">{r.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {step === STEPS.FEEDBACK && (
        <div className="relative z-10 container mx-auto px-4 mb-10">
          <div className="md:max-w-2xl px-8 py-10 mx-auto text-center bg-white bg-opacity-30 shadow-lg rounded-3xl ">
            <h3 className="mb-3 font-heading font-bold text-xl text-gray-900">
              You rated us {rating?.text} {rating?.emoji}
            </h3>
            <p className="mb-8 text-gray-600 text-lg">
              We value your Feedback, are there additional comments you would
              like to make?
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddFeedback();
              }}
              className="mt-3"
            >
              <textarea
                name="feedback"
                id="feedback"
                className="w-full rounded-3xl p-4 bg-opacity-50 bg-white shadow-lg"
                rows="5"
                placeholder="Leave us a feedback!"
                required
                onChange={(e) => {
                  setFeedback(e.target.value);
                }}
              ></textarea>
              <div className="flex flex-wrap justify-center">
                <button
                  type="submit"
                  className="p-1  font-heading font-medium text-base text-white overflow-hidden rounded-3xl mt-3"
                >
                  <div className="relative py-4 px-9 bg-gradient-blue overflow-hidden rounded-3xl flex justify-center">
                    <div className="absolute top-0 left-0  h-full w-full bg-gray-900 transition ease-in-out duration-500"></div>
                    <p className="relative z-10">Submit Feedback</p>
                    {addingFeedback && (
                      <svg
                        className="animate-spin h-5 w-5 mr-3  rounded-full border-white border-t-2 mx-2"
                        viewBox="0 0 24 24"
                      ></svg>
                    )}
                  </div>
                </button>{" "}
                <button
                  type="button"
                  className="p-1  font-heading font-medium text-base text-white overflow-hidden  mt-3"
                  onClick={handleAddFeedback}
                >
                  <div className="relative py-4 px-9  rounded-3xl flex justify-center">
                    <div className="absolute top-0 left-0  h-full w-full border overflow-hidden rounded-3xl border-gray-900 transition ease-in-out duration-500"></div>
                    <p className="relative z-10 text-gray-900">Skip</p>
                    {addingFeedback && (
                      <svg
                        className="animate-spin h-5 w-5 mr-3  rounded-full border-gray-900 border-t-2 mx-2"
                        viewBox="0 0 24 24"
                      ></svg>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {step === STEPS.GET_EMAIL && (
        <div className="relative z-10 container mx-auto px-4 mb-10">
          <div className="md:max-w-2xl px-8 py-10 mx-auto text-center bg-white bg-opacity-30 shadow-lg rounded-3xl ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddFeedback();
              }}
              className="mt-3"
            >
              <div className="w-full p-2 text-left">
                <small className="">Full Name</small>
                <input
                  className="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"
                  type="text"
                  defaultValue={userName}
                  required
                  title="Full name"
                  placeholder="Full name"
                  name="full-name"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
              <div className="w-full p-2 text-left">
                <small className="">Email Address</small>
                <input
                  className="w-full px-5 py-3.5 text-gray-500 placeholder-gray-500 bg-white outline-none focus:ring-4 focus:ring-indigo-500 border border-gray-200 rounded-lg"
                  type="email"
                  required
                  defaultValue={userEmail}
                  title="Email Address"
                  placeholder="Email Address"
                  name="email"
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-wrap justify-center">
                <button
                  type="submit"
                  className="p-1  font-heading font-medium text-base text-white overflow-hidden rounded-3xl mt-3"
                >
                  <div className="relative py-4 px-9 bg-gradient-blue overflow-hidden rounded-3xl flex justify-center">
                    <div className="absolute top-0 left-0  h-full w-full bg-gray-900 transition ease-in-out duration-500"></div>
                    <p className="relative z-10">Submit</p>
                    {addingFeedback && (
                      <svg
                        className="animate-spin h-5 w-5 mr-3  rounded-full border-white border-t-2 mx-2"
                        viewBox="0 0 24 24"
                      ></svg>
                    )}
                  </div>
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      )}
      {step === STEPS.DONE && (
        <div className="relative z-10 container mx-auto px-4">
          <div className="md:max-w-xl px-8 py-7 mx-auto text-center bg-white bg-opacity-30 shadow-lg rounded-3xl">
            <h3 className="mb-3 font-heading font-bold text-xl text-gray-900">
              Thanks for your feedback
            </h3>
            <p className="text-5xl mb-3">✔️</p>
            <button
              onClick={() => setStep(STEPS.RATING)}
              className="p-1 w-full font-heading font-medium text-base text-white overflow-hidden rounded-3xl mt-3"
            >
              <div className="relative py-4 px-9 bg-gradient-blue overflow-hidden rounded-3xl flex justify-center">
                <div className="absolute top-0 left-0  h-full w-full bg-gray-900 transition ease-in-out duration-500"></div>
                <p className="relative z-10">Done</p>
                {/* {addingVisitor && (
                                <svg
                                  className="animate-spin h-5 w-5 mr-3  rounded-full border-white border-t-2 mx-2"
                                  viewBox="0 0 24 24"
                                ></svg>
                              )} */}
              </div>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
