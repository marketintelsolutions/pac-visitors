import React, { FC, useEffect, useState } from "react";
import { Visit, Visitor, Feedback } from "../models";
import { getVisitors, getFeedbacks, updateVisit } from "../firebase/index.ts";
import arraySort from "array-sort";
import FuzzySearch from "fuzzy-search";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [query, setQuery] = useState("");

  const vistorsToday = feedbacks.filter(
    (i) => i.time && i.time >= moment().startOf("day").toDate().getTime()
  );
  enum RATING {
    ZERO,
    POOR,
    FAIR,
    AVERAGE,
    GOOD,
    EXELLENT,
  }
  var result = arraySort(feedbacks, ["time"], { reverse: true });
  const ratings: { text: string; emoji: string; ratingValue: RATING }[] = [
    { text: "Poor", emoji: "😡", ratingValue: RATING.POOR },
    { text: "Fair", emoji: "😏", ratingValue: RATING.FAIR },
    { text: "Average", emoji: "🙂", ratingValue: RATING.AVERAGE },
    { text: "Good", emoji: "😘", ratingValue: RATING.GOOD },
    { text: "Excellent", emoji: "😍", ratingValue: RATING.EXELLENT },
  ];
  const searcher = new FuzzySearch(
    feedbacks,
    ["feedback", "userName", "userEmail"],
    {
      caseSensitive: false,
    }
  );
  let searchResult = result;
  if (query) {
    searchResult = searcher.search(query);
  }

  useEffect(() => {
    const loadFeedbacks = async () => {
      const feedbacksList = await getFeedbacks().catch(() => {});
      setFeedbacks(feedbacksList);
    };
    loadFeedbacks();
  }, []);
  type VisitRowProp = {
    visit: Feedback;
  };
  const VisitRow: FC<VisitRowProp> = ({ visit: feedback }) => {
    return (
      <tr className="text-xs bg-gray-50 border-t ">
        <td className="font-medium">{moment(feedback?.time).calendar()}</td>
        <td className="flex  py-3">
          <div>
            <p className="font-medium">{feedback?.userName}</p>
            <p className="text-gray-500">{feedback?.userEmail}</p>
          </div>
        </td>
        <td className="font-medium">
          <div className=" mr-4">
            <p className="font-medium">{feedback?.feedback}</p>
          </div>
        </td>
        <td className="font-medium">
          <div className=" mr-4">
            <p className="font-medium">
              {feedback?.purposeAchieved ? "Yes" : "No"}
            </p>
          </div>
        </td>
        <td className="font-medium">
          <div className=" mr-4">
            <p className="font-medium">
              {feedback.rating ? ratings[feedback.rating - 1]?.emoji : "--"}{" "}
              {feedback.rating ? ratings[feedback.rating - 1]?.text : "--"}
            </p>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className="px-4 max-w-screen-2xl mx-auto">
      <section className="py-8 px-6 bg-white">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-auto flex items-center mb-4 lg:mb-0">
            <h2 className="text-2xl font-bold">Visitors' Feedback</h2>
            <span className="inline-block py-1 px-2 ml-2 rounded-full text-xs text-white bg-indigo-500">
              {vistorsToday.length} Today
            </span>
          </div>
          <div className="w-full md:w-1/2 lg:w-auto flex py-2 px-4 mb-4 md:mb-0 md:ml-auto border rounded bg-white">
            <input
              className="text-sm placeholder-gray-500 focus:outline-none"
              type="text"
              placeholder="Type to search..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="ml-auto">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.0921 16.9083L15.0004 13.8417C16.2005 12.3453 16.7817 10.4461 16.6244 8.53441C16.4672 6.62274 15.5835 4.84398 14.155 3.56386C12.7265 2.28375 10.8619 1.59958 8.94451 1.65205C7.02711 1.70452 5.20268 2.48963 3.84636 3.84594C2.49004 5.20226 1.70493 7.02669 1.65247 8.94409C1.6 10.8615 2.28416 12.7261 3.56428 14.1546C4.84439 15.583 6.62316 16.4668 8.53482 16.624C10.4465 16.7812 12.3457 16.2001 13.8421 15L16.9087 18.0667C16.9862 18.1448 17.0784 18.2068 17.1799 18.2491C17.2815 18.2914 17.3904 18.3132 17.5004 18.3132C17.6104 18.3132 17.7193 18.2914 17.8209 18.2491C17.9224 18.2068 18.0146 18.1448 18.0921 18.0667C18.2423 17.9113 18.3262 17.7036 18.3262 17.4875C18.3262 17.2714 18.2423 17.0637 18.0921 16.9083ZM9.16708 15C8.01335 15 6.88554 14.6579 5.92625 14.0169C4.96696 13.3759 4.21929 12.4649 3.77778 11.399C3.33627 10.3331 3.22075 9.16019 3.44583 8.02863C3.67091 6.89708 4.22648 5.85767 5.04229 5.04187C5.85809 4.22606 6.89749 3.67049 8.02905 3.44541C9.1606 3.22033 10.3335 3.33585 11.3994 3.77736C12.4653 4.21887 13.3763 4.96654 14.0173 5.92583C14.6583 6.88512 15.0004 8.01293 15.0004 9.16666C15.0004 10.7138 14.3858 12.1975 13.2919 13.2914C12.1979 14.3854 10.7142 15 9.16708 15Z"
                  fill="#382CDD"
                ></path>
              </svg>
            </button>
          </div>
          <Link to="/admin">
            <button className="bg-indigo-500 text-white px-4 rounded py-2 ml-3">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </section>
      <section className="py-8">
        <div className="container px-4 mx-auto">
          <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="text-xs text-gray-500 text-left">
                  <th className="pb-3 font-medium">Time</th>
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Feedback</th>
                  <th className="pb-3 font-medium">Purpose Achieved?</th>
                  <th className="pb-3 font-medium">Rating</th>
                </tr>
              </thead>

              <tbody>
                {searchResult.map((visit) => (
                  <VisitRow visit={visit} />
                ))}
              </tbody>
            </table>
            {searchResult.length === 0 && (
              <div className="text-center w-full flex justify-center items-center  h-[200px]">
                No Feedback
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
